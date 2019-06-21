<template>
  <q-layout view="lHh lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn flat size="lg" round dense icon="img:statics/icons/favicon-96x96.png" />

        <q-toolbar-title>
          yzxBlog 内容管理系统
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MyLayout',
  data () {
    return {

    }
  }
}
</script>

<style>
</style>
