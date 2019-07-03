<template>
  <div class="column" style="padding: 0 2rem;height: 100%;">
    <div class="col-1 row items-center text-h5">
      <div style="padding-right: 2rem;">关于列表</div>
    </div>
    <div class="col-9 row">
      <div class="col-4 column" style="padding: 0 0.5rem;">
        <div class="col-1 text-center text-h6">关于我</div>
        <q-editor v-model="aboutMe" min-height="5rem" :toolbar="toolbar" class="col-11"/>
      </div>
      <div class="col-4 column">
        <div class="col-1 text-center text-h6">技术栈</div>
        <q-editor v-model="techStack" min-height="5rem" :toolbar="toolbar" class="col-11"/>
      </div>
      <div class="col-4 column" style="padding: 0 0.5rem;">
        <div class="col-1 text-center text-h6">联系我</div>
        <q-editor v-model="contact" min-height="5rem" :toolbar="toolbar" class="col-11"/>
      </div>
    </div>
    <div class="col-1 row flex-center">
      <q-btn rounded class="col-3" color="primary" label="提交" @click="submit"></q-btn>
    </div>
  </div>
</template>

<style scoped>
</style>
<style>
</style>

<script>
export default {
  name: 'About',
  data () {
    return {
      aboutMe: '',
      techStack: '',
      contact: '',
      toolbar: [['bold', 'italic', 'underline', 'unordered']]
    }
  },
  inject: ['reload'],
  methods: {
    submit () {
      updateAbout(this)
    }
  },
  created () {
    var that = this
    getAbout(this).then(res => {
      that.aboutMe = res[0].aboutMe
      that.techStack = res[0].techStack
      that.contact = res[0].contact
      that.$q.loading.hide()
    }).catch(err => {
      that.$q.loading.hide()
      that.$q.dialog({
        title: '提示',
        message: err.toString(),
        ok: '确定'
      })
    })
  }
}
async function getAbout (context) {
  context.$q.loading.show()
  const query = context.Bmob.Query('about')
  var res = await query.find()
  return res
}
function updateAbout (context) {
  context.$q.loading.show()
  const query = context.Bmob.Query('about')
  query.find().then(res => {
    query.set('id', res[0].objectId)
    query.set('aboutMe', context.aboutMe)
    query.set('techStack', context.techStack)
    query.set('contact', context.contact)
    query.save().then(result => {
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
