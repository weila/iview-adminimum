<template>
  <div>
    <Form ref="searchForm" class="form-item__inline" :model="searchForm" inline>
      <FormItem label="主索引ID">
        <Input v-model="searchForm.globalId"/>
      </FormItem>
      <FormItem label="科室名">
        <Select v-model="searchForm.deptName" clearable style="width:162px">
          <Option v-for="(item, index) in deptNameSelection" :value="item.deptName" :key="index">{{item.deptId}}-{{ item.deptName }}</Option>
        </Select>
      </FormItem>
      <FormItem label="编码">
        <Input v-model="searchForm.healthCareProviderId"/>
      </FormItem>
      <FormItem label="姓名">
        <Input v-model="searchForm.name"/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="query()">查询</Button>
      </FormItem>
    </Form>
    <div class="operate-buttons">
      <!-- <span><Button @click="showAdd">新增</Button></span>
      <span><Button @click="showEdit">修改</Button></span>
      <span><Button @click="showAutoMergeRule">查看自动合并规则</Button></span> -->
      <span><Button @click="showSimilarRule">配置相似规则</Button></span>
      <!-- <span><Button @click="deleteDepartment">删除</Button></span> -->
    </div>
    <Table @on-current-change="showSimilar" highlight-row ref="currentRowTable" :columns="columns" :data="results"></Table>
    <Page :total="total" :current="current" show-total :page-size="pageSize" style="margin-top: 15px;" @on-change="query" />
    <!-- 相似内容表格 -->
    <div v-show="showSimilarContent">
      <Divider orientation="left">相似匹配</Divider>
      <div class="operate-buttons">
        <span><Button @click="merge">关联主索引</Button></span>
      </div>
      <Table @on-select="choiceSimilar" :columns="similarColumns" :data="similars"></Table>
      <!-- <Page :total="total" :current="current" show-total style="margin-top: 15px;" @on-change="querySimilar" /> -->
    </div>
    <!-- 合并规则弹窗 -->
    <Modal
    v-model="showMergeRule"
    title="合并规则"
    width="800"
    >
      <Table :columns="ruleColumns" :data="ruleContent"></Table>
    </Modal>
  </div>
</template>

<script>
import Config from './config-memberSimilar'
import { hipMasterPost, hipMasterGet } from '@/api/data'
export default {
  components: {
  },
  data: function() {
    return {
      searchForm: {},
      columns: [
        ...Config.columns
      ],
      similarColumns: [
        ...Config.similarColumns
      ],
      ruleColumns: [
        {
          title: '序号',
          key: 'pk'
        },
        {
          title: '规则名称',
          key: 'ruleName'
        },
        {
          title: '是否匹配',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                props: {
                  trueValue: 0,
                  falseValue: 1,
                  value: params.row.isSelected
                },
                on: {
                  input: function(event) {
                    // 这里会起到监听的作用
                    params.row.isSelected = event
                  },
                  'on-change': (value) => {
                    this.changeRuleSwitch(value, params.row)
                  }
                }
              })
            ])
          }
        }
      ],
      inputRules: {
        ...Config.inputRules
      },
      results: [], // 页面主要内容
      similars: [], // 相似的内容
      selectAdd: '', // 新增弹窗下拉选择项
      selectEdit: '', // 修改弹窗下拉选择项
      deptNameSelection: null, // 新增弹窗下拉选项内容
      showSimilarContent: false, // 展示相似内容的抽屉
      showMergeRule: false, // 显示合并规则弹窗
      ruleContent: [], // 规则内容
      total: null, // 科室信息总条数
      current: null, // 当前科室页码
      pageSize: 5,
      toSimilar: '', // 选中待查询相似内容的项
      toMerge: [] // 选中待解绑的内容
    }
  },
  methods: {
    // 查询科室名单
    query(page = 1) {
      const { healthCareProviderId, deptName, globalId, name } = this.searchForm || ''
      const data = {
        url: Config.queryUrl,
        payLoad: {
          'healthCareProviderId': healthCareProviderId,
          'deptName': deptName,
          'globalId': globalId,
          'name': name,
          'pageNumber': page,
          'pageSize': this.pageSize
        }
      }
      hipMasterPost(data).then(res => {
        this.resetPage() // 重置页面内容
        this.results = res.data.records
        this.total = res.data.total
        this.current = res.data.current
      })
      // 请求下拉列表内容
      const url = Config.selectUrl
      hipMasterGet(url).then(res => {
        this.deptNameSelection = res.data
      })
    },
    // 重置页面内容
    resetPage() {
      this.showSimilarContent = false // 隐藏相似内容
      this.similars = []
    },
    // 获取选择修改的项
    choice(data) {
      this.showSimilar(data)
      this.selectEdit = data.row.pk
      this.editInput = data.row
    },
    // 展示相似规则
    showSimilarRule() {
      hipMasterGet(Config.showRuleUrl).then(res => {
        this.ruleContent = res.data
        this.showMergeRule = true
      })
    },
    // 展示相似条目
    showSimilar(row) {
      this.toSimilar = row.pk // 取pk字段内容
      const data = {
        url: Config.showSimilarUrl,
        payLoad: {
          pk: this.toSimilar
        }
      }
      hipMasterPost(data).then(res => {
        this.similars = res.data
        this.showSimilarContent = true
      })
    },
    // 已选择待解绑的相似内容
    choiceSimilar(selection) {
      this.toMerge = selection.map((item) => {
        return item.pk
      })
    },
    // 合并
    merge() {
      const data = {
        url: Config.mergeUrl,
        payLoad: {
          remainPk: this.toSimilar,
          discardPkList: this.toMerge
        }
      }
      hipMasterPost(data).then(res => {
        this.reset()
        this.$Modal.success({
          title: '成功',
          content: '关联成功！'
        })
      })
    },
    // 切换匹配状态
    changeRuleSwitch(e, row) {
      const data = {
        url: Config.ruleMatchUrl,
        payLoad: {
          'pk': row.pk,
          'isSelected': e
        }
      }
      hipMasterPost(data).then(res => {
        this.reset()
      })
    },
    // 重置页面
    reset() {
      this.showSimilarContent = false
    }
  },
  created() {
    this.query()
  }
}
</script>
<style lang="less">
  .operate-buttons{
    padding: 0 0 10px 0;
    span{
      box-sizing: border-box;
      margin-right: 4px;
    }
  }
</style>
