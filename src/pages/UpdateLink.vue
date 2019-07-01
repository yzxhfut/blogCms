<template>
  <div class="column" style="padding: 0 2rem;height: 100%;">
    <div class="col-1 row items-center text-h5">
      <div style="padding-right: 2rem;">新增友链</div>
    </div>
    
    <div class="col-11 row">
      <div class="col-5 column" style="flex-wrap: nowrap;">
        <div class="row items-center" style="padding-bottom: 1rem;">
          <div class="col-3" style="font-size: 1.25rem;">链接类型 : </div>
          <div>
            <q-radio v-model="linkType" val="blog" label="博客"/>
            <q-radio v-model="linkType" val="web" label="网站"/>
          </div>
        </div>
        
        <div class="row items-center" style="padding-bottom: 1rem;">
          <div class="col-3" style="font-size: 1.25rem;">网站名称 : </div>
          <div class="col-9">
            <q-input outlined dense color="primary" placeholder="网站名称"></q-input>
          </div>
        </div>
        
        <div class="row items-center" style="padding-bottom: 1rem;">
          <div class="col-3" style="font-size: 1.25rem;">网站域名 : </div>
          <div class="col-9">
            <q-input outlined dense color="primary" placeholder="网站域名"></q-input>
          </div>
        </div>
        
        <div class="row items-center" style="padding-bottom: 1rem;">
          <div class="col-3" style="font-size: 1.25rem;">图标地址 : </div>
          <div class="col-9">
            <q-input outlined dense color="primary" placeholder="图标地址"></q-input>
          </div>
        </div>
        
        <div class="row">
          <div class="col-3"></div>
          <q-btn rounded class="col-3" color="primary" label="提交" style="height: 2rem;"></q-btn>
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
      linkType: 'blog'
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
