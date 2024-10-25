//用于制品依赖变更
const form = {

    connect:{
        "uuidXXXXXXXXXXXXXXXXX":{
            "uuid": "DY_SC_00_LO_5c3b157c9edc4db39ad95364fda07b46",
            "connectName": "zxs_oracle_test"
        },
        "uuidXXXXXXXXXXXXXXXXX":{
            "uuid": "DY_SC_00_LO_5c3b157c9edc4db39ad95364fda07b46",
            "connectName": "zxs_oracle_test"
        }
    },
    batch:{
        "uuidXXXXXXXXXXXXXXXXX":{
            "uuid": "DY_SC_00_LO_5c3b157c9edc4db39ad95364fda07b46",
            "connectName": "zxs_oracle_test"
        },
        "uuidXXXXXXXXXXXXXXXXX":{
            "uuid": "DY_SC_00_LO_5c3b157c9edc4db39ad95364fda07b46",
            "connectName": "zxs_oracle_test"
        }
    }
   
}

//用于制品生成，制品展示等
const handledTableData = {
    "batch": [
        {
            "jobAlias": "插件运行测试722",
            "dependencyCheck": -1,
            "uniqueCheck": 1,
            "stepNameList": "DS_TK_CM_00_b857670a4067416ca1f8decfe454aceb",
            "dataSourceList": "DY_SC_00_LO_475e59da20dc48978ed691e48263d5e4,DY_SC_00_SR_6865e6ab54b14508ada63187f5f79c65",
            "isImport": false,
            "taskUuid": "DS_JB_CL_00_79206fdd041b441791a7128d0cf9bccb",
            "stepConfigList": [
                {
                    "localStepType": " ",
                    "stepUuid": "DS_TK_CM_00_b857670a4067416ca1f8decfe454aceb"
                }
            ],
            "taskName": "插件运行测试722",
            "valueForExpendRow": {
                "unrequired": [],
                "required": [
                    {
                        "dbEngineName": "设备部测试LYtest",
                        "connectName": "设备部测试数据连接"
                    }
                ]
            }
        },
        {}
    ]
}

//
const dependencyData = {
    "batch": {
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
                "isExist": false,
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
                "isExist": true,
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
    }
}

const valueForExpendRow = {
    "unrequired": [],
    "required": [
        {
            "dbEngineName": "设备部测试LYtest",
            "connectName": "设备部测试数据连接"
        }
    ]   
}