<template>
  <div class="column" style="padding: 0 2rem;height: 100%;">
    <div class="col-1 row items-center text-h5">
      <div style="padding-right: 2rem;">关于列表</div>
    </div>
    <div class="col-9 row">
      <div class="col-4 column" style="padding: 0 0.5rem;">
        <div class="col-1 text-center text-h6">关于我</div>
        <q-editor v-model="editor" min-height="5rem" :toolbar="toolbar" style="font-size: 1.5rem" class="col-11"/>
      </div>
      <div class="col-4 column">
        <div class="col-1 text-center text-h6">技术栈</div>
        <q-editor v-model="editor" min-height="5rem" :toolbar="toolbar" style="font-size: 1.5rem" class="col-11"/>
      </div>
      <div class="col-4 column" style="padding: 0 0.5rem;">
        <div class="col-1 text-center text-h6">联系我</div>
        <q-editor v-model="editor" min-height="5rem" :toolbar="toolbar" style="font-size: 1.5rem" class="col-11"/>
      </div>
    </div>
    <div class="col-2 row flex-center">
      <q-btn rounded class="col-3" color="primary" label="提交"></q-btn>
    </div>
  </div>
</template>

<style lang='stylus' scoped>
</style>
<style>
</style>

<script>
export default {
  name: 'About',
  data () {
    return {
      editor: '',
      toolbar: [['bold', 'italic', 'underline', 'unordered']]
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
