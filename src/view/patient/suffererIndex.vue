<template>
  <div>
    <Form ref="searchForm" class="form-item__inline" :model="searchForm" inline>
      <FormItem label="主索引ID">
        <Input v-model="searchForm.globalId"/>
      </FormItem>
      <FormItem label="身份证">
        <Input v-model="searchForm.identityNo"/>
      </FormItem>
      <FormItem label="姓名">
        <Input v-model="searchForm.patientName"/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="query()">查询</Button>
      </FormItem>
    </Form>
    <div class="operate-buttons">
      <span><Button @click="showAdd">新增</Button></span>
      <span><Button @click="showEdit">修改</Button></span>
      <span><Button @click="showAutoMergeRule">查看自动合并规则</Button></span>
      <!-- <span><Button @click="deleteDepartment">删除</Button></span> -->
    </div>
    <Table highlight-row @on-current-change="choice" :columns="columns" :data="results" ></Table>
    <Page :total="total" :current="current" show-total :page-size="pageSize" style="margin-top: 15px;" @on-change="query" />
     <!-- 已匹配内容 -->
    <div v-show="showSimilarContent" class="drag-drawer-inner-box">
      <Divider orientation="left">已匹配内容</Divider>
      <div class="operate-buttons">
        <span><Button @click="unMerge">解绑</Button></span>
      </div>
      <Table @on-select="choiceSimilar" :columns="unmergeColumns" :data="similars"></Table>
      <Page :total="similarTotal" :current="similarCurrent" show-total style="margin-top: 15px;" @on-change="querySimilar" />
    </div>
    <!-- 新增弹窗 -->
    <Modal
    v-model="showAddModel"
    title="新增"
    width="800"
    @on-ok="add()">
      <div>
        <i-form ref="addValidate" :model="addInput" :rules="inputRules" :label-width="140">
          <Row>
            <Col span="20">
              <FormItem label="患者ID" prop="patientId">
                <Input v-model="addInput.patientId"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="姓名">
                <Input v-model="addInput.patientName"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="身份证">
                <Input v-model="addInput.identityNo"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="住址">
                <Input v-model="addInput.homePlace"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="民族">
                <Input v-model="addInput.ethnic"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="E-mail">
                <Input v-model="addInput.email"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="生日">
                <Input v-model="addInput.dateOfBirth"/>
              </FormItem>
            </Col>
          </Row>
        </i-form>
      </div>
    </Modal>
    <!-- 修改弹窗 -->
    <Modal
    v-model="showEditModel"
    title="修改"
    width="800"
    @on-ok="edit()">
      <div>
        <i-form ref="editValidate" :model="editInput" :rules="inputRules" :label-width="140">
          <Row>
            <Col span="20">
              <FormItem label="序号">
                <Input v-model="editInput.pk"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="患者ID" prop="patientId">
                <Input v-model="editInput.patientId"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="姓名">
                <Input v-model="editInput.patientName"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="身份证">
                <Input v-model="editInput.identityNo"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="生日">
                <Input v-model="editInput.dateOfBirth"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="E-mail">
                <Input v-model="editInput.email"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="民族">
                <Input v-model="editInput.ethnic"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="住址">
                <Input v-model="editInput.homePlace"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="性别">
                <Input v-model="editInput.sex"/>
              </FormItem>
            </Col>
          </Row>
        </i-form>
      </div>
    </Modal>
    <!-- 合并规则弹窗 -->
    <Modal
    v-model="showMergeRule"
    title="合并规则"
    width="800"
    >
      <div>
        <Card :padding="0" style="width: 100%;">
            <CellGroup>
              <Cell v-for="(item, index) in mergeRuleContent" :key="index">{{item}}</Cell>
            </CellGroup>
        </Card>
      </div>
    </Modal>
  </div>
</template>

