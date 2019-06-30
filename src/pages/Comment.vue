<template>
  <div class="column" style="padding: 0 2rem;height: 100%;">
    <div class="col-1 row items-center text-h5">
      <div style="padding-right: 2rem;">评论列表</div>
    </div>
    <div class="col-9 column" style="flex-wrap: nowrap;">
      <div v-for="(content, index) in currentContents" :key="index" class="row items-center item" style="padding: 1.5rem 0;">
        <div style="width: 5%;">{{index + 1}}</div>
        <div class="col-3">我们今生有缘在路上{{content}}</div>
        <div class="col-1" style="margin-right: 3rem;">2019-6-21</div>
        <div class="col-1 text-red">删除</div>
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

<style lang='stylus' scoped>
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
      contents: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      currentContents: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  computed: {
    type () {
      return this.$route.params.type || '文章'
    },
    maxPage () {
      return Math.ceil(this.contents.length / this.pageSize)
    }
  },
  methods: {
    pageChange (page) {
      this.currentContents = []
      for (let i = (this.currentPage - 1) * this.pageSize; i < this.currentPage * this.pageSize; i++) {
        if (i < this.contents.length) {
          this.currentContents.push(this.contents[i])
        }
      }
    }
  }
}
</script>
