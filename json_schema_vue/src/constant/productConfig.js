import { CircleCloseFilled, Download, QuestionFilled, SuccessFilled } from '@element-plus/icons-vue';

import myApi from '@/api/index.js';


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
          width: '',
        },
        {
          prop: 'desc',
          label: '任务描述',
          width: '',
        },
        {
          prop: 'taskType',
          label: '任务类型',
          width: '',
        },
      ],
      //查询组件
      curComponent: null,
      //查询部分
      queryArea: {
        taskName: '任务名称',
        taskType: '任务类型',
      },
      //查询数据调用的接口
      getDataMethod: myApi.getBatchInfo,
      //已选择的制品里，要显示的列信息的prop
      treeShowInfo: 'taskName',
      //导入的json数据里，展示在表格里的主要信息对应的key。
      jsonDataShowInfo: 'baseDataList'
    },
    {
      //根据index判断唯一制品，和ename一致
      index: 'step',
      //选项的值
      ename: 'step',
      //option选项的显示值
      cname: '步骤',
      //制品图表
      icon: Download,
      //查询结果需要显示的列
      column: [
        {
          prop: 'stepName',
          label: '步骤名称',
          width: '',
        },
        {
          prop: 'stepType',
          label: '步骤类型',
          width: '',
        },
      ],
      //查询组件
      curComponent: null,
      //查询部分

      //查询数据调用的接口

      //已选择的制品里，要显示的列信息的prop

      //导入的json数据里，展示在表格里的主要信息对应的key。
      jsonDataShowInfo: 'baseDataList',
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
          width: '',
        },
        {
          prop: 'areaCode',
          label: '代码',
          width: '',
        },
        {
          prop: 'dataType',
          label: '类型',
          width: '',
        },
        {
          prop: 'areaId',
          label: '全路径',
          width: '',
        },
      ],
      //查询组件
      curComponent: null,
      queryArea: {
        areaName: '中文名',
        areaCode: '代码',
      },
      //查询数据调用的接口
      getDataMethod: myApi.getAreaInfo,
      //已选择的制品里，要显示的列信息的prop
      treeShowInfo: 'areaName',
      jsonDataShowInfo: 'baseDataList',
    },
  ],
  getOneProduct(index) {
    return this.productItems.find(item => item.index === index);
  },

  getQueryArea(index) {
    return this.productItems.find(item => item.index === index)?.queryArea;
  },

  getAllProductIndex() {
    return this.productItems.map(item => item.index);
  },

  getMenuItem() {
    return this.productItems.filter((item) => item.index !=='step');
  },

  getAllProduct(){
    return this.productItems
  }
};


export const checkFlag = {
  variable: 'uniqueCheck',
  status: [
    {
      index: -1,
      desc: '校验失败，存在相同制品',
      icon: CircleCloseFilled,
      color: '#db2828',
    },
    {
      index: 0,
      desc: '未校验',
      icon: QuestionFilled,
      color: '#f2711c',
    }, {
      index: 1,
      desc: '校验通过',
      icon: SuccessFilled,
      color: 'rgb(103, 194, 58)',
    },
  ],
  getIcon(index) {
    return this.status.find(item => item.index === index)?.icon;
  },

  getDesc(index) {
    return this.status.find(item => item.index === index)?.desc;
  },

  getColor(index) {
    return this.status.find(item => item.index === index)?.color;
  },
};
