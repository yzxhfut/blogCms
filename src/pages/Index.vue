<template>
  <q-page class="row" :style-fn="height">
<!--    <div class="slide-width column text-h6 text-grey-6" style="background: #E8E8E8;">
      <q-item clickable v-ripple class="row flex-center title-padding" @click="article" :class="activeItem[0]">
        文章管理
      </q-item>
      <q-item clickable v-ripple class="row flex-center title-padding" @click="comment" :class="activeItem[1]">
        评论管理
      </q-item>
      <q-item clickable v-ripple class="row flex-center title-padding" @click="about" :class="activeItem[2]">
        关于管理
      </q-item>
      <q-item clickable v-ripple class="row flex-center title-padding" @click="link" :class="activeItem[3]">
        友链管理
      </q-item>
    </div> -->
    <q-list bordered class="col-2 rounded-borders">
      <q-expansion-item group="somegroup" :content-inset-level="1" expand-separator icon="mdi-book" label="文章管理" style="font-size: 1.1rem;">
          <q-item clickable v-ripple class="row items-center">文章列表</q-item>
          <q-item clickable v-ripple class="row items-center">新建文章</q-item>
      </q-expansion-item>
      <q-expansion-item group="somegroup" :content-inset-level="1" expand-separator icon="mdi-chat-processing" label="评论管理" style="font-size: 1.1rem;">
          <q-item clickable v-ripple class="row items-center">评论列表</q-item>
          <q-item clickable v-ripple class="row items-center">新建评论</q-item>
      </q-expansion-item>
      <q-expansion-item group="somegroup" :content-inset-level="1" expand-separator icon="mdi-fire" label="关于管理" style="font-size: 1.1rem;">
          <q-item clickable v-ripple class="row items-center">文章列表</q-item>
          <q-item clickable v-ripple class="row items-center">新建文章</q-item>
      </q-expansion-item>
      <q-expansion-item group="somegroup" :content-inset-level="1" expand-separator icon="mdi-near-me" label="友链管理" style="font-size: 1.1rem;">
          <q-item clickable v-ripple class="row items-center">友链列表</q-item>
          <q-item clickable v-ripple class="row items-center">新建友链</q-item>
      </q-expansion-item>
    </q-list>
    <div class="col-10">
      <router-view />
    </div>
  </q-page>
</template>

<style scoped>
  .title-padding{
    padding-top: 1rem;
  }
  .slide-width{
    width: 15%;
  }
</style>
<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {

    }
  },
  computed: {
    activeItem () {
      var temp = ['text-grey-9', 'text-grey-9', 'text-grey-9', 'text-grey-9']
      temp[this.$store.state.active.active] = 'text-blue'
      return temp
    }
  },
  methods: {
    height (offset) {
      return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
    },
    article () {
      this.$store.commit('active/updateActive', 0)
      this.$router.replace('/')
    },
    comment () {
      this.$store.commit('active/updateActive', 1)
      this.$router.replace('/comment')
    },
    about () {
      this.$store.commit('active/updateActive', 2)
      this.$router.replace('/about')
    },
    link () {
      this.$store.commit('active/updateActive', 3)
      this.$router.replace('/link')
    }
  }
}
</script>
