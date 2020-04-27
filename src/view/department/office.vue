<template>
  <div>
    <Form ref="searchForm" class="form-item__inline" :model="searchForm" inline>
      <FormItem label="主索引ID">
        <Input v-model="searchForm.globalId"/>
      </FormItem>
      <FormItem label="科室">
        <Select v-model="searchForm.deptName" clearable style="width:162px">
          <Option v-for="(item, index) in deptNameSelection" :value="item.deptName" :key="index">{{item.deptId}}-{{ item.deptName }}</Option>
        </Select>
      </FormItem>
      <FormItem label="机构">
        <Select v-model="searchForm.domainId" clearable style="width:162px">
          <Option v-for="(item, index) in domainIdSelection" :value="item.domainId" :key="index">{{item.domainDes}}</Option>
        </Select>
      </FormItem>
      <FormItem label="编码">
        <Input v-model="searchForm.deptId"/>
      </FormItem>
      <FormItem>
      <CheckboxGroup v-model="searchForm.isMatched">
        <Checkbox label="已匹配"></Checkbox>
        <Checkbox label="未匹配"></Checkbox>
      </CheckboxGroup>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="query()">查询</Button>
      </FormItem>
    </Form>
    <div class="operate-buttons">
      <span><Button @click="showCombineAndQueryMainIndex">合并</Button></span>
    </div>
    <Table @on-selection-change="choice" :columns="columns" :data="results"></Table>
    <Page :total="total" :current="current" show-total style="margin-top: 15px;" @on-change="query" />
    <!-- 弹窗部分 -->
    <!-- 合并弹窗 -->
    <Modal
    v-model="showCombineModel"
    title="合并"
    width="1000"
    @on-ok="combine()">
      <div class="split-pane-page-wrapper">
        <split-pane v-model="splitPaneOffset">
          <div slot="left" class="pane left-pane">
            <Card :bordered="false">
              <p slot="title">已选项</p>
              <Table @on-select="choice" :columns="selectionColumns" :data="selection">
                <template slot-scope="{ row, index }" slot="action">
                  <Button type="error" size="small" @click="removeSelection(index)">删除</Button>
                </template>
              </Table>
            </Card>
          </div>
          <div slot="right" class="pane right-pane">
            <Card :bordered="false">
              <p slot="title">合并项</p>
              <Input style="padding-bottom: 4px;" v-model="searchMainIndex.globalId">
                  <span slot="prepend">主索引ID</span>
              </Input>
              <Input style="padding-bottom: 4px;" v-model="searchMainIndex.deptId">
                  <span slot="prepend">科室ID</span>
              </Input>
              <Input style="padding-bottom: 4px;" v-model="searchMainIndex.deptName">
                  <span slot="prepend">科室名称</span>
              </Input>
              <Input style="padding-bottom: 4px;" v-model="searchMainIndex.parentDeptId">
                  <span slot="prepend">父级科室ID</span>
              </Input>
              <Button style="margin: 8px 0;" type="primary" @click="showCombineAndQueryMainIndex()" long>查询</Button>
              <tree-table @radio-click="getKeep" :expand-type="false" :selectable="true" select-type="radio" :columns="mainIndexColumns" :data="mainIndex" ></tree-table>
              <Page :total="mainIndexTotal" :current="mainIndexCurrent" show-total style="margin-top: 15px;" @on-change="showCombineAndQueryMainIndex($event)" />
            </Card>
          </div>
        </split-pane>
      </div>
    </Modal>
  </div>
</template>

