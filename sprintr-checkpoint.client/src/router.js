import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: loadPage('ProjectPage'),
    // beforeEnter: authGuard,
    children: [
      {
        path: 'backlog',
        name: 'Project.Backlog',
        component: loadPage('BacklogPage')
      },
      {
        path: 'sprints',
        name: 'Project.Sprints',
        component: loadPage('SprintsPage')
      }
    ]
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
