<template>
  <div class="column" style="padding: 0 2rem;height: 100%;">
    <div class="col-1 row items-center text-h5">
      <div style="padding-right: 1rem;">标签列表</div>
      <q-btn flat icon="add_circle" color="primary" style="font-size: 1.25rem;" @click="addTag"></q-btn>
    </div>
    <div class="col-9 column" style="flex-wrap: nowrap;">
      <div v-for="(content, index) in currentContents" :key="index" class="row items-center item" style="padding: 1.5rem 0;">
        <div style="width: 5%;">{{index + 1}}</div>
        <div class="col-2">{{content.tagName}}</div>
        <div class="col-1" style="margin-right: 3rem;">{{content.createdAt.split(' ')[0]}}</div>
        <div class="col-1 text-blue op" @click="updateTag(content.objectId)">修改</div>
        <div class="col-1 text-red op" @click="deleteTag(content.objectId)">删除</div>
      </div>
      <div class="row">
        <q-separator style="background: darkgrey;"></q-separator>
      </div>
    </div>
    <div class="col-1 row">
      <q-pagination
        v-if='contents.length > pageSize'
        class='col-2 justify-center'
        size='1rem'
        v-model='currentPage'
        :max='maxPage'
        :max-pages='pageSize'
        @input='pageChange'
        >
      </q-pagination>
    </div>
  </div>
</template>

<style scoped>
  .op:hover{
    cursor: pointer;
    text-decoration: underline;
  }
</style>
<style>
</style>

<script>
export default {
  name: 'Tag',
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      contents: [],
      currentContents: []
    }
  },
  inject: ['reload'],
  computed: {
    maxPage () {
      return Math.ceil(this.contents.length / this.pageSize)
    }
  },
  methods: {
    addTag () {
      this.$q.dialog({
        title: '添加标签',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        ok: '确定',
        cancel: '取消'
      }).onOk(data => {
        addTag(this, data)
      })
    },
    updateTag (id) {
      this.$q.dialog({
        title: '修改标签',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        ok: '确定',
        cancel: '取消'
      }).onOk(data => {
        updateTagById(this, id, data)
      })
    },
    deleteTag (id) {
      this.$q.dialog({
        title: '提示',
        message: '确定删除当前标签？',
        ok: '确定',
        cancel: '取消'
      }).onOk(() => {
        deleteTagById(this, id)
      })
    },
    pageChange (page) {
      this.currentContents = []
      for (let i = (this.currentPage - 1) * this.pageSize; i < this.currentPage * this.pageSize; i++) {
        if (i < this.contents.length) {
          this.currentContents.push(this.contents[i])
        }
      }
    }
  },
  created () {
    var that = this
    getTag(this).then(function (res) {
      that.contents = res
      for (let i = (that.currentPage - 1) * that.pageSize; i < that.currentPage * that.pageSize; i++) {
        if (i < that.contents.length) {
          that.currentContents.push(that.contents[i])
        }
      }
      that.$q.loading.hide()
    })
  }
}
async function getTag (context) {
  context.$q.loading.show()
  const query = context.Bmob.Query('tag')
  query.order('-createdAt')
  var res = await query.find()
  return res
}
function addTag (context, name) {
  context.$q.loading.show()
  const query = context.Bmob.Query('tag')
  query.set('tagName', name)
  query.save().then(res => {
    context.$q.loading.hide()
    context.$q.notify({
      message: '添加成功',
      color: 'primary',
      timeout: 1000
    })
    context.reload()
  }).catch(err => {
    context.$q.loading.hide()
    context.$q.dialog({
      title: '提示',
      message: err.toString(),
      ok: '确定',
      cancel: false
    })
  })
}
function updateTagById (context, id, name) {
  context.$q.loading.show()
  const query = context.Bmob.Query('tag')
  query.set('id', id)
  query.set('tagName', name)
  query.save().then(res => {
    context.$q.loading.hide()
    context.$q.notify({
      message: '修改成功',
      color: 'primary',
      timeout: 1000
    })
    context.reload()
  }).catch(err => {
    context.$q.loading.hide()
    context.$q.dialog({
      title: '提示',
      message: err.toString(),
      ok: '确定'
    })
  })
}
function deleteTagById (context, id) {
  context.$q.loading.show()
  const query = context.Bmob.Query('tag')
  query.destroy(id).then(res => {
    context.$q.loading.hide()
    context.$q.notify({
      message: '删除成功',
      color: 'primary',
      timeout: 1000
    })
    context.reload()
  }).catch(err => {
    context.$q.loading.hide()
    context.$q.dialog({
      title: '提示',
      message: err.toString(),
      ok: '确定'
    })
  })
}
</script>
