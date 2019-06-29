<template>
  <div class="column" style="padding: 0 1rem;">
    <div class="col-1 text-h5" style="padding: 1rem;">文章列表</div>
    <div class="col-9 column">
      <q-item v-for="(article, index) in currentArticles" :key="index" class="row items-center  font-size" style="min-height: 0;height: 10% !important;">
        <div class="col-1 padding-left">{{index + 1}}</div>
        <div class="col-4 title">我们今生{{article}}</div>
        <div class="col-1" style="margin-right: 3rem;">2019-6-21</div>
        <div class="col-1 text-blue">修改</div>
        <div class="col-1 text-red">删除</div>
      </q-item>
    </div>
    
    <!-- <q-separator style="height: 1px;background: darkgray;"></q-separator> -->
    
    <div class="col-2 row">
      <q-pagination
        v-if='articles.length > pageSize'
        class='flex-center col-6'
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
  .title:hover
    text-decoration underline
    color #027BE3
    cursor pointer
</style>
<style>
</style>

<script>
export default {
  name: 'Article',
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      articles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      currentArticles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  computed: {
    maxPage () {
      return Math.ceil(this.articles.length / this.pageSize)
    }
  },
  methods: {
    pageChange (page) {
      this.currentArticles = []
      for (let i = (this.currentPage - 1) * this.pageSize; i < this.currentPage * this.pageSize; i++) {
        if (i < this.articles.length) {
          this.currentArticles.push(this.articles[i])
        }
      }
      document.documentElement.scrollTop = 0
    }
  }
}
</script>
