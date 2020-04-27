export default {
  queryUrl: '/hipMaster/dept/query', // query
  combineUrl: '/hipMaster/dept/merge', // merge
  selectDeptUrl: '/hipMaster/deptIndex/list', // select
  selectDomainUrl: '/hipMaster/domainId/queryList', // select
  mainIndexUrl: '/hipMaster/deptIndex/query', // mainIndex
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
      title: '负责人',
      key: 'authorDeptContactPerson'
    },
    {
      title: '联系电话',
      width: 120,
      key: 'companyContactPhone'
    },
    {
      title: '创建时间',
      align: 'center',
      key: 'createTime'
    },
    {
      title: '科室ID',
      key: 'deptId'
    },
    {
      title: '科室名称',
      key: 'deptName'
    },
    {
      title: '主索引',
      key: 'globalId'
    },
    {
      title: '域ID',
      key: 'sendId'
    }
  ],
  // 被选中的表格项列配置
  selectionColumns: [
    {
      title: '序号',
      width: 60,
      align: 'center',
      key: 'pk'
    },
    {
      title: '负责人',
      key: 'authorDeptContactPerson'
    },
    {
      title: '科室ID',
      key: 'deptId'
    },
    {
      title: '科室名',
      key: 'deptName'
    },
    {
      title: '域ID',
      key: 'sendId'
    },
    {
      title: '操作',
      slot: 'action'
    }
  ],
  // 主索引表格列配置
  mainIndexColumns: [
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
      title: '负责人',
      width: 100,
      key: 'authorDeptContactPerson'
    },
    {
      title: '电话',
      align: 'center',
      key: 'companyContactPhone'
    },
    {
      title: '科室ID',
      key: 'deptId'
    },
    {
      title: '科室名称',
      key: 'deptName'
    }
  ]
}
