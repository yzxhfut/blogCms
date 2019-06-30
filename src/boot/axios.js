import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
  Vue.use(mavonEditor)
}
