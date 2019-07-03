<template>
  <div class="column" style="padding: 0 2rem;height: 100%;">
    <div class="col-1 row items-center text-h5">
      <div style="padding-right: 2rem;">{{title}}</div>
    </div>
    
    <div class="col-11 row">
      <div class="col-5 column" style="flex-wrap: nowrap;">
        <div class="row items-center" style="padding-bottom: 1.5rem;">
          <div class="col-2" style="font-size: 1.25rem;">链接类型 : </div>
          <div>
            <q-radio v-model="linkType" val="blog" label="博客"/>
            <q-radio v-model="linkType" val="web" label="社区"/>
          </div>
        </div>
        
        <div class="row items-center" style="padding-bottom: 1.5rem;">
          <div class="col-2" style="font-size: 1.25rem;">网站名称 : </div>
          <div class="col-8" style="padding-left: 0.5rem;">
            <q-input outlined dense v-model="name" color="primary" placeholder="网站名称"></q-input>
          </div>
        </div>
        
        <div class="row items-center" style="padding-bottom: 1.5rem;">
          <div class="col-2" style="font-size: 1.25rem;">网站域名 : </div>
          <div class="col-8" style="padding-left: 0.5rem;">
            <q-input outlined dense v-model="domain" color="primary" placeholder="网站域名"></q-input>
          </div>
        </div>
        
        <div class="row items-center" style="padding-bottom: 1.5rem;">
          <div class="col-2 row items-center" style="font-size: 1.25rem;">图标地址 : </div>
          <div class="col-8 " style="padding-left: 0.5rem;">
            <q-input outlined dense v-model="imgUrl" color="primary" placeholder="图标地址"></q-input>
          </div>
        </div>
        
        <div class="row">
          <div class="col-5">
            <img style="height: 5rem;width: 5rem;" :src="imgUrl" />
          </div>
          <q-btn rounded class="col-3" color="primary" label="提交" style="height: 2.5rem;" @click="submit"></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
<style>
  .q-radio__label{
    font-size: 1.25rem;
  }
</style>

<script>
export default {
  name: 'UpdateLink',
  data () {
    return {
      linkType: 'blog',
      website: {},
      name: '',
      domain: '',
      imgUrl: ''
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/updatelink/new') {
        this.linkType = 'blog'
        this.website = {}
        this.name = ''
        this.domain = ''
        this.imgUrl = ''
      }
    }
  },
  computed: {
    title () {
      if (this.$route.params.id === 'new') {
        return '新建友链'
      } else {
        return '修改友链'
      }
    }
  },
  methods: {
    submit () {
      if (this.$route.params.id === 'new') {
        addLink(this)
      } else {
        updateLink(this)
      }
    }
  },
  created () {
    var that = this
    that.$q.loading.show()
    if (this.$route.params.id !== 'new') {
      getLinkById(this).then(res => {
        that.website = res
        that.name = res.name
        that.domain = res.domain
        that.imgUrl = res.img
        that.linkType = res.type
        that.$q.loading.hide()
      })
    } else {
      that.$q.loading.hide()
    }
  }
}
async function getLinkById (context) {
  context.$q.loading.show()
  const query = context.Bmob.Query('link')
  var res = await query.get(context.$route.params.id)
  return res
}
function addLink (context) {
  context.$q.loading.show()
  const query = context.Bmob.Query('link')
  query.set('type', context.linkType)
  query.set('name', context.name)
  query.set('domain', context.domain)
  query.set('img', context.imgUrl)
  query.save().then(res => {
    context.$q.loading.hide()
    context.$q.notify({
      message: '添加成功',
      color: 'primary',
      timeout: 1000
    })
    context.$router.replace('/link')
    context.$store.commit('active/updateActive', 5)
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
function updateLink (context) {
  context.$q.loading.show()
  const query = context.Bmob.Query('link')
  query.set('id', context.website.objectId)
  query.set('type', context.linkType)
  query.set('name', context.name)
  query.set('domain', context.domain)
  query.set('img', context.imgUrl)
  query.save().then(res => {
    context.$q.loading.hide()
    context.$q.notify({
      message: '修改成功',
      color: 'primary',
      timeout: 3000
    })
    context.$router.replace('/link')
    context.$store.commit('active/updateActive', 5)
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
