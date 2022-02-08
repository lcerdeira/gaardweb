
const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', component: () => import('pages/Home.vue') },
      // { path: 'about', component: () => import('src/pages/Home.vue') },
      { path: 'projects', component: () => import('pages/Projects.vue') },
      { path: 'publications', component: () => import('pages/Publications.vue') },
      { path: 'team', component: () => import('pages/Team.vue') },
      // { path: 'partners', component: () => import('pages/Partners.vue') },
      // { path: 'tools', component: () => import('pages/Tools.vue') },
      { path: 'login', component: () => import('pages/Login.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