<script>
import SplitPane from '_c/split-pane'
import Config from './config-office'
import { hipMasterPost, hipMasterGet } from '@/api/data'
export default {
  components: {
    SplitPane
  },
  data: function() {
    return {
      searchForm: {},
      searchMainIndex: {},
      columns: [
        ...Config.columns
      ],
      selectionColumns: [
        ...Config.selectionColumns
      ],
      mainIndexColumns: [
        ...Config.mainIndexColumns
      ],
      results: [],
      deptNameSelection: null, // 科室选择下拉选项内容
      domainIdSelection: null, // 机构选择下拉选项内容
      mainIndex: [], // 合并时获取主索引条目
      showCombineModel: false, // 展示合并信息弹窗
      selection: [], // 已选条目数组
      pageAndSelection: {}, // 页面和已选条目的对应关系，用于selection数组记录翻页后所有页面的所选条目
      rows: {}, // 选中的那行信息
      remainPk: '', // 合并时被选中保留的序号
      total: null, // 表格信息总条数
      current: null, // 当前页码
      mainIndexTotal: null, // 主索引条目信息总条数
      mainIndexCurrent: null, // 主索引条目当前页码
      sendId: null, // 域ID
      selectSendId: '', // 选中的域ID
      splitPaneOffset: 0.5 // 分割面板初始分割比例
    }
  },
  methods: {
    // 查询
    query(page = 1) {
      const { globalId, name, deptName, domainId, healthCareProviderId } = this.searchForm || ''
      if (!this.searchForm.isMatched) {
         this.searchForm.isMatched = ['已匹配', '未匹配']
      }
      const matched = this.searchForm.isMatched.includes('已匹配')
      const notMatched = this.searchForm.isMatched.includes('未匹配')
      const data = {
        'url': Config.queryUrl,
        'payLoad': {
        'globalId': globalId,
        'name': name,
        'deptName': deptName,
        'sendId': domainId,
        'healthCareProviderId': healthCareProviderId,
        'matched': matched,
        'notMatched': notMatched,
        'pageNumber': page,
        'pageSize': 10
       }
      }
      hipMasterPost(data).then(res => {
        this.results = res.data.records
        this.total = res.data.total
        this.current = res.data.current
      })
      // 请求下拉列表内容
      const deptUrl = Config.selectDeptUrl
      hipMasterGet(deptUrl).then(res => {
        this.deptNameSelection = res.data
      })
      const domainUrl = Config.selectDomainUrl
      hipMasterGet(domainUrl).then(res => {
        this.domainIdSelection = res.data
      })
    },
    // 选择条目
    choice(selection, rows) {
      this.pageAndSelection[this.current] = {}
      this.pageAndSelection[this.current] = selection
    },
    // 发送请求合并
    combine() {
      this.showCombineModel = false
      let discardPkList = this.selection.map(item => {
        return item.pk
      })
      let data = {
        'url': Config.combineUrl,
        'payLoad': {
          'discardPkList': discardPkList,
          'remainPk': this.remainPk
        }
      }
      hipMasterPost(data).then(res => {
        this.reset()
        this.$Modal.success({
          title: '成功',
          content: '合并成功！'
        })
      })
    },
    // 选择保留项
    getKeep(data) {
      this.remainPk = data.row.pk
    },
    // 打开合并信息弹窗
    showCombineAndQueryMainIndex(page = 1) {
      // 合并所有分页的已选项
      this.selection = []
      for (let key in this.pageAndSelection) {
        this.selection = this.selection.concat(this.pageAndSelection[key])
      }
      let thePage = Object.prototype.toString.call(page) === '[object MouseEvent]' ? 1 : page
      // 查询主索引条目
      const data = {
        'url': Config.mainIndexUrl,
        'payLoad': {
          'deptId': this.searchMainIndex.deptId,
          'deptName': this.searchMainIndex.deptName,
          'globalId': this.searchMainIndex.globalId,
          'parentDeptId': this.searchMainIndex.parentDeptId,
          'pageNumber': thePage,
          'pageSize': 10
        }
      }
      hipMasterPost(data).then(res => {
        this.showCombineModel = true // 打开弹窗
        this.mainIndex = res.data
        this.mainIndexTotal = res.total
        this.mainIndexCurrent = res.current
      })
    },
    // 删除选择项
    removeSelection(index) {
      this.selection.splice(index, 1)
    },
    // 重置页面
    reset() {
      this.selection = [] // 清空已选数组
      this.remainPk = '' // 保留项的pk
      this.pageAndSelection = {} // 清空所有已选
      this.query() // 重新查询更新页面信息
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
  .ivu-modal-body{
    overflow-x: hidden;
  }
  .split-pane-page-wrapper{
    height: 500px;
    .pane{
      width: 100%;
      height: 100%;
      &.left-pane{
        background: #fff;
      }
      &.right-pane{
        background: #fff;
      }
    }
  }
  .ivu-modal{
    top: 20px;
  }
</style>
