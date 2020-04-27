export default {
  queryUrl: '/hipMaster/deptIndex/query', // query
  showSimilarUrl: '/hipMaster/deptIndex/alreadyMerge',
  unmergeUrl: '/hipMaster/deptIndex/unMerge',
  selectDeptUrl: '/hipMaster/deptIndex/list', // select department
  selectMemberUrl: '/hipMaster/personnelIndex/list', // select member
  addUrl: '/hipMaster/deptIndex/add', // add
  editUrl: '/hipMaster/deptIndex/update', // edit
  showRuleUrl: '/hipMaster/deptIndex/queryMergeRules', // showMergeRule
  // 页面表格的列配置
  columns: [
    {
      title: '科室名称',
      key: 'deptName'
    },
    {
      title: '科室ID',
      key: 'deptId'
    },
    {
      title: '主索引',
      width: 270,
      key: 'globalId'
    },
    {
      title: '负责人',
      key: 'authorDeptContactPerson'
    },
    {
      title: '电话',
      key: 'companyContactPhone'
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
      width: 100,
      key: 'pk'
    },
    {
      title: '科室名称',
      key: 'deptName'
    },
    {
      title: '科室ID',
      key: 'deptId'
    },
    {
      title: '主索引',
      width: 270,
      key: 'globalId'
    },
    {
      title: '负责人',
      key: 'authorDeptContactPerson'
    },
    {
      title: '电话',
      key: 'companyContactPhone'
    }
  ],
  // 输入框验证规则
  inputRules: {
    selectAdd: [
      { required: true, message: '请选择科室', trigger: 'blur' }
    ],
    genderDepict: [
      { required: true, message: '请填写性别', trigger: 'blur' }
    ],
    healthCareProviderId: [
      { required: true, message: '请填写编码', trigger: 'blur' }
    ]
  }
}
