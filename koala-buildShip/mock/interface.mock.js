import { defineMock } from 'vite-plugin-mock-dev-server'

const baseURL = '/xdata-succeed-mill'

export default defineMock(
  {
    url: baseURL + '/importAndExport/parseFileForDeploy',
    body: {
      "result": {
        "batch": {
          "dependency": {
            "stepList": [
              {
                "stepUuid": "DS_TK_PL_00_53e807d233424797bda47c1144f9858f",
                "stepName": "standard_xf_lm_data_standardizer_step"
              },
              {
                "stepUuid": "DS_TK_CM_00_b857670a4067416ca1f8decfe454aceb",
                "stepName": "插件运行测试722",
                "dataSourceNameList": "DY_SC_00_LO_475e59da20dc48978ed691e48263d5e4,DY_SC_00_SR_6865e6ab54b14508ada63187f5f79c65"
              },
              {
                "stepUuid": "DS_TK_DQ_00_5f5fe451ad2c45d9b7072f7653c5affe",
                "stepName": "啊大哥"
              }
            ],
            "dataSourceList": [
              {
                "dbEngineDesc": "",
                "recReviseTime": " ",
                "archiveFlag": "0",
                "dbNodeInfo": "DY_NO_00_00_c5c6f7a4663e4f74ba512f1ec1a2ce61",
                "dbStorage": "0",
                "maxSize": "",
                "readWriteProperties": " ",
                "maxLife": "",
                "uuid": "DY_SC_00_LO_475e59da20dc48978ed691e48263d5e4",
                "idleTime": "",
                "itemDbName": "EPLAT",
                "itemConfig": "{\"maxSize\":\"\",\"minSize\":\"\",\"maxLife\":\"\",\"idleTime\":\"\"}",
                "recRevisor": " ",
                "itemUsername": "eplatdev",
                "recCreateTime": "2024-01-11 09:29:42",
                "connectSchema": "EPLAT",
                "minSize": "",
                "dbEngineName": "设备部测试LYtest",
                "dbEngineUuid": "DY_DB_MY_LO_9f52bb0e045f469ea88d2e34ceb42995",
                "dbType": "DB2-MPP",
                "dbHost": "10.70.67.35",
                "connectName": "设备部测试数据连接",
                "itemDesc": " ",
                "itemPassword": "iBd^WE@xUmo3",
                "dbPort": "50000",
                "dbengineEnv": "0",
                "recCreator": "178996",
                "dbSource": "0",
                "itemParams": " ",
                "dbUrl": "jdbc:db2://10.70.67.35:50000/EPLAT:currentSchema=EPLAT;"
              },
              {
                "dbEngineDesc": "",
                "recReviseTime": "2024-05-14 14:25:37",
                "archiveFlag": "0",
                "dbNodeInfo": "DY_NO_00_00_c5c6f7a4663e4f74ba512f1ec1a2ce61",
                "dbStorage": "0",
                "maxSize": "",
                "readWriteProperties": " ",
                "maxLife": "",
                "uuid": "DY_SC_00_SR_6865e6ab54b14508ada63187f5f79c65",
                "idleTime": "",
                "itemDbName": "EPLAT",
                "itemConfig": "{\"maxSize\":\"\",\"minSize\":\"\",\"maxLife\":\"\",\"idleTime\":\"\"}",
                "recRevisor": "178996",
                "itemUsername": "root",
                "recCreateTime": "2023-11-01 09:29:12",
                "connectSchema": " EPLAT",
                "minSize": "",
                "dbEngineName": "iot源端测试",
                "dbEngineUuid": "DY_DB_MY_SR_5bd564b5ba0440ce8341c2edadc6be2a",
                "dbType": "ioTDB",
                "dbHost": "10.25.10.145",
                "connectName": "iot测试",
                "itemDesc": " ",
                "itemPassword": "root",
                "dbPort": "6667",
                "dbengineEnv": "0",
                "recCreator": "178996",
                "dbSource": "1",
                "itemParams": " ",
                "dbUrl": "jdbc:iotdb://10.25.10.145:6667"
              }
            ]
          },
          "baseDataList": [
            {
              "jobAlias": "standard_xf_lm_data_standardizer_task",
              "dvlpPriority": " ",
              "dvlpFailureStrategy": " ",
              "recReviseTime": "2024-09-25 12:49:43",
              "triggerEndTime": "",
              "receiversCc": "",
              "uiConfig": "KOALA-EDITOR",
              "globalParams": "[{\"paramName\": \"TSS_NOT_SCHEDULE_WHEN_OVERLOAD\", \"direct\": \"IN\", \"type\": \"VARCHAR\", \"value\": \"true\"}, {\"direct\":\"IN\",\"paramName\":\"TSS_GLOBAL_PARAM_EXECUTE_CONCURRENCY\",\"type\":\"INTEGER\",\"value\":\"1\"}]",
              "uuid": " ",
              "timeout": "1440",
              "stepNameList": "DS_TK_PL_00_53e807d233424797bda47c1144f9858f",
              "recRevisor": "178996",
              "dvlpTimeout": " ",
              "taskType": "1",
              "connects": "[{\"endPointTargetId\":\"DS_TK_PL_00_53e807d233424797bda47c1144f9858f\",\"sourcePort\":\"portBottom\",\"endPointSourceId\":\"start\",\"endPointSourceCellId\":\"1\",\"endPointTargetCellId\":\"2\",\"targetPort\":\"portTop\"},{\"endPointTargetId\":\"finish\",\"sourcePort\":\"portBottom\",\"endPointSourceId\":\"DS_TK_PL_00_53e807d233424797bda47c1144f9858f\",\"endPointSourceCellId\":\"2\",\"endPointTargetCellId\":\"3\",\"targetPort\":\"portTop\"}]",
              "topologyDelayRule": " ",
              "failureStrategy": "END",
              "warningGroupName": "",
              "receivers": "",
              "recCreateTime": "2024-09-19 09:50:22",
              "customSort": " ",
              "storagePosition": "DS_JL_00_00_e081c759f68c40149ee177c79d5447a7",
              "triggerStartTime": "",
              "taskConfig": "",
              "UUID": "DS_JB_CL_00_ee4c264d65cd40929d5d1b9fb264b88f",
              "timeoutStrategy": "FAILED",
              "dataSourceList": "",
              "jobName": "DS_JB_CL_00_ee4c264d65cd40929d5d1b9fb264b88f",
              "revisor": "178996",
              "creator": "178996",
              "dvlpWarningStrategy": " ",
              "warningStrategy": "FAILURE",
              "priority": "MEDIUM",
              "jobDesc": "",
              "taskUuid": "DS_JB_CL_00_ee4c264d65cd40929d5d1b9fb264b88f",
              "stepConfigList": [
                {
                  "localStepType": " ",
                  "stepUuid": "DS_TK_PL_00_53e807d233424797bda47c1144f9858f",
                  "stepType": "14",
                  "recReviseTime": "2024-09-25 12:49:38",
                  "timeout": "1024",
                  "recRevisor": "178996",
                  "dvlpTimeout": "30",
                  "stepName": "standard_xf_lm_data_standardizer_step",
                  "recCreateTime": "2024-09-18 14:51:02",
                  "storagePosition": "DS_JL_00_00_5f2a9ac125d0458681271555e67c024a",
                  "releaseStatus": "1",
                  "timeoutStrategy": "FAILED",
                  "releaseStatusNot": " ",
                  "extraConfig": " ",
                  "stepAlias": "standard_xf_lm_data_standardizer_step",
                  "stepTemplateUuid": " ",
                  "priority": "MEDIUM",
                  "taskUuid": "DS_JB_CL_00_ee4c264d65cd40929d5d1b9fb264b88f",
                  "issuedStepUuid": "DS_TK_PL_00_53e807d233424797bda47c1144f9858f",
                  "isSecrecy": " ",
                  "recCreator": "178996",
                  "pluginName": "standard_xf_lm_data_standardizer",
                  "taskName": "standard_xf_lm_data_standardizer_task",
                  "projectName": "EPLAT",
                  "stepDefinition": "{\"pluginName\":\"standard_xf_lm_data_standardizer\",\"stepParams\":[{\"paramName\":\"postHost\",\"direct\":\"OUT\",\"type\":\"VARCHAR\",\"value\":\"http://eplatdev.baocloud.cn\",\"referType\":\"0\"},{\"paramName\":\"websocketUrl\",\"direct\":\"OUT\",\"type\":\"VARCHAR\",\"value\":\"ws://10.83.64.7:9979/turing/v3/gpt\",\"referType\":\"0\"},{\"paramName\":\"threadPoolSize\",\"direct\":\"OUT\",\"type\":\"VARCHAR\",\"value\":\"4\",\"referType\":\"0\"}]}",
                  "stepContainer": "{\"memory\":\"1024\",\"vcores\":\"1\"}"
                }
              ],
              "recCreator": "178996",
              "workerGroupName": "",
              "locations": "{\"DS_TK_PL_00_53e807d233424797bda47c1144f9858f\":{\"targetarr\":\"start\",\"stepType\":\"14\",\"shape\":\"step-14\",\"name\":\"standard_xf_lm_data_standardizer_step\",\"x\":130,\"y\":151,\"cellId\":\"2\"},\"start\":{\"targetarr\":\"\",\"stepType\":\"start\",\"shape\":\"step-start\",\"name\":\"START\",\"x\":130,\"y\":45,\"cellId\":\"1\"},\"finish\":{\"targetarr\":\"DS_TK_PL_00_53e807d233424797bda47c1144f9858f\",\"stepType\":\"finish\",\"shape\":\"step-finish\",\"name\":\"FINISH\",\"x\":130,\"y\":257,\"cellId\":\"3\"}}",
              "taskName": "standard_xf_lm_data_standardizer_task",
              "dvlpTimeoutStrategy": " ",
              "changeStatus": " ",
              "projectName": "EPLAT",
              "triggerRule": " "
            },
            {
              "jobAlias": "插件运行测试722",
              "dvlpPriority": " ",
              "dvlpFailureStrategy": " ",
              "recReviseTime": "2024-07-22 15:57:00",
              "triggerEndTime": "",
              "receiversCc": "",
              "uiConfig": "KOALA-EDITOR",
              "globalParams": "[{\"paramName\": \"TSS_NOT_SCHEDULE_WHEN_OVERLOAD\", \"direct\": \"IN\", \"type\": \"VARCHAR\", \"value\": \"true\"}, {\"direct\":\"IN\",\"paramName\":\"TSS_GLOBAL_PARAM_EXECUTE_CONCURRENCY\",\"type\":\"INTEGER\",\"value\":\"1\"}]",
              "uuid": " ",
              "timeout": "1440",
              "stepNameList": "DS_TK_CM_00_b857670a4067416ca1f8decfe454aceb",
              "recRevisor": "178996",
              "dvlpTimeout": " ",
              "taskType": "1",
              "connects": "[{\"endPointTargetId\":\"DS_TK_CM_00_b857670a4067416ca1f8decfe454aceb\",\"sourcePort\":\"portBottom\",\"endPointSourceId\":\"start\",\"endPointSourceCellId\":\"1\",\"endPointTargetCellId\":\"2\",\"targetPort\":\"portTop\"},{\"endPointTargetId\":\"finish\",\"sourcePort\":\"portBottom\",\"endPointSourceId\":\"DS_TK_CM_00_b857670a4067416ca1f8decfe454aceb\",\"endPointSourceCellId\":\"2\",\"endPointTargetCellId\":\"3\",\"targetPort\":\"portTop\"}]",
              "topologyDelayRule": " ",
              "failureStrategy": "END",
              "warningGroupName": "",
              "receivers": "",
              "recCreateTime": "2024-07-22 15:53:33",
              "customSort": " ",
              "storagePosition": "DS_JL_00_00_e081c759f68c40149ee177c79d5447a7",
              "triggerStartTime": "",
              "taskConfig": "",
              "UUID": "DS_JB_CL_00_79206fdd041b441791a7128d0cf9bccb",
              "timeoutStrategy": "FAILED",
              "dataSourceList": "DY_SC_00_LO_475e59da20dc48978ed691e48263d5e4,DY_SC_00_SR_6865e6ab54b14508ada63187f5f79c65",
              "jobName": "DS_JB_CL_00_79206fdd041b441791a7128d0cf9bccb",
              "revisor": "178996",
              "creator": "178996",
              "dvlpWarningStrategy": " ",
              "warningStrategy": "FAILURE",
              "priority": "MEDIUM",
              "jobDesc": "",
              "taskUuid": "DS_JB_CL_00_79206fdd041b441791a7128d0cf9bccb",
              "stepConfigList": [
                {
                  "localStepType": " ",
                  "stepUuid": "DS_TK_CM_00_b857670a4067416ca1f8decfe454aceb",
                  "stepType": "89",
                  "dataSourceNameList": "DY_SC_00_LO_475e59da20dc48978ed691e48263d5e4,DY_SC_00_SR_6865e6ab54b14508ada63187f5f79c65",
                  "timeout": "30",
                  "dvlpTimeout": "30",
                  "stepName": "插件运行测试722",
                  "recCreateTime": "2024-07-22 15:47:41",
                  "storagePosition": "DS_JL_00_00_e081c759f68c40149ee177c79d5447a7",
                  "releaseStatus": "",
                  "timeoutStrategy": "FAILED",
                  "releaseStatusNot": " ",
                  "extraConfig": " ",
                  "stepAlias": "插件运行测试722",
                  "stepTemplateUuid": " ",
                  "priority": "MEDIUM",
                  "taskUuid": "DS_JB_CL_00_79206fdd041b441791a7128d0cf9bccb",
                  "issuedStepUuid": "DS_TK_CM_00_b857670a4067416ca1f8decfe454aceb",
                  "isSecrecy": " ",
                  "recCreator": "178996",
                  "pluginName": "standard-synchronous_extract_device_data",
                  "taskName": "插件运行测试722",
                  "projectName": "EPLAT",
                  "stepDefinition": "{\"stepParams\":[{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"db2Host\",\"type\":\"VARCHAR\",\"value\":\"10.70.67.35\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"db2Port\",\"type\":\"VARCHAR\",\"value\":\"50000\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"itemDbName\",\"type\":\"VARCHAR\",\"value\":\"EPLAT\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"schema\",\"type\":\"VARCHAR\",\"value\":\"EPLAT\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"itemParams\",\"type\":\"VARCHAR\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"tagDefineTableName\",\"type\":\"VARCHAR\",\"value\":\"T_CDM_DIM_MANAGER_VIEW\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"deviceTreeTable\",\"type\":\"VARCHAR\",\"value\":\"T_CDM_DIM_BD00_CATEGORY_TREE\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"deviceInfoSumTable\",\"type\":\"VARCHAR\",\"value\":\"T_DWD_FACT_SB00_IEDAS_DEVICE_SUMMARY\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"deviceTreeErrorTable\",\"type\":\"VARCHAR\",\"value\":\"T_CDM_FACT_BD00_CATEGORY_ERRINFO\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"standardModelTable\",\"type\":\"VARCHAR\",\"value\":\"T_CDM_DIM_BD00_MODEL\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"sumDeviceTreeTable\",\"type\":\"VARCHAR\",\"value\":\"T_DWD_FACT_SB00_IEDAS_DEVICE_TREE\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"departmentMappingSchemaTable\",\"type\":\"VARCHAR\",\"value\":\"DIM_FASD_DSADSAD\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"iotdbHost\",\"type\":\"VARCHAR\",\"value\":\"10.25.10.145\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"iotdbPort\",\"type\":\"VARCHAR\",\"value\":\"6667\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"postHost\",\"type\":\"VARCHAR\",\"value\":\"http://eplatdev.baocloud.cn\"}],\"pluginName\":\"standard-synchronous_extract_device_data\",\"backfillData\":[{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"dataEngine\",\"type\":\"VARCHAR\",\"value\":\"DY_DB_MY_LO_9f52bb0e045f469ea88d2e34ceb42995\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"iotDataEngine\",\"type\":\"VARCHAR\",\"value\":\"DY_DB_MY_SR_5bd564b5ba0440ce8341c2edadc6be2a\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"partitionUuid\",\"type\":\"VARCHAR\",\"value\":\"DY_SC_00_LO_7c72d51f5071486d8f751caa3f2be2b3\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"iedasPartitionUuid\",\"type\":\"VARCHAR\",\"value\":\"DY_SC_00_LO_7c72d51f5071486d8f751caa3f2be2b3\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"connectUuid\",\"type\":\"VARCHAR\",\"value\":\"DY_SC_00_LO_475e59da20dc48978ed691e48263d5e4\"},{\"direct\":\"OUT\",\"referType\":\"0\",\"paramName\":\"iotConnectUuid\",\"type\":\"VARCHAR\",\"value\":\"DY_SC_00_SR_6865e6ab54b14508ada63187f5f79c65\"}]}",
                  "stepContainer": "{\"memory\":\"5120\",\"vcores\":\"1\"}"
                }
              ],
              "recCreator": "178996",
              "workerGroupName": "",
              "locations": "{\"DS_TK_CM_00_b857670a4067416ca1f8decfe454aceb\":{\"targetarr\":\"start\",\"stepType\":\"89\",\"shape\":\"step-89\",\"name\":\"插件运行测试722\",\"x\":130,\"y\":151,\"cellId\":\"2\"},\"start\":{\"targetarr\":\"\",\"stepType\":\"start\",\"shape\":\"step-start\",\"name\":\"START\",\"x\":130,\"y\":45,\"cellId\":\"1\"},\"finish\":{\"targetarr\":\"DS_TK_CM_00_b857670a4067416ca1f8decfe454aceb\",\"stepType\":\"finish\",\"shape\":\"step-finish\",\"name\":\"FINISH\",\"x\":130,\"y\":257,\"cellId\":\"3\"}}",
              "taskName": "插件运行测试722",
              "dvlpTimeoutStrategy": " ",
              "changeStatus": " ",
              "projectName": "EPLAT",
              "triggerRule": " "
            },
            {
              "jobAlias": "是的",
              "dvlpPriority": " ",
              "dvlpFailureStrategy": " ",
              "recReviseTime": " ",
              "triggerEndTime": "",
              "receiversCc": "",
              "uiConfig": "<mxGraphModel grid=\"1\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageScale=\"1\" pageWidth=\"782\" pageHeight=\"477\" background=\"#ffffff\"><root><mxCell id=\"0\"><Array as=\"edgesIn\"/><Array as=\"edgesOut\"/><mxRunResult as=\"runResult\"/></mxCell><mxCell id=\"1\" parent=\"0\"><Array as=\"edgesIn\"/><Array as=\"edgesOut\"/><mxRunResult as=\"runResult\"/></mxCell><mxCell id=\"5\" style=\"edgeStyle=straightEdgeStyle;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#2f546f;\" edge=\"1\" parent=\"1\" source=\"2\" target=\"4\" lineType=\"1\"><mxGeometry relative=\"1\" as=\"geometry\"/><Array as=\"edgesIn\"/><Array as=\"edgesOut\"/><mxRunResult as=\"runResult\"/></mxCell><object name=\"START\" draw=\"Y\" start=\"Y\" dummy=\"N\" start_time=\"2099-12-31 00:00:00\" triggerType=\"1\" timingType=\"2\" intervalYear=\"\" intervalDay=\"00:00:00\" intervalTimeValue=\"0\" timeType=\"0\" rule=\"1 00 00 00 * ? ?\" id=\"2\"><mxCell style=\"image;html=1;labelBackgroundColor=#ffffff;image=./graph/stencils/icons/STR.svg\" vertex=\"1\" initFuncName=\"initStart\" type=\"Start\" localData=\"{&quot;draw&quot;:&quot;Y&quot;,&quot;start&quot;:&quot;Y&quot;,&quot;dummy&quot;:&quot;N&quot;,&quot;name&quot;:&quot;START&quot;,&quot;start_time&quot;:&quot;2099-12-31 00:00:00&quot;,&quot;timingType&quot;:&quot;2&quot;,&quot;intervalYear&quot;:&quot;&quot;,&quot;intervalDay&quot;:&quot;00:00:00&quot;,&quot;intervalTimeValue&quot;:&quot;0&quot;,&quot;timeType&quot;:&quot;0&quot;,&quot;rule&quot;:&quot;1 00 00 00 * ? ?&quot;,&quot;triggerType&quot;:&quot;1&quot;}\" lineTypes=\"1\" parent=\"1\"><mxGeometry x=\"60\" y=\"40\" width=\"34\" height=\"34\" as=\"geometry\"/><Array as=\"edgesIn\"/><Array as=\"edgesOut\"><mxCell id=\"5\" style=\"edgeStyle=straightEdgeStyle;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#2f546f;\" edge=\"1\" parent=\"1\" source=\"2\" target=\"4\" lineType=\"1\"><mxGeometry relative=\"1\" as=\"geometry\"/><Array as=\"edgesIn\"/><Array as=\"edgesOut\"/><mxRunResult as=\"runResult\"/></mxCell></Array><mxRunResult as=\"runResult\"/><mxRectangleShape strokewidth=\"1.3\" stroke=\"#55778f\" dialect=\"svg\" cursor=\"move\" as=\"innerLine\"><mxRectangle x=\"59.5\" y=\"39.5\" width=\"35\" height=\"35\" as=\"bounds\"/><g xmlns=\"http://www.w3.org/2000/svg\" transform=\"translate(0.5,0.5)\" style=\"visibility: visible; cursor: move;\" as=\"node\"><rect x=\"59.5\" y=\"39.5\" width=\"35\" height=\"35\" rx=\"5\" ry=\"5\" fill=\"none\" stroke=\"white\" stroke-width=\"9.3\" pointer-events=\"stroke\" visibility=\"hidden\"/><rect x=\"59.5\" y=\"39.5\" width=\"35\" height=\"35\" rx=\"5\" ry=\"5\" fill=\"none\" stroke=\"#55778f\" stroke-width=\"1.3\" pointer-events=\"all\"/></g><Array as=\"oldGradients\"/><mxRectangle x=\"58.85\" y=\"38.85\" width=\"36.3\" height=\"36.3\" as=\"boundingBox\"/></mxRectangleShape></mxCell></object><object name=\"FINISH\" id=\"3\"><mxCell style=\"image;html=1;labelBackgroundColor=#ffffff;image=./graph/stencils/icons/SUC.svg\" vertex=\"1\" initFuncName=\"initFinish\" type=\"Finish\" localData=\"{&quot;name&quot;:&quot;FINISH&quot;}\" lineTypes=\"1\" parent=\"1\"><mxGeometry x=\"300\" y=\"40\" width=\"34\" height=\"34\" as=\"geometry\"/><Array as=\"edgesIn\"><mxCell id=\"7\" style=\"edgeStyle=straightEdgeStyle;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#2f546f;\" edge=\"1\" parent=\"1\" source=\"4\" target=\"3\" lineType=\"1\"><mxGeometry relative=\"1\" as=\"geometry\"/><Array as=\"edgesIn\"/><Array as=\"edgesOut\"/><mxRunResult as=\"runResult\"/></mxCell></Array><Array as=\"edgesOut\"/><mxRunResult as=\"runResult\"/><mxRectangleShape strokewidth=\"1.3\" stroke=\"#55778f\" dialect=\"svg\" cursor=\"move\" as=\"innerLine\"><mxRectangle x=\"299.5\" y=\"39.5\" width=\"35\" height=\"35\" as=\"bounds\"/><g xmlns=\"http://www.w3.org/2000/svg\" transform=\"translate(0.5,0.5)\" style=\"visibility: visible; cursor: move;\" as=\"node\"><rect x=\"299.5\" y=\"39.5\" width=\"35\" height=\"35\" rx=\"5\" ry=\"5\" fill=\"none\" stroke=\"white\" stroke-width=\"9.3\" pointer-events=\"stroke\" visibility=\"hidden\"/><rect x=\"299.5\" y=\"39.5\" width=\"35\" height=\"35\" rx=\"5\" ry=\"5\" fill=\"none\" stroke=\"#55778f\" stroke-width=\"1.3\" pointer-events=\"all\"/></g><Array as=\"oldGradients\"/><mxRectangle x=\"298.85\" y=\"38.85\" width=\"36.3\" height=\"36.3\" as=\"boundingBox\"/></mxRectangleShape></mxCell></object><mxCell id=\"7\" style=\"edgeStyle=straightEdgeStyle;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#2f546f;\" edge=\"1\" parent=\"1\" source=\"4\" target=\"3\" lineType=\"1\"><mxGeometry relative=\"1\" as=\"geometry\"/><Array as=\"edgesIn\"/><Array as=\"edgesOut\"/><mxRunResult as=\"runResult\"/></mxCell><object name=\"啊大哥\" step_original_name=\"啊大哥\" id=\"4\"><mxCell style=\"image;html=1;labelBackgroundColor=#ffffff;image=./graph/stencils/icons/quality.png\" vertex=\"1\" initFuncName=\"initDataCollection\" type=\"12\" localData=\"{&quot;name&quot;:&quot;啊大哥&quot;,&quot;step_original_name&quot;:&quot;啊大哥&quot;}\" lineTypes=\"1\" parent=\"1\"><mxGeometry x=\"180\" y=\"40\" width=\"34\" height=\"34\" as=\"geometry\"/><Array as=\"edgesIn\"><mxCell id=\"5\" style=\"edgeStyle=straightEdgeStyle;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#2f546f;\" edge=\"1\" parent=\"1\" source=\"2\" target=\"4\" lineType=\"1\"><mxGeometry relative=\"1\" as=\"geometry\"/><Array as=\"edgesIn\"/><Array as=\"edgesOut\"/><mxRunResult as=\"runResult\"/></mxCell></Array><Array as=\"edgesOut\"><mxCell id=\"7\" style=\"edgeStyle=straightEdgeStyle;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#2f546f;\" edge=\"1\" parent=\"1\" source=\"4\" target=\"3\" lineType=\"1\"><mxGeometry relative=\"1\" as=\"geometry\"/><Array as=\"edgesIn\"/><Array as=\"edgesOut\"/><mxRunResult as=\"runResult\"/></mxCell></Array><mxRunResult as=\"runResult\"/><mxRectangleShape strokewidth=\"1.3\" stroke=\"#55778f\" dialect=\"svg\" cursor=\"move\" as=\"innerLine\"><mxRectangle x=\"179.5\" y=\"39.5\" width=\"35\" height=\"35\" as=\"bounds\"/><g xmlns=\"http://www.w3.org/2000/svg\" transform=\"translate(0.5,0.5)\" style=\"visibility: visible; cursor: move;\" as=\"node\"><rect x=\"179.5\" y=\"39.5\" width=\"35\" height=\"35\" rx=\"5\" ry=\"5\" fill=\"none\" stroke=\"white\" stroke-width=\"9.3\" pointer-events=\"stroke\" visibility=\"hidden\"/><rect x=\"179.5\" y=\"39.5\" width=\"35\" height=\"35\" rx=\"5\" ry=\"5\" fill=\"none\" stroke=\"#55778f\" stroke-width=\"1.3\" pointer-events=\"all\"/></g><Array as=\"oldGradients\"/><mxRectangle x=\"178.85\" y=\"38.85\" width=\"36.3\" height=\"36.3\" as=\"boundingBox\"/></mxRectangleShape></mxCell></object></root></mxGraphModel>",
              "globalParams": "[{\"paramName\": \"TSS_NOT_SCHEDULE_WHEN_OVERLOAD\", \"direct\": \"IN\", \"type\": \"VARCHAR\", \"value\": \"true\"}, {\"paramName\": \"TSS_GLOBAL_PARAM_EXECUTE_CONCURRENCY\", \"direct\": \"IN\", \"type\": \"INTEGER\", \"value\": \"1\"}]",
              "uuid": " ",
              "timeout": "",
              "stepNameList": "DS_TK_DQ_00_5f5fe451ad2c45d9b7072f7653c5affe",
              "recRevisor": " ",
              "dvlpTimeout": " ",
              "taskType": "2",
              "connects": "[{\"endPointTargetId\":\"DS_TK_DQ_00_5f5fe451ad2c45d9b7072f7653c5affe\",\"endPointSourceId\":\"start\"},{\"endPointTargetId\":\"finish\",\"endPointSourceId\":\"DS_TK_DQ_00_5f5fe451ad2c45d9b7072f7653c5affe\"}]",
              "topologyDelayRule": " ",
              "failureStrategy": "",
              "warningGroupName": "",
              "receivers": "",
              "recCreateTime": "2024-07-19 11:14:15",
              "customSort": " ",
              "storagePosition": "114",
              "triggerStartTime": "2099-12-31 00:00:00",
              "taskConfig": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><task><name>test</name><entries><entry><type>Start</type><name>START</name><draw>Y</draw><start>Y</start><dummy>N</dummy><start_time>2099-12-31 00:00:00</start_time><triggerType>1</triggerType><timingType>2</timingType><intervalYear></intervalYear><intervalDay>00:00:00</intervalDay><intervalTimeValue>0</intervalTimeValue><timeType>0</timeType><rule>1 00 00 00 * ? ?</rule><taskType>2</taskType>     </entry><entry><type>Finish</type><name>FINISH</name></entry><entry><type>15</type><name>啊大哥</name><step_original_name>啊大哥</step_original_name></entry></entries><hops><hop><from>START</from><to>啊大哥</to><enabled>Y</enabled><evaluation>Y</evaluation><unconditional>N</unconditional></hop><hop><from>啊大哥</from><to>FINISH</to><enabled>Y</enabled><evaluation>Y</evaluation><unconditional>N</unconditional></hop></hops><localSettings enableLog=\"false\" logLevel=\"basic\"/></task>",
              "UUID": "DS_JB_MC_00_dd93d5b6ba4b45249f90fab533592768",
              "timeoutStrategy": "",
              "dataSourceList": "",
              "jobName": "DS_JB_MC_00_dd93d5b6ba4b45249f90fab533592768",
              "revisor": " ",
              "creator": "195326",
              "dvlpWarningStrategy": " ",
              "warningStrategy": "",
              "priority": "",
              "jobDesc": "",
              "taskUuid": "DS_JB_MC_00_dd93d5b6ba4b45249f90fab533592768",
              "stepConfigList": [
                {
                  "localStepType": " ",
                  "stepUuid": "DS_TK_DQ_00_5f5fe451ad2c45d9b7072f7653c5affe",
                  "releaseStatusNot": " ",
                  "extraConfig": " ",
                  "stepType": "12",
                  "stepAlias": "啊大哥",
                  "stepTemplateUuid": " ",
                  "taskUuid": "DS_JB_MC_00_dd93d5b6ba4b45249f90fab533592768",
                  "issuedStepUuid": "DS_TK_DQ_00_5f5fe451ad2c45d9b7072f7653c5affe",
                  "isSecrecy": " ",
                  "recCreator": "195326",
                  "stepName": "啊大哥",
                  "pluginName": "eplat-quality",
                  "recCreateTime": "2024-07-19 11:14:12",
                  "storagePosition": "114",
                  "taskName": "是的",
                  "projectName": "EPLAT",
                  "stepDefinition": "{\"stepParams\":[{\"direct\":\"IN\",\"referType\":\"1\",\"paramName\":\"userId\",\"type\":\"VARCHAR\",\"value\":\"195326\"},{\"direct\":\"IN\",\"referType\":\"1\",\"paramName\":\"groupId\",\"type\":\"VARCHAR\",\"value\":\"\"},{\"direct\":\"IN\",\"referType\":\"1\",\"paramName\":\"groupName\",\"type\":\"VARCHAR\",\"value\":\"\"},{\"direct\":\"IN\",\"referType\":\"0\",\"paramName\":\"ossAccessKey\",\"type\":\"VARCHAR\",\"value\":\"Uqmbo6IF9xYMmG+18m4Nqg==\"},{\"direct\":\"IN\",\"referType\":\"1\",\"paramName\":\"ossAccessSecret\",\"type\":\"VARCHAR\",\"value\":\"Uqmbo6IF9xYMmG+18m4Nqg==\"},{\"direct\":\"IN\",\"referType\":\"1\",\"paramName\":\"ossEndpoint\",\"type\":\"VARCHAR\",\"value\":\"\"},{\"direct\":\"IN\",\"referType\":\"1\",\"paramName\":\"ossBucket\",\"type\":\"VARCHAR\",\"value\":\"\"},{\"direct\":\"IN\",\"referType\":\"1\",\"paramName\":\"ossFilePath\",\"type\":\"VARCHAR\",\"value\":\"default\"},{\"direct\":\"IN\",\"referType\":\"0\",\"paramName\":\"eplatCustomFolder\",\"type\":\"VARCHAR\",\"value\":\"\"},{\"direct\":\"IN\",\"referType\":\"0\",\"paramName\":\"fileName\",\"type\":\"VARCHAR\"},{\"direct\":\"IN\",\"paramName\":\"storageType\",\"type\":\"VARCHAR\",\"value\":\"OSS\"},{\"direct\":\"IN\",\"paramName\":\"fileSourceType\",\"type\":\"VARCHAR\",\"value\":\"0\"},{\"direct\":\"IN\",\"paramName\":\"serviceUrl\",\"type\":\"VARCHAR\",\"value\":\"http://eplatdev.baocloud.cn/xdata-succeed-mill\"},{\"direct\":\"IN\",\"paramName\":\"qualityStr\",\"type\":\"VARCHAR\",\"value\":\"{\\\"dbEngineUuid\\\":\\\"DY_DB_RD_LO_c528d627a55a41879b12f87c1ecca08d\\\",\\\"connectUuid\\\":\\\"\\\",\\\"groupId\\\":\\\"\\\",\\\"stepId\\\":\\\"DS_TK_DQ_00_5f5fe451ad2c45d9b7072f7653c5affe\\\",\\\"dbType\\\":\\\"CDHHIVE\\\",\\\"jdbc\\\":\\\"org.apache.hive.jdbc.HiveDriver\\\",\\\"rules\\\":[],\\\"schemaName\\\":\\\"\\\",\\\"url\\\":\\\"jdbc:hive2://10.70.248.146:21050/db12_bobtest\\\",\\\"tableName\\\":\\\"\\\",\\\"itemSchema\\\":\\\"db12_bobtest\\\",\\\"groupName\\\":\\\"\\\",\\\"tableUuid\\\":\\\"\\\",\\\"tbProjectName\\\":\\\"EPLAT\\\",\\\"taskExecutionType\\\":\\\"1\\\",\\\"dbEngineName\\\":\\\"hive_test\\\",\\\"sr\\\":\\\"http://eplatdev.baocloud.cn/xdata-succeed-mill\\\"}\"}],\"extraConfig\":{\"$ref\":\"@\"},\"pluginName\":\"eplat-quality\"}",
                  "stepContainer": "{\"memory\":\"\",\"vcores\":\"1\"}"
                }
              ],
              "recCreator": "195326",
              "workerGroupName": "",
              "locations": "{\"DS_TK_DQ_00_5f5fe451ad2c45d9b7072f7653c5affe\":{\"targetarr\":\"start\",\"name\":\"啊大哥\",\"x\":\"180\",\"y\":\"40\"},\"start\":{\"targetarr\":\"\",\"name\":\"START\",\"x\":\"60\",\"y\":\"40\"},\"finish\":{\"targetarr\":\"DS_TK_DQ_00_5f5fe451ad2c45d9b7072f7653c5affe\",\"name\":\"FINISH\",\"x\":\"300\",\"y\":\"40\"}}",
              "taskName": "是的",
              "dvlpTimeoutStrategy": " ",
              "changeStatus": " ",
              "projectName": "EPLAT",
              "triggerRule": "1 00 00 00 * ? ?"
            }
          ],
          "objType": "batch"
        }
      },
      "status": "1"
    },
    enabled: true
  }
)