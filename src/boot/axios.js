import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Bmob from 'hydrogen-js-sdk'

Bmob.initialize('b42456a6a9f93f1de1c1639a51496d21', 'bc3230dd9cd4181c689c827e1138ba80')

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
  Vue.prototype.Bmob = Bmob
  Vue.use(mavonEditor)
}
