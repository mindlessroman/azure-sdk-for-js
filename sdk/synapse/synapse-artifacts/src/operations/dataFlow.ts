// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  DataFlowResource,
  DataFlowCreateOrUpdateDataFlowOptionalParams,
  DataFlowCreateOrUpdateDataFlowResponse,
  DataFlowGetDataFlowOptionalParams,
  DataFlowGetDataFlowResponse,
  ArtifactRenameRequest,
  DataFlowGetDataFlowsByWorkspaceResponse,
  DataFlowGetDataFlowsByWorkspaceNextResponse
} from "../models";

/** Class representing a DataFlow. */
export class DataFlow {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class DataFlow class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * Lists data flows.
   * @param options The options parameters.
   */
  public listDataFlowsByWorkspace(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<DataFlowResource> {
    const iter = this.getDataFlowsByWorkspacePagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getDataFlowsByWorkspacePagingPage(options);
      }
    };
  }

  private async *getDataFlowsByWorkspacePagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<DataFlowResource[]> {
    let result = await this._getDataFlowsByWorkspace(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getDataFlowsByWorkspaceNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getDataFlowsByWorkspacePagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<DataFlowResource> {
    for await (const page of this.getDataFlowsByWorkspacePagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Creates or updates a data flow.
   * @param dataFlowName The data flow name.
   * @param dataFlow Data flow resource definition.
   * @param options The options parameters.
   */
  async createOrUpdateDataFlow(
    dataFlowName: string,
    dataFlow: DataFlowResource,
    options?: DataFlowCreateOrUpdateDataFlowOptionalParams
  ): Promise<LROPoller<DataFlowCreateOrUpdateDataFlowResponse>> {
    const { span, updatedOptions } = createSpan("ArtifactsClient-createOrUpdateDataFlow", options);
    const operationArguments: coreHttp.OperationArguments = {
      dataFlowName,
      dataFlow,
      options: this.getOperationOptions(updatedOptions, "undefined")
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as DataFlowCreateOrUpdateDataFlowResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateDataFlowOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateDataFlowOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets a data flow.
   * @param dataFlowName The data flow name.
   * @param options The options parameters.
   */
  async getDataFlow(
    dataFlowName: string,
    options?: DataFlowGetDataFlowOptionalParams
  ): Promise<DataFlowGetDataFlowResponse> {
    const { span, updatedOptions } = createSpan("ArtifactsClient-getDataFlow", options);
    const operationArguments: coreHttp.OperationArguments = {
      dataFlowName,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getDataFlowOperationSpec
      );
      return result as DataFlowGetDataFlowResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a data flow.
   * @param dataFlowName The data flow name.
   * @param options The options parameters.
   */
  async deleteDataFlow(
    dataFlowName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan("ArtifactsClient-deleteDataFlow", options);
    const operationArguments: coreHttp.OperationArguments = {
      dataFlowName,
      options: this.getOperationOptions(updatedOptions, "undefined")
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      deleteDataFlowOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteDataFlowOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Renames a dataflow.
   * @param dataFlowName The data flow name.
   * @param request proposed new name.
   * @param options The options parameters.
   */
  async renameDataFlow(
    dataFlowName: string,
    request: ArtifactRenameRequest,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan("ArtifactsClient-renameDataFlow", options);
    const operationArguments: coreHttp.OperationArguments = {
      dataFlowName,
      request,
      options: this.getOperationOptions(updatedOptions, "undefined")
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      renameDataFlowOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: renameDataFlowOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Lists data flows.
   * @param options The options parameters.
   */
  private async _getDataFlowsByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<DataFlowGetDataFlowsByWorkspaceResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_getDataFlowsByWorkspace",
      options
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getDataFlowsByWorkspaceOperationSpec
      );
      return result as DataFlowGetDataFlowsByWorkspaceResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * GetDataFlowsByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the GetDataFlowsByWorkspace
   *                 method.
   * @param options The options parameters.
   */
  private async _getDataFlowsByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<DataFlowGetDataFlowsByWorkspaceNextResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_getDataFlowsByWorkspaceNext",
      options
    );
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getDataFlowsByWorkspaceNextOperationSpec
      );
      return result as DataFlowGetDataFlowsByWorkspaceNextResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const createOrUpdateDataFlowOperationSpec: coreHttp.OperationSpec = {
  path: "/dataflows/{dataFlowName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowResource
    },
    201: {
      bodyMapper: Mappers.DataFlowResource
    },
    202: {
      bodyMapper: Mappers.DataFlowResource
    },
    204: {
      bodyMapper: Mappers.DataFlowResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.dataFlow,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.dataFlowName],
  headerParameters: [Parameters.accept, Parameters.contentType, Parameters.ifMatch],
  mediaType: "json",
  serializer
};
const getDataFlowOperationSpec: coreHttp.OperationSpec = {
  path: "/dataflows/{dataFlowName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.dataFlowName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteDataFlowOperationSpec: coreHttp.OperationSpec = {
  path: "/dataflows/{dataFlowName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.dataFlowName],
  headerParameters: [Parameters.accept],
  serializer
};
const renameDataFlowOperationSpec: coreHttp.OperationSpec = {
  path: "/dataflows/{dataFlowName}/rename",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.request,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.dataFlowName],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getDataFlowsByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/dataflows",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const getDataFlowsByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
