<template>
  <q-page class="row" :style-fn="height">
    <q-list bordered class="col-2 rounded-borders" style="padding: 1rem 0;">
      <q-expansion-item group="somegroup" :content-inset-level="1" expand-separator style="font-size: 1.1rem;">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="mdi-book" color="primary"></q-icon>
          </q-item-section>
          <q-item-section>
            文章管理
          </q-item-section>
        </template>
        <q-item clickable v-ripple class="row items-center" :class="activeItem[0]" @click="article">文章列表</q-item>
        <q-item clickable v-ripple class="row items-center" :class="activeItem[1]" @click="updatearticle">新建文章</q-item>
      </q-expansion-item>
      
      <q-expansion-item group="somegroup" :content-inset-level="1" expand-separator expand-icon="6" style="font-size: 1.1rem;" :class="activeItem[2]" @click="tag">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="bookmarks" color="primary"></q-icon>
          </q-item-section>
          <q-item-section>
            标签管理
          </q-item-section>
        </template>
      </q-expansion-item>
      
      <q-expansion-item group="somegroup" :content-inset-level="1" expand-separator expand-icon="6" style="font-size: 1.1rem;" :class="activeItem[3]" @click="comment">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="mdi-chat-processing" color="primary"></q-icon>
          </q-item-section>
          <q-item-section>
            评论管理
          </q-item-section>
        </template>
      </q-expansion-item>
      
      <q-expansion-item group="somegroup" :content-inset-level="1" expand-separator expand-icon="6" style="font-size: 1.1rem;" :class="activeItem[4]" @click="about">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="mdi-fire" color="primary"></q-icon>
          </q-item-section>
          <q-item-section>
            关于管理
          </q-item-section>
        </template>
      </q-expansion-item>
      <q-expansion-item group="somegroup" :content-inset-level="1" expand-separator style="font-size: 1.1rem;">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="mdi-near-me" color="primary"></q-icon>
          </q-item-section>
        
          <q-item-section>
            友链管理
          </q-item-section>
        </template>
        <q-item clickable v-ripple class="row items-center" :class="activeItem[5]" @click="link">友链列表</q-item>
        <q-item clickable v-ripple class="row items-center" :class="activeItem[6]" @click="updatelink">新建友链</q-item>
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
      var temp = ['text-black', 'text-black', 'text-black', 'text-black', 'text-black', 'text-black', 'text-black']
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
    updatearticle () {
      this.$store.commit('active/updateActive', 1)
      this.$router.replace('/updatearticle/new')
    },
    tag () {
      this.$store.commit('active/updateActive', 2)
      this.$router.replace('/tag')
    },
    comment () {
      this.$store.commit('active/updateActive', 3)
      this.$router.replace('/comment')
    },
    about () {
      this.$store.commit('active/updateActive', 4)
      this.$router.replace('/about')
    },
    link () {
      this.$store.commit('active/updateActive', 5)
      this.$router.replace('/link')
    },
    updatelink () {
      this.$store.commit('active/updateActive', 6)
      this.$router.replace('/updatelink/new')
    }
  },
  created () {
    if (!this.Bmob.User.current()) {
      this.$router.replace('/login')
    }
  }
}
</script>
