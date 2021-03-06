/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { StorageClientContext } from "../storageClientContext";
import {
  QueueServiceProperties,
  ServiceSetPropertiesOptionalParams,
  ServiceSetPropertiesResponse,
  ServiceGetPropertiesOptionalParams,
  ServiceGetPropertiesResponse,
  ServiceGetStatisticsOptionalParams,
  ServiceGetStatisticsResponse,
  ServiceListQueuesSegmentOptionalParams,
  ServiceListQueuesSegmentResponse
} from "../models";

/** Class representing a Service. */
export class Service {
  private readonly client: StorageClientContext;

  /**
   * Initialize a new instance of the class Service class.
   * @param client Reference to the service client
   */
  constructor(client: StorageClientContext) {
    this.client = client;
  }

  /**
   * Sets properties for a storage account's Queue service endpoint, including properties for Storage
   * Analytics and CORS (Cross-Origin Resource Sharing) rules
   * @param properties The StorageService properties.
   * @param options The options parameters.
   */
  setProperties(
    properties: QueueServiceProperties,
    options?: ServiceSetPropertiesOptionalParams
  ): Promise<ServiceSetPropertiesResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      properties,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      setPropertiesOperationSpec
    ) as Promise<ServiceSetPropertiesResponse>;
  }

  /**
   * gets the properties of a storage account's Queue service, including properties for Storage Analytics
   * and CORS (Cross-Origin Resource Sharing) rules.
   * @param options The options parameters.
   */
  getProperties(
    options?: ServiceGetPropertiesOptionalParams
  ): Promise<ServiceGetPropertiesResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getPropertiesOperationSpec
    ) as Promise<ServiceGetPropertiesResponse>;
  }

  /**
   * Retrieves statistics related to replication for the Queue service. It is only available on the
   * secondary location endpoint when read-access geo-redundant replication is enabled for the storage
   * account.
   * @param options The options parameters.
   */
  getStatistics(
    options?: ServiceGetStatisticsOptionalParams
  ): Promise<ServiceGetStatisticsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getStatisticsOperationSpec
    ) as Promise<ServiceGetStatisticsResponse>;
  }

  /**
   * The List Queues Segment operation returns a list of the queues under the specified account
   * @param options The options parameters.
   */
  listQueuesSegment(
    options?: ServiceListQueuesSegmentOptionalParams
  ): Promise<ServiceListQueuesSegmentResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listQueuesSegmentOperationSpec
    ) as Promise<ServiceListQueuesSegmentResponse>;
  }
}
// Operation Specifications
const xmlSerializer = new coreHttp.Serializer(Mappers, /* isXml */ true);

const setPropertiesOperationSpec: coreHttp.OperationSpec = {
  path: "/",
  httpMethod: "PUT",
  responses: {
    202: {
      headersMapper: Mappers.ServiceSetPropertiesHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ServiceSetPropertiesExceptionHeaders
    }
  },
  requestBody: Parameters.properties,
  queryParameters: [
    Parameters.restype,
    Parameters.comp,
    Parameters.timeoutInSeconds
  ],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.version,
    Parameters.requestId
  ],
  isXML: true,
  contentType: "application/xml; charset=utf-8",
  mediaType: "xml",
  serializer: xmlSerializer
};
const getPropertiesOperationSpec: coreHttp.OperationSpec = {
  path: "/",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QueueServiceProperties,
      headersMapper: Mappers.ServiceGetPropertiesHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ServiceGetPropertiesExceptionHeaders
    }
  },
  queryParameters: [
    Parameters.restype,
    Parameters.comp,
    Parameters.timeoutInSeconds
  ],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1
  ],
  isXML: true,
  serializer: xmlSerializer
};
const getStatisticsOperationSpec: coreHttp.OperationSpec = {
  path: "/",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QueueServiceStatistics,
      headersMapper: Mappers.ServiceGetStatisticsHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ServiceGetStatisticsExceptionHeaders
    }
  },
  queryParameters: [
    Parameters.restype,
    Parameters.timeoutInSeconds,
    Parameters.comp1
  ],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1
  ],
  isXML: true,
  serializer: xmlSerializer
};
const listQueuesSegmentOperationSpec: coreHttp.OperationSpec = {
  path: "/",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListQueuesSegmentResponse,
      headersMapper: Mappers.ServiceListQueuesSegmentHeaders
    },
    default: {
      bodyMapper: Mappers.StorageError,
      headersMapper: Mappers.ServiceListQueuesSegmentExceptionHeaders
    }
  },
  queryParameters: [
    Parameters.timeoutInSeconds,
    Parameters.comp2,
    Parameters.prefix,
    Parameters.marker,
    Parameters.maxPageSize,
    Parameters.include
  ],
  urlParameters: [Parameters.url],
  headerParameters: [
    Parameters.version,
    Parameters.requestId,
    Parameters.accept1
  ],
  isXML: true,
  serializer: xmlSerializer
};
