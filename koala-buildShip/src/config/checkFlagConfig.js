import * as CONSTANTS from '@/constant/index.js'

import {
    CircleCloseFilled,
    Download,
    QuestionFilled,
    SuccessFilled,
    WarnTriangleFilled
  } from '@element-plus/icons-vue'
  
export const checkFlag = {
    uniqueCheck: {
      columnName: '唯一性校验',
      variable: 'uniqueCheck',
      status: [
        {
          index: CONSTANTS.CHECK_FAILED,
          desc: '警告，存在相同制品',
          icon: WarnTriangleFilled,
          color: '#f2711c'
        },
        {
          index: CONSTANTS.CHECK_UNDO,
          desc: '未校验',
          icon: QuestionFilled,
          color: 'var(--ep-border-color)'
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
          color: '#f2711c'
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
          color: 'var(--ep-border-color)'
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