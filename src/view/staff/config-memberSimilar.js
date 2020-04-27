export default {
  showSimilarUrl: '/hipMaster/personnelIndex/matchingList', // similar
  queryUrl: '/hipMaster/personnelIndex/query', // query
  selectUrl: '/hipMaster/deptIndex/list', // select
  addUrl: '/hipMaster/personnelIndex/add', // add
  editUrl: '/hipMaster/personnelIndex/update', // edit
  showRuleUrl: '/hipMaster/personnelIndex/matchingRules', // showMergeRule
  mergeUrl: '/hipMaster/personnel/merge',
  ruleMatchUrl: '/hipMaster/personnelIndex/updateRules',
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
      title: '编码',
      align: 'center',
      key: 'healthCareProviderId'
    },
    {
      title: '姓名',
      align: 'center',
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
  // 相似表格的列配置
  similarColumns: [
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
