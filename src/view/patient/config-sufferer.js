export default {
  queryUrl: '/hipMaster/patient/query', // query
  selectDeptUrl: '/hipMaster/deptIndex/list', // select
  selectDomainUrl: '/hipMaster/domainId/queryList', // select
  combineUrl: '/hipMaster/patient/merge', // merge
  mainIndexUrl: '/hipMaster/patientIndex/query', // mainIndex
  // 页面表格的列配置
  columns: [
    {
      type: 'selection',
      width: 60
    },
    {
      title: '序号',
      width: 60,
      key: 'pk'
    },
    {
      title: '患者ID',
      key: 'patientId'
    },
    {
      title: '主索引ID',
      width: 270,
      key: 'globalId'
    },
    {
      title: '姓名',
      key: 'patientName'
    },
    {
      title: '生日',
      key: 'dateOfBirth'
    },
    {
      title: 'Email',
      key: 'email'
    },
    {
      title: '民族',
      key: 'ethnic'
    },
    {
      title: '住址',
      key: 'homePlace'
    },
    {
      title: '身份证',
      key: 'identityNo'
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
      title: '患者ID',
      key: 'patientId',
      width: 120
    },
    {
      title: '患者姓名',
      key: 'patientName',
      width: 120
    },
    {
      title: '性别',
      width: 60,
      key: 'sex'
    },
    {
      title: '民族',
      width: 60,
      key: 'ethnic'
    },
    {
      title: '生日',
      width: 60,
      key: 'dateOfBirth'
    }
  ]
}
