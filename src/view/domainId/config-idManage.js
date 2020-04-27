export default {
  queryUrl: '/hipMaster/domainId/query', // query
  // selectDeptUrl: '/hipMaster/deptIndex/list', // select department
  // selectMemberUrl: '/hipMaster/personnelIndex/list', // select member
  addUrl: '/hipMaster/domainId/add', // add
  editUrl: '/hipMaster/domainId/update', // edit
  deleteUrl: '/hipMaster/domainId/delete', // delete
  // showRuleUrl: '/hipMaster/deptIndex/queryMergeRules', // showMergeRule
  // 页面表格的列配置
  columns: [
    {
      type: 'selection',
      width: 60,
      align: 'center'
    },
    {
      title: '序号',
      key: 'pk'
    },
    {
      title: '域ID',
      key: 'domainId'
    },
    {
      title: '描述',
      key: 'domainDes'
    }
  ],
  // 输入框验证规则
  inputRules: {
    domainId: [
      { required: true, message: '请填写域ID', trigger: 'blur' }
    ],
    domainDes: [
      { required: true, message: '请填写描述', trigger: 'blur' }
    ]
  }
}
