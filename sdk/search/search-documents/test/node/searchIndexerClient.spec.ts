// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-invalid-this */
import { isPlaybackMode, record, Recorder, isLiveMode } from "@azure/test-utils-recorder";
import { assert } from "chai";
import {
  SearchIndexClient,
  SearchIndexerClient,
  SearchIndexerDataSourceConnection,
  SearchIndexerSkillset,
  SearchIndexer
} from "../../src/index";
import { Hotel } from "../utils/interfaces";
import { createClients, environmentSetup } from "../utils/recordedClient";
import {
  createIndex,
  createDataSourceConnections,
  deleteDataSourceConnections,
  createSkillsets,
  deleteSkillsets,
  createIndexers,
  deleteIndexers,
  WAIT_TIME,
  createRandomIndexName
} from "../utils/setup";
import { delay } from "@azure/core-http";

const TEST_INDEX_NAME = isLiveMode() ? createRandomIndexName() : "hotel-live-test2";

describe("SearchIndexerClient", function() {
  let recorder: Recorder;
  let indexerClient: SearchIndexerClient;
  let indexClient: SearchIndexClient;

  this.timeout(99999);

  beforeEach(async function() {
    ({ indexClient, indexerClient } = createClients<Hotel>(TEST_INDEX_NAME));
    if (!isPlaybackMode()) {
      await createDataSourceConnections(indexerClient);
      await createSkillsets(indexerClient);
      await createIndex(indexClient, TEST_INDEX_NAME);
      await delay(5000);
      await createIndexers(indexerClient, TEST_INDEX_NAME);
    }
    recorder = record(this, environmentSetup);
    // create the clients again, but hooked up to the recorder
    ({ indexClient, indexerClient } = createClients<Hotel>(TEST_INDEX_NAME));
  });

  afterEach(async function() {
    if (recorder) {
      await recorder.stop();
    }
    if (!isPlaybackMode()) {
      await indexClient.deleteIndex(TEST_INDEX_NAME);
      await delay(WAIT_TIME);
      await deleteDataSourceConnections(indexerClient);
      await deleteSkillsets(indexerClient);
      await deleteIndexers(indexerClient);
    }
  });

  describe("#indexers", function() {
    it("gets the list of indexers", async function() {
      const indexers = await indexerClient.listIndexers();
      assert.equal(indexers.length, 2);
    });

    it("gets the list of indexer names", async function() {
      const indexers = await indexerClient.listIndexersNames();
      assert.equal(indexers.length, 2);
      for (let i = 1; i <= 2; i++) {
        assert.include(indexers, `my-azure-indexer-${i}`);
      }
    });

    it("gets the correct indexer object", async function() {
      const indexer = await indexerClient.getIndexer("my-azure-indexer-1");
      assert.equal(indexer.name, "my-azure-indexer-1");
      assert.equal(indexer.dataSourceName, "my-data-source-1");
      assert.equal(indexer.targetIndexName, TEST_INDEX_NAME);
      assert.isFalse(indexer.isDisabled);
    });

    it("throws error for invalid indexer object", async function() {
      let retrievalError: boolean = false;
      try {
        await indexerClient.getIndexer("garbxyz");
      } catch (ex) {
        retrievalError = true;
      }
      assert.isTrue(retrievalError);
    });

    it("creates the indexer object using createOrUpdateIndexer", async function() {
      let indexer: SearchIndexer = {
        name: "my-azure-indexer-3",
        description: "Description for Sample Indexer",
        dataSourceName: "my-data-source-1",
        targetIndexName: TEST_INDEX_NAME,
        isDisabled: false
      };
      await indexerClient.createOrUpdateIndexer(indexer);
      try {
        indexer = await indexerClient.getIndexer("my-azure-indexer-3");
        assert.equal(indexer.name, "my-azure-indexer-3");
        assert.equal(indexer.dataSourceName, "my-data-source-1");
        assert.equal(indexer.targetIndexName, TEST_INDEX_NAME);
        assert.isFalse(indexer.isDisabled);
      } catch (ex) {
        throw ex;
      } finally {
        await indexerClient.deleteIndexer(indexer);
      }
    });

    it("modify and updates the indexer object", async function() {
      let indexer = await indexerClient.getIndexer("my-azure-indexer-1");
      indexer.isDisabled = true;
      await indexerClient.createOrUpdateIndexer(indexer);
      indexer = await indexerClient.getIndexer("my-azure-indexer-1");
      assert.isTrue(indexer.isDisabled);
    });

    it("gets the status of the indexer", async function() {
      const indexerStatus = await indexerClient.getIndexerStatus("my-azure-indexer-1");
      const statuses: string[] = ["unknown", "error", "running"];
      assert.include(statuses, indexerStatus.status);
    });
  });

  describe("#datasourceconnections", function() {
    it("gets the list of datasourceconnections", async function() {
      const dataSourceConnections = await indexerClient.listDataSourceConnections();
      assert.equal(dataSourceConnections.length, 2);
    });

    it("gets the list of datasourceconnection names", async function() {
      const dataSourceConnectionNames = await indexerClient.listDataSourceConnectionsNames();
      assert.isAtLeast(dataSourceConnectionNames.length, 2);
      for (let i = 1; i <= 2; i++) {
        assert.include(dataSourceConnectionNames, `my-data-source-${i}`);
      }
    });

    it("gets the correct datasourceconnection object", async function() {
      const dataSourceConnection = await indexerClient.getDataSourceConnection("my-data-source-1");
      assert.equal(dataSourceConnection.name, "my-data-source-1");
      assert.equal(dataSourceConnection.type, "cosmosdb");
      assert.equal(dataSourceConnection.container.name, "hotels");
    });

    it("throws error for invalid datasourceconnection object", async function() {
      let retrievalError: boolean = false;
      try {
        await indexerClient.getDataSourceConnection("garbxyz");
      } catch (ex) {
        retrievalError = true;
      }
      assert.isTrue(retrievalError);
    });

    it("creates the datasourceconnection object using createOrUpdateDataSourceConnection", async function() {
      let dataSourceConnection: SearchIndexerDataSourceConnection = {
        name: "my-data-source-3",
        type: "cosmosdb",
        container: {
          name: "hotels"
        },
        connectionString:
          "AccountEndpoint=https://hotels-docbb.documents.azure.com:443/;AccountKey=4UPsNZyFAjgZ1tzHPGZaxS09XcwLrIawbXBWk6IixcxJoSePTcjBn0mi53XiKWu8MaUgowUhIovOv7kjksqAug==;Database=SampleData"
      };
      await indexerClient.createOrUpdateDataSourceConnection(dataSourceConnection);
      try {
        dataSourceConnection = await indexerClient.getDataSourceConnection("my-data-source-3");
        assert.equal(dataSourceConnection.name, "my-data-source-3");
        assert.equal(dataSourceConnection.type, "cosmosdb");
        assert.equal(dataSourceConnection.container.name, "hotels");
      } catch (ex) {
        throw ex;
      } finally {
        await indexerClient.deleteDataSourceConnection(dataSourceConnection);
      }
    });

    it("modify and updates the datasourceconnection object", async function() {
      let dataSourceConnection = await indexerClient.getDataSourceConnection("my-data-source-1");
      dataSourceConnection.container.name = "my-container-2";
      await indexerClient.createOrUpdateDataSourceConnection(dataSourceConnection);
      dataSourceConnection = await indexerClient.getDataSourceConnection("my-data-source-1");
      assert.equal(dataSourceConnection.container.name, "my-container-2");
    });
  });

  describe("#skillsets", function() {
    it("gets the list of skillsets", async function() {
      const skillsets = await indexerClient.listSkillsets();
      assert.equal(skillsets.length, 2);
    });

    it("gets the list of skillset names", async function() {
      const skillsets = await indexerClient.listSkillsetsNames();
      assert.equal(skillsets.length, 2);
      for (let i = 1; i <= 2; i++) {
        assert.include(skillsets, `my-azureblob-skillset-${i}`);
      }
    });

    it("gets the correct skillset object", async function() {
      const skillSet = await indexerClient.getSkillset("my-azureblob-skillset-1");
      assert.equal(skillSet.name, "my-azureblob-skillset-1");
      assert.equal(skillSet.skills.length, 1);
      assert.equal(skillSet.skills[0].inputs.length, 2);
      assert.equal(skillSet.skills[0].outputs.length, 2);
    });

    it("throws error for invalid skillset object", async function() {
      let retrievalError: boolean = false;
      try {
        await indexerClient.getSkillset("garbxyz");
      } catch (ex) {
        retrievalError = true;
      }
      assert.isTrue(retrievalError);
    });

    it("creates the skillset object using createOrUpdateSkillset", async function() {
      let skillSet: SearchIndexerSkillset = {
        name: `my-azureblob-skillset-3`,
        description: `Skillset description`,
        skills: [
          {
            odatatype: "#Microsoft.Skills.Text.EntityRecognitionSkill",
            inputs: [
              {
                name: "text",
                source: "/document/merged_content"
              },
              {
                name: "languageCode",
                source: "/document/language"
              }
            ],
            outputs: [
              {
                name: "persons",
                targetName: "people"
              },
              {
                name: "organizations",
                targetName: "organizations"
              },
              {
                name: "locations",
                targetName: "locations"
              }
            ]
          }
        ]
      };
      await indexerClient.createOrUpdateSkillset(skillSet);
      try {
        skillSet = await indexerClient.getSkillset("my-azureblob-skillset-3");
        assert.equal(skillSet.name, "my-azureblob-skillset-3");
        assert.equal(skillSet.skills.length, 1);
        assert.equal(skillSet.skills[0].inputs.length, 2);
        assert.equal(skillSet.skills[0].outputs.length, 3);
      } catch (ex) {
        throw ex;
      } finally {
        await indexerClient.deleteSkillset(skillSet);
      }
    });

    it("modify and updates the skillsets object", async function() {
      let skillSet = await indexerClient.getSkillset("my-azureblob-skillset-2");
      skillSet.skills[0].outputs.push({
        name: "organizations",
        targetName: "organizations"
      });
      await indexerClient.createOrUpdateSkillset(skillSet);
      skillSet = await indexerClient.getSkillset("my-azureblob-skillset-2");
      assert.equal(skillSet.skills[0].outputs.length, 3);
    });
  });
});
