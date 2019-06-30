<template>
  <div class="column" style="padding: 0 2rem;height: 100%;">
    <div class="col-1 row items-center text-h5">
      <div style="padding-right: 2rem;">文章修改 / 我们今生有缘在路上</div>
    </div>
    <mavon-editor class="col-10" v-model="value" fontSize="1.1rem"/>
    <div class="col-1 row flex-center">
      <q-btn rounded class="col-2" color="primary" label="提交修改" style="height: 3rem;"></q-btn>
    </div>
  </div>
</template>

<style scoped>
  .editor{
    
  }
</style>
<style>
</style>

<script>
export default {
  name: 'Update',
  data () {
    return {
      value: null
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
