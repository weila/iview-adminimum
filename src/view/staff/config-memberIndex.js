export default {
  showSimilarUrl: '/hipMaster/personnelIndex/alreadyMerge', // similar
  queryUrl: '/hipMaster/personnelIndex/query', // query
  selectDeptUrl: '/hipMaster/deptIndex/list', // select
  addUrl: '/hipMaster/personnelIndex/add', // add
  editUrl: '/hipMaster/personnelIndex/update', // edit
  showRuleUrl: '/hipMaster/personnelIndex/queryMergeRules', // showMergeRule
  unmergeUrl: '/hipMaster/personnelIndex/unMerge',
  // 页面表格的列配置
  columns: [
    {
      title: '序号',
      width: 100,
      key: 'pk'
    },
    {
      title: '主索引ID',
      width: 270,
      key: 'globalId'
    },
    {
      title: '工号',
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
      title: '修改时间',
      width: 160,
      key: 'updateTime'
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
      title: '主索引ID',
      width: 270,
      key: 'globalId'
    },
    {
      title: '编码',
      width: 150,
      align: 'center',
      key: 'healthCareProviderId'
    },
    {
      title: '姓名',
      width: 100,
      align: 'center',
      key: 'name'
    },
    {
      title: '性别',
      width: 100,
      key: 'genderDepict'
    },
    {
      title: '职务',
      width: 120,
      key: 'jobCategoryName'
    },
    {
      title: '科室',
      width: 120,
      key: 'deptName'
    },
    {
      title: '电话',
      width: 120,
      key: 'phone'
    },
    {
      title: '修改时间',
      width: 160,
      key: 'updateTime'
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
