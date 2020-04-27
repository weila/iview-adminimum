<template>
  <div>
    <Form ref="searchForm" class="form-item__inline" :model="searchForm" inline>
      <FormItem label="描述">
        <Input v-model="searchForm.domainDes"/>
      </FormItem>
      <FormItem label="ID">
        <Input v-model="searchForm.domainId"/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="query()">查询</Button>
      </FormItem>
    </Form>
    <div class="operate-buttons">
      <span><Button @click="showAdd">新增</Button></span>
      <span><Button @click="showEdit">修改</Button></span>
      <span><Button @click="delItem">删除</Button></span>
    </div>
    <Table @on-select="choice" :columns="columns" :data="results" >
    </Table>
    <Page :total="total" :current="current" show-total style="margin-top: 15px;" @on-change="query" />
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
              <FormItem label="域ID" prop="domainId">
                <Input v-model="addInput.domainId"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="描述" prop="domainDes">
                <Input v-model="addInput.domainDes"/>
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
              <FormItem label="域ID" prop="domainId">
                <Input v-model="editInput.domainId"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="描述" prop="domainDes">
                <Input v-model="editInput.domainDes"/>
              </FormItem>
            </Col>
          </Row>
        </i-form>
      </div>
    </Modal>
  </div>
</template>

<script>
import Config from './config-idManage'
import { hipMasterPost } from '@/api/data'
export default {
  data: function() {
    return {
      searchForm: {},
      columns: [
        ...Config.columns
      ],
      inputRules: {
        ...Config.inputRules
      },
      results: [],
      showAddModel: false, // 显示添加的弹窗
      showEditModel: false, // 显示修改的弹窗
      addInput: {}, // 添加的内容
      editInput: {}, // 修改的内容
      total: null, // 信息总条数
      current: null // 当前页码
    }
  },
  methods: {
    // 查询科室名单
    query(page = 1) {
      const { domainDes, domainId } = this.searchForm || ''
      const data = {
        url: Config.queryUrl,
        payLoad: {
          'domainDes': domainDes,
          'domainId': domainId,
          'pageNumber': page,
          'pageSize': 10
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
                content: '添加成功！'
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
      const { domainId, domainDes, pk } = this.editInput
      let data = {}
      data.payLoad = { domainId, domainDes, pk }
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
    delItem() {
      let data = {}
      data.payLoad = this.deleteItem
      data.url = Config.deleteUrl
      hipMasterPost(data).then(res => {
        this.reset()
        this.$Modal.success({
          title: '成功',
          content: '删除成功！'
        })
      })
    },
    // 获取选择修改的项
    choice(selection, row) {
      this.deleteItem = selection.map((item) => {
        return item.pk
      })
      this.editInput = row
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
