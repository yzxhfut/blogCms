import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import active from './active'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // then we reference it
      active
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./active'], () => {
      const newShowcase = require('./active').default
      Store.hotUpdate({ modules: { active: newShowcase } })
    })
  }

  return Store
}
