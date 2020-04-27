export default {
  queryUrl: '/hipMaster/personnel/query', // query
  selectDeptUrl: '/hipMaster/deptIndex/list', // select
  selectDomainUrl: '/hipMaster/domainId/queryList', // select
  combineUrl: '/hipMaster/personnel/merge', // merge
  mainIndexUrl: '/hipMaster/personnelIndex/query', // mainIndex
  // 页面表格的列配置
  columns: [
    {
      type: 'selection',
      width: 60,
      align: 'center'
    },
    {
      title: '序号',
      width: 60,
      align: 'center',
      key: 'pk'
    },
    {
      title: '主索引ID',
      width: 270,
      key: 'globalId'
    },
    {
      title: '域ID',
      align: 'center',
      key: 'sendId'
    },
    {
      title: '编码',
      align: 'center',
      key: 'healthCareProviderId'
    },
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '性别',
      key: 'genderDepict'
    },
    {
      title: '职务',
      key: 'jobCategoryName'
    },
    {
      title: '科室',
      key: 'deptName'
    },
    {
      title: '电话',
      width: 120,
      key: 'phone'
    },
    {
      title: '创建时间',
      width: 160,
      key: 'createTime'
    }
  ],
  // 被选中的表格项列配置
  selectionColumns: [
    {
      title: '序号',
      width: 60,
      key: 'pk'
    },
    {
      title: '域ID',
      key: 'sendId'
    },
    {
      title: '编码',
      key: 'healthCareProviderId'
    },
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '科室',
      key: 'deptName'
    },
    {
      title: '操作',
      slot: 'action'
    }
  ],
  // 主索引表格列配置
  mainIndexColumns: [
    {
      title: '主索引ID',
      key: 'globalId',
      width: 120
    },
    {
      title: '姓名',
      width: 60,
      key: 'name'
    },
    {
      title: '科室',
      width: 60,
      key: 'deptName'
    },
    {
      title: '编码',
      width: 60,
      key: 'deptId'
    }
  ]
}
