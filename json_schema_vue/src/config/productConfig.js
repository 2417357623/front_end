import {
  CircleCloseFilled,
  Download,
  QuestionFilled,
  SuccessFilled,
  WarnTriangleFilled
} from '@element-plus/icons-vue'

import myApi from '@/api/index.js'
import * as CONSTANTS from '@/constant/index.js'

export const productConfig = {
  productItems: [
    {
      //根据index判断唯一制品，和ename一致
      index: 'batch',
      //选项的值
      ename: 'batch',
      //option选项的显示值
      cname: '批式任务',
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
          width: ''
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
      ]
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
      jsonDataShowInfo: 'baseDataList'
    }
    //     //数据连接的唯一性由数据引擎和逻辑分区决定，数据连接作为最小的part支持导入导出，数据引擎和逻辑分区跟着连接导出。
    // {
    //   //根据index判断唯一制品，和ename一致
    //   index: 'connect',
    //   //选项的值
    //   ename: 'connect',
    //   //option选项的显示值
    //   cname: '数据连接',
    //   //制品图表
    //   icon: Download,
    //   //查询结果需要显示的列
    //   column: [
    //     {
    //       prop: 'uuid',
    //       label: 'UUID',
    //       width: ''
    //     },
    //     {
    //       prop: 'connectName',
    //       label: '连接名',
    //       width: ''
    //     },
    //     {
    //       prop: 'connectSchema',
    //       label: '数据库名/schema/项目名/桶/存储路径',
    //       width: ''
    //     },
    //     {
    //       prop: 'itemDesc',
    //       label: '描述',
    //       width: ''
    //     },
    //   ],
    //   //查询组件
    //   curComponent: null,
    //   //查询部分
    //   queryArea: {
    //     connectName: '任务名称',
    //     connectSchema: '数据库名/schema/项目名/桶/存储路径'
    //   },
    //   //查询数据调用的接口
    //   getDataMethod: myApi.getConnectInfo,
    //   //已选择的制品里，要显示的列信息的prop
    //   treeShowInfo: 'connectName',
    //   //导入的json数据里，展示在表格里的主要信息对应的key。
    //   jsonDataShowInfo: 'baseDataList',
    //   //导出时，每个制品存放的uuid的key可能不一样，需要配置以告诉tree
    //   uuidDescKey: 'uuid'
    // }
  ],
  getOneProduct(index) {
    return this.productItems.find((item) => item.index === index)
  },

  getQueryArea(index) {
    return this.productItems.find((item) => item.index === index)?.queryArea
  },

  getAllProductIndex() {
    return this.productItems.map((item) => item.index)
  },

  getMenuItem() {
    return this.productItems.filter((item) => item.index)
  },

  getAllProduct() {
    return this.productItems
  }
}

export const checkFlag = {
  uniqueCheck: {
    columnName: '唯一性校验',
    variable: 'uniqueCheck',
    status: [
      {
        index: CONSTANTS.CHECK_WARN,
        desc: '警告，存在相同制品',
        icon: WarnTriangleFilled,
        color: 'yellow'
      },
      {
        index: CONSTANTS.CHECK_UNDO,
        desc: '未校验',
        icon: QuestionFilled,
        color: '#f2711c'
      },
      {
        index: CONSTANTS.CHECK_SUCCESS,
        desc: '校验通过',
        icon: SuccessFilled,
        color: 'rgb(103, 194, 58)'
      }
    ],
    strategyVariable: 'uniqueCheckStrategy',
    strategyColumnName: '唯一性校验策略',
    strategyActiveText:"强制导入",
    strategyInactiveText:"不导入",

    getIcon(index) {
      return this.status.find((item) => item.index === index)?.icon
    },

    getDesc(index) {
      return this.status.find((item) => item.index === index)?.desc
    },

    getColor(index) {
      return this.status.find((item) => item.index === index)?.color
    }
  },

  dependencyCheck: {
    columnName: '依赖校验',
    variable: 'dependencyCheck',
    status: [
      {
        index: CONSTANTS.CHECK_WARN,
        desc: '部分依赖缺失，可以强制导入',
        icon: WarnTriangleFilled,
        color: 'yellow'
      },
      {
        index: CONSTANTS.CHECK_FAILED,
        desc: '依赖校验失败，该部分依赖缺失将无法导入',
        icon: CircleCloseFilled,
        color: '#db2828'
      },
      {
        index: CONSTANTS.CHECK_UNDO,
        desc: '依赖未校验',
        icon: QuestionFilled,
        color: '#f2711c'
      },
      {
        index: CONSTANTS.CHECK_SUCCESS,
        desc: '依赖校验通过',
        icon: SuccessFilled,
        color: 'rgb(103, 194, 58)'
      }
    ],
    strategyVariable: 'dependencyCheckStrategy',
    strategyColumnName: '依赖校验策略',
    strategyActiveText:"覆盖",
    strategyInactiveText:"不导入",

    getIcon(index) {
      return this.status.find((item) => item.index === index)?.icon
    },

    getDesc(index) {
      return this.status.find((item) => item.index === index)?.desc
    },

    getColor(index) {
      return this.status.find((item) => item.index === index)?.color
    }
  }
}
