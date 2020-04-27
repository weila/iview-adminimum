export default {
  showSimilarUrl: '/hipMaster/patientIndex/alreadyMerge', // similar
  queryUrl: '/hipMaster/patientIndex/query', // query
  selectUrl: '/hipMaster/deptIndex/list', // select
  addUrl: '/hipMaster/patientIndex/add', // add
  editUrl: '/hipMaster/patientIndex/update', // edit
  showRuleUrl: '/hipMaster/patientIndex/queryMergeRules', // showMergeRule
  unmergeUrl: '/hipMaster/patientIndex/unMerge',
  // 页面表格的列配置
  columns: [
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
      title: '操作',
      key: 'action',
      type: 'template',
      template: 'showSimilarButton'
    }
  ],
  // 待解绑表格的列配置
  unmergeColumns: [
    {
      type: 'selection',
      width: 60,
      align: 'center'
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
    }
  ],
  // 输入框验证规则
  inputRules: {
    patientId: [
      { required: true, message: '请填写患者ID', trigger: 'blur' }
    ]
  }
}
