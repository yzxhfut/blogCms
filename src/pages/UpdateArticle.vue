<template>
  <div class="column" style="padding: 0 2rem;height: 100%;">
    <div class="col-1 row items-center text-h5">
      <q-icon name="mdi-chevron-left" color="primary" style="font-size: 2rem;padding-right: 1rem;" @click="$router.back(-1)"></q-icon>
      <div style="padding-right: 2rem;">{{title}}</div>
    </div>
    <div class="row items-center" style="font-size: 1.25rem;padding-bottom: 1rem;">
      <div>标题 : </div>
      <div class="col-4" style="padding: 0.5rem;">
       <q-input outlined dense color="primary" input-style="font-size: 1.2rem;" v-model="input" placeholder="文章标题"></q-input>
      </div>
    </div>
    <div class="row items-center" style="font-size: 1.25rem;padding-bottom: 1.5rem;">
      <div>分类 : </div>
      <div>
       <q-checkbox v-for="(tag, index) in tags" :key="index" v-model="currentTag" :label="tag" :val="tag"/>
      </div>
    </div>
    <mavon-editor class="col-8" v-model="value" @change="getHtml" fontSize="1.1rem"/>
    <div class="row flex-center" style="padding-top: 1.5rem;">
      <q-btn rounded class="col-2" color="primary" label="提 交" @click="submit" style="height: 3rem;"></q-btn>
    </div>
  </div>
</template>

<style scoped>
</style>
<style>
  .q-checkbox__label{
    font-size: 1.2rem;
  }
</style>

<script>
export default {
  name: 'Update',
  data () {
    return {
      id: '',
      value: '',
      content: '',
      input: '',
      article: [],
      currentTag: [],
      tags: []
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/updatearticle/new') {
        this.value = ''
        this.input = ''
        this.currentTag = []
      }
    }
  },
  computed: {
    title () {
      if (this.$route.params.id === 'new') {
        return '新建文章'
      } else {
        return '修改文章 / ' + this.article.title
      }
    }
  }, 
  methods: {
    getHtml (value, render) {
      this.content = render
      this.value = value
    },
    submit () {
      if (this.$route.params.id === 'new') {
        addArticle(this)
      } else {
        updateArticle(this)
      }
    }
  },
  created () {
    var that = this
    that.$q.loading.show()
    getTag(this).then(res => {
      for (var i = 0; i < res.length; i++) {
        that.tags.push(res[i].tagName)
      }
    })
    if (this.$route.params.id !== 'new') {
      getArticleById(this, this.$route.params.id).then(res => {
        that.article = res[0]
        that.id = res[0].objectId
        that.input = res[0].title
        that.value = res[0].value
        that.currentTag = res[0].tag
        that.$q.loading.hide()
      })
    } else {
      that.$q.loading.hide()
    }
  }
}
async function getTag (context) {
  const query = context.Bmob.Query('tag')
  query.order('tagName')
  var res = await query.find()
  return res
}
async function getArticleById (context, id) {
  const query = context.Bmob.Query('article')
  query.equalTo('objectId', '==', id)
  var res = await query.find()
  return res
}
function addArticle (context) {
  context.$q.loading.show()
  const query = context.Bmob.Query('article')
  query.set('tag', context.currentTag)
  query.set('title', context.input)
  query.set('content', context.content)
  query.set('value', context.value)
  query.save().then(res => {
    context.$q.loading.hide()
    context.$q.notify({
      message: '提交成功',
      color: 'primary',
      timeout: 1000
    })
    context.$router.replace('/')
    context.$store.commit('active/updateActive', 0)
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
function updateArticle (context) {
  context.$q.loading.show()
  const query = context.Bmob.Query('article')
  query.set('id', context.id)
  query.set('tag', context.currentTag)
  query.set('title', context.input)
  query.set('value', context.value)
  query.set('content', context.content)
  query.save().then(res => {
    context.$q.loading.hide()
    context.$q.notify({
      message: '提交成功',
      color: 'primary',
      timeout: 3000
    })
    context.$router.replace('/')
    context.$store.commit('active/updateActive', 0)
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
</script>
