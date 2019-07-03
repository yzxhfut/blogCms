<template>
  <q-layout view="lHh lpr lFf">
    <q-page-container>
      <q-page class="row flex-center text-white" style="background: url('statics/img/loginbg.jpg');">
        <div class="col-4"></div>
        <div class="col-4 column">
          <div class="row text-h4 flex-center" style="padding-bottom: 1rem;">博客内容管理系统</div>
          <div class="row flex-center" style="padding-top: 1rem;">
            <q-input dark rounded outlined v-model="name" placeholder="用户名" class="col-10" input-class="text-white" style="border: white">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <div class="row flex-center" style="padding-top: 1rem;">
            <q-input dark rounded outlined v-model="pwd" type="password" placeholder="密码" class="col-10" input-class="text-white" style="border: white">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
          </div>
          <div class="row flex-center" style="padding-top: 1rem;">
            <q-btn rounded outline color="white" label="登 录" class="col-10" style="height: 3rem;font-size: 1rem;" @click="login"></q-btn>
          </div>
        </div>
        <div class="col-4"></div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>

</style>
<style>
</style>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name: null,
      pwd: null
    }
  },
  methods: {
    login () {
      this.Bmob.User.login(this.name, this.pwd).then(res => {
        this.$router.replace('/')
      }).catch(err => {
        console.log(err)
        this.$q.notify({
          message: '用户名或密码错误',
          color: 'primary',
          timeout: 1000
        })
      })
    }
  }
}
</script>
