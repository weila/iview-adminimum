export default {
  showSimilarUrl: '/hipMaster/deptIndex/matchingList', // similar
  queryUrl: '/hipMaster/deptIndex/query', // query
  selectDeptUrl: '/hipMaster/deptIndex/list', // select department
  addUrl: '/hipMaster/deptIndex/add', // add
  editUrl: '/hipMaster/deptIndex/update', // edit
  showRuleUrl: '/hipMaster/deptIndex/matchingRules', // showMergeRule
  mergeUrl: '/hipMaster/dept/merge',
  ruleMatchUrl: '/hipMaster/deptIndex/updateRules',
  // 页面表格的列配置
  columns: [
    {
      title: '序号',
      width: 60,
      align: 'center',
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
  // 相似表格的列配置
  similarColumns: [
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
    },
    {
      title: '相似度',
      key: 'percentage',
      render: (h, params) => {
        return h('div', [
          h('span', params.row.percentage + '%')
        ])
      }
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