<script>
import DragDrawer from '_c/drag-drawer'
import Config from './config-suffererIndex'
import { hipMasterPost, hipMasterGet } from '@/api/data'
export default {
  components: {
    DragDrawer
  },
  data: function() {
    return {
      searchForm: {},
      columns: [
        ...Config.columns
      ],
      unmergeColumns: [
        ...Config.unmergeColumns
      ],
      inputRules: {
        ...Config.inputRules
      },
      results: [], // 页面主要内容
      similars: [], // 相似的内容
      selectAdd: '', // 新增弹窗下拉选择项
      selectEdit: '', // 修改弹窗下拉选择项
      deptNameSelection: null, // 科室选择下拉选项内容
      showAddModel: false, // 显示添加科室的弹窗
      showEditModel: false, // 显示修改科室的弹窗
      showSimilarContent: false, // 展示相似内容的抽屉
      addInput: {}, // 添加科室的内容
      editInput: {}, // 修改科室的内容
      showMergeRule: false, // 显示合并规则弹窗
      mergeRuleContent: null, // 合并规则内容
      total: null, // 科室信息总条数
      current: null, // 当前科室页码
      pageSize: 5,
      toSimilar: '', // 选中待查询相似内容的项
      toUnmerge: [], // 选中待解绑的内容
      similarTotal: null, // 相似总条数
      similarCurrent: null // 相似表格当前页码
    }
  },
  methods: {
    // 查询科室名单
    query(page = 1) {
      const { globalId, identityNo, patientName } = this.searchForm || ''
      const data = {
        url: Config.queryUrl,
        payLoad: {
          'identityNo': identityNo,
          'patientName': patientName,
          'globalId': globalId,
          'pageNumber': page,
          'pageSize': 5
        }
      }
      hipMasterPost(data).then(res => {
        this.results = res.data.records
        this.total = res.data.total
        this.current = res.data.current
      })
    },

    // 增加科室
    showAdd() {
      this.addInput = {}
      this.showAddModel = true
    },
    add() {
      this.$refs['addValidate'].validate((valid) => {
          if (valid) {
            const data = {}
            data.payLoad = this.addInput
            data.url = Config.addUrl
            hipMasterPost(data).then(res => {
              this.reset()
              this.$Modal.success({
                title: '成功',
                content: '新增成功！'
              })
            })
          } else {
            this.$Message.error('请按要求填写内容!')
          }
      })
    },
    // 修改
    showEdit() {
      this.showEditModel = true
    },
    edit() {
      const { pk, patientId, patientName, identityNo, dateOfBirth, email, ethnic, homePlace, sex } = this.editInput
      let data = {}
      data.payLoad = { pk, patientId, patientName, identityNo, dateOfBirth, email, ethnic, homePlace, sex }
      data.url = Config.editUrl
      this.$refs['editValidate'].validate((valid) => {
          if (valid) {
            hipMasterPost(data).then(res => {
              this.reset()
              this.$Modal.success({
                title: '成功',
                content: '修改成功！'
              })
            })
          } else {
            this.$Message.error('请按要求填写内容!')
          }
      })
    },
    // 获取选择修改的项
    choice(data) {
      this.selectEdit = data.pk
      this.editInput = data
      this.showSimilar(data.pk)
    },
    // 展示自动合并规则
    showAutoMergeRule() {
      hipMasterGet(Config.showRuleUrl).then(res => {
        this.mergeRuleContent = res.data
        this.showMergeRule = true
      })
    },
    // 展示相似条目
    showSimilar(pk) {
      this.toSimilar = pk // 取pk字段内容
      const data = {
        url: Config.showSimilarUrl,
        payLoad: {
          pk: this.toSimilar,
          pageNumber: 1,
          pageSize: 10
        }
      }
      hipMasterPost(data).then(res => {
        this.similars = res.data
        this.similarTotal = res.data.total
        this.similarCurrent = res.data.current
        this.showSimilarContent = true
      })
    },
    // 分页再次查询相似内容
    querySimilar(page) {
      const data = {
        url: Config.showSimilarUrl,
        payLoad: {
          pk: this.toSimilar,
          pageNumber: page,
          pageSize: 10
        }
      }
      hipMasterPost(data).then(res => {
        this.similars = res.data
        this.similarTotal = res.data.total
        this.similarCurrent = res.data.current
        this.showSimilarContent = true
      })
    },
    // 已选择待解绑的相似内容
    choiceSimilar(selection) {
      this.toUnmerge = selection.map((item) => {
        return item.pk
      })
    },
    // 解绑
    unMerge() {
      const data = {
        url: Config.unmergeUrl,
        payLoad: this.toUnmerge
      }
      hipMasterPost(data).then(res => {
        this.reset()
        this.$Modal.success({
          title: '成功',
          content: '解绑成功！'
        })
      })
    },
    // 重置页面
    reset() {
      this.query() // 重新查询
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
