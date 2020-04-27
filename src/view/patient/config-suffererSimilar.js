export default {
  showSimilarUrl: '/hipMaster/patientIndex/matchingList', // similar
  queryUrl: '/hipMaster/patientIndex/query', // query
  selectUrl: '/hipMaster/deptIndex/list', // select
  addUrl: '/hipMaster/patientIndex/add', // add
  editUrl: '/hipMaster/patientIndex/update', // edit
  showRuleUrl: '/hipMaster/patientIndex/matchingRules', // showMergeRule
  mergeUrl: '/hipMaster/patient/merge',
  ruleMatchUrl: '/hipMaster/personnelIndex/updateRules',
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
