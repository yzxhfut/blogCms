<template>
  <q-page class="row" :style-fn="height">
    <div class="slide-width column bg-blue text-h6 text-grey-9">
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
    </div>
    <div style="width: 90%;">
      <router-view />
    </div>
  </q-page>
</template>

<style scoped>
  .title-padding{
    padding-top: 1rem;
  }
  .slide-width{
    width: 10%;
  }
</style>
<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      active: 0
    }
  },
  computed: {
    activeItem () {
      var temp = ['text-grey-9', 'text-grey-9', 'text-grey-9', 'text-grey-9']
      temp[this.active] = 'text-white'
      console.log(temp)
      return temp
    }
  },
  methods: {
    height (offset) {
      return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
    },
    article () {
      this.active = 0
      // this.$router.push('/login')
    },
    comment () {
      this.active = 1
    },
    about () {
      this.active = 2
    },
    link () {
      this.active = 3
    }
  }
}
</script>
