
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        children: [
          { path: '', component: () => import('pages/Article.vue') },
          { path: 'comment', component: () => import('pages/Comment.vue') },
          { path: 'about', component: () => import('pages/About.vue') },
          { path: 'link', component: () => import('pages/Link.vue') },
          { path: 'updatearticle', component: () => import('pages/UpdateArticle.vue') }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
