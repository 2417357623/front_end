//通用配置文件

import {
  CircleCloseFilled,
  Download,
  QuestionFilled,
  SuccessFilled,
  WarnTriangleFilled
} from '@element-plus/icons-vue'

import myApi from '@/api/index.js'

import {taskType} from '@/config/index.js'

export const productConfig = {
  //以后这种配置可以用策略性数据型结构，把数组写成对象，这样在拿取某一个数据时就不用遍历，而是用.key的方式拿取。
  productItems: [
    {
      //根据index判断唯一制品，和ename一致
      index: 'batch',
      //选项的值
      ename: 'batch',
      //option选项的显示值
      cname: '批次任务',
      //制品图表
      icon: Download,
      //查询结果需要显示的列
      column: [
        {
          prop: 'taskName',
          label: '任务名称',
          width: ''
        },
        {
          prop: 'desc',
          label: '任务描述',
          width: ''
        },
        {
          prop: 'taskType',
          label: '任务类型',
          width: '',
          formatter:(row, column, cellValue) => {
            const type = taskType.find(item => item.value === cellValue);
            return type ? type.cname : '未知任务类型';
          }
        }
      ],
      //查询组件
      curComponent: null,
      //查询部分
      queryArea: {
        taskName: '任务名称',
        taskType: '任务类型'
      },
      //查询数据调用的接口
      getDataMethod: myApi.getBatchInfo,
      //已选择的制品里，要显示的列信息的prop
      treeShowInfo: 'taskName',
      //导入的json数据里，展示在表格里的主要信息对应的key。
      jsonDataShowInfo: 'baseDataList',
      //导出时，每个制品存放的uuid的key可能不一样，需要配置以告诉tree
      uuidDescKey: 'taskUuid',
      stepColumn: [
        {
          prop: 'stepName',
          label: '步骤名称',
          width: ''
        },
        {
          prop: 'stepType',
          label: '步骤类型',
          width: ''
        }
      ],
      //导出的依赖的变量名配置在这里，分为必须和非必须依赖，不同依赖的缺失导致不同的结果
      dependency: {
        "required":["connect"],
        "unrequired":[]
      },
      dependencyListName: "",
      uniqueCheck:["taskName","projectName"],
    },
    {
      //根据index判断唯一制品，和ename一致
      index: 'area',
      //选项的值
      ename: 'area',
      //option选项的显示值
      cname: '数据分类',
      //制品图表
      icon: Download,
      //查询结果需要显示的列
      column: [
        {
          prop: 'areaName',
          label: '中文名',
          width: ''
        },
        {
          prop: 'areaCode',
          label: '代码',
          width: ''
        },
        {
          prop: 'dataType',
          label: '类型',
          width: ''
        },
        {
          prop: 'areaId',
          label: '全路径',
          width: ''
        }
      ],
      //查询组件
      curComponent: null,
      queryArea: {
        areaName: '中文名',
        areaCode: '代码'
      },
      //查询数据调用的接口
      getDataMethod: myApi.getAreaInfo,
      //已选择的制品里，要显示的列信息的prop
      treeShowInfo: 'areaName',
      jsonDataShowInfo: 'baseDataList',
      //需要的依赖的index
      dependency: {
        "required":[],
        "unrequired":[]
      },
      dependencyListName:"areaList"
    },
    //     //数据连接的唯一性由数据引擎和逻辑分区决定，数据连接作为最小的part支持导入导出，数据引擎和逻辑分区跟着连接导出。
    {
      //根据index判断唯一制品，和ename一致
      index: 'connect',
      //选项的值
      ename: 'connect',
      //option选项的显示值
      cname: '数据连接',
      onlyDependency:true,
      //制品图表
      icon: Download,
      //查询结果需要显示的列
      column: [
        {
          prop: 'uuid',
          label: 'UUID',
          width: ''
        },
        {
          prop: 'connectName',
          label: '连接名',
          width: ''
        },
        {
          prop: 'connectSchema',
          label: '数据库名/schema/项目名/桶/存储路径',
          width: ''
        },
        {
          prop: 'itemDesc',
          label: '描述',
          width: ''
        },
      ],
      //查询组件
      curComponent: null,
      //查询部分
      queryArea: {
        connectName: '任务名称',
        connectSchema: '数据库名/schema/项目名/桶/存储路径'
      },
      //查询数据调用的接口
      getDataMethod: myApi.getConnectInfo,
      //已选择的制品里，要显示的列信息的prop
      treeShowInfo: 'connectName',
      //导入的json数据里，展示在表格里的主要信息对应的key。
      jsonDataShowInfo: 'baseDataList',
      //导出时，每个制品存放的uuid的key可能不一样，需要配置以告诉tree
      uuidDescKey: 'uuid',
      dependencyListName:"dataSourceList",
      uniqueCheck:["dbEngineName","connectName"]
    }
  ],
  getOneProduct(index) {
    return this.productItems.find((item) => item.index === index)
  },

  getQueryArea(index) {
    return this.productItems.find((item) => item.index === index)?.queryArea
  },

  getRequiredDependency(index){
    return this.productItems.find((item) => item.index === index)?.dependency?.required
  },

  getUnrequiredDependency(index){
    return this.productItems.find((item) => item.index === index)?.dependency?.unrequired
  },

  getAllProductIndex() {
    return this.productItems.filter((item) => item?.onlyDependency !== true).map(item => item.index )
  },

  getAllProduct() {
    return this.productItems.filter((item) => item?.onlyDependency !== true)
  },

  getOneProductDependencyListName(index){
    return this.productItems.find((item) => item.index === index)?.dependencyListName
  },

  getUniqueCheck(index){
    return this.productItems.find((item) => item.index === index)?.uniqueCheck
  },

  getListNameArray(dependencyList){
    return dependencyList.map(item => this.getOneProductDependencyListName(item))
  }
  
}
