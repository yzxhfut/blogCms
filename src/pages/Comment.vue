<template>
  <div class="column" style="padding: 0 2rem;height: 100%;">
    <div class="col-1 row items-center text-h5">
      <div style="padding-right: 2rem;">评论列表</div>
    </div>
    <div class="col-9 column">
      <q-scroll-area class="col-12 column">
        <div v-for="(content, index) in currentContents" :key="index" class="column" style="flex-wrap: nowrap;">
          <div class="row items-center item" style="padding: 0.5rem 0;">
            <div style="width: 5%;">{{index + 1}}</div>
            <div style="width: 10%;">{{content.name}}</div>
            <div class="col-4 row">
              <q-item class="col-12 row items-center justify-between">
                <div class="row">{{content.content}}</div>
                <div class="row">
                  <q-btn flat v-if="content.comment && content.comment.length!==0  && !content.replyTag" icon="keyboard_arrow_down" @click="content.replyTag=!content.replyTag"></q-btn>
                  <q-btn flat v-if="content.comment && content.replyTag" icon="keyboard_arrow_up" @click="content.replyTag=!content.replyTag"></q-btn>
                </div>
              </q-item>
            </div>
            <div class="col-1" style="margin-right: 3rem;">2019-6-21</div>
            <div class="col-1 text-red op" @click="deleteComment(content.objectId)">删除</div>
          </div>
          <div v-if="content.replyTag" style="font-size: 1.1rem;">
            <div class="row" v-for="(reply, index) in content.comment" :key="index">
              <div style="width: 5%;"></div>
              <div class="col-11 row items-center" style="border-top: 1px solid darkgrey;">
                <div class="text-center" style="width: 10%;">{{reply.name}}</div>
                <div class="col-5 row">
                  <q-item class="col-12 row items-center">
                    <div class="row">{{reply.content}}</div>
                  </q-item>
                </div>
                <div class="col-1" style="margin-right: 3rem;">2019-6-21</div>
                <div class="col-1 text-red op" @click="deleteFollowComment(content.objectId, index)">删除</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row">
          <q-separator style="background: darkgrey;"></q-separator>
        </div>
      </q-scroll-area>
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
  name: 'Comment',
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
    type () {
      return this.$route.params.type || '文章'
    },
    maxPage () {
      return Math.ceil(this.contents.length / this.pageSize)
    }
  },
  methods: {
    deleteComment (id) {
      this.$q.dialog({
        title: '提示',
        message: '确定删除当前评论？',
        ok: '确定',
        cancel: '取消'
      }).onOk(() => {
        deleteCommentById(this, id)
      })
    },
    deleteFollowComment (id, index) {
      this.$q.dialog({
        title: '提示',
        message: '确定删除当前评论？',
        ok: '确定',
        cancel: '取消'
      }).onOk(() => {
        deleteFollowCommentById(this, id, index)
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
    getComment(this).then(res => {
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
async function getComment (context) {
  context.$q.loading.show()
  const query = context.Bmob.Query('comment')
  query.order('-createdAt')
  var res = await query.find()
  return res
}
function deleteFollowCommentById (context, id, index) {
  context.$q.loading.show()
  const query = context.Bmob.Query('comment')
  query.get(id).then(res => {
    res.comment.splice(index, 1)
    query.set('id', id)
    query.set('comment', res.comment)
    query.save().then(res => {
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
        ok: '确定',
        cancel: false
      })
    })
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
function deleteCommentById (context, id) {
  context.$q.loading.show()
  const query = context.Bmob.Query('comment')
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
