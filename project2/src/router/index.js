import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/',component:Index},
  {path:'/admin',component: () => import('../views/Admin')},
  {path:'/adminabout',component: () => import('../views/Adminabout')},
  {path:'/adminmsg',component: () => import('../views/Adminmsg')},
  {path: '/home',component: () => import('../views/Home')},
  {
    path: '/about',component: () => import( '../views/About.vue'),
    children:[
      {path:'income' ,component: () => import('../views/Income')},
      {path:'expend' ,component: () => import('../views/Expend')},
      {path:'investment' ,component: () => import('../views/Investment')},
      {path:'recommend' ,component: () => import('../views/Recommend')},
      {path:'/',redirect:'income'}
    ]
  },
  {
    path: '/msg',component: () => import( '../views/Message'),
    children:[
      {path:'self' ,component: () => import('../views/Self')},
      {path:'mother' ,component: () => import('../views/Mother')},
      {path:'father' ,component: () => import('../views/Father')},
      {path:'/',redirect:'self'}
    ]
  },
  {
    path: '/statis',component: () => import( '../views/Statistical'),
    children:[
      {path:'sincome' ,component: () => import('../views/Sincome')},
      {path:'sexpend' ,component: () => import('../views/Sexpend')},
      {path:'sliab' ,component: () => import('../views/Sliabilities')},
      {path:'/',redirect:'sincome'}
    ]
  },
  {
    path: '/jmarket',component: () => import( '../views/Jmarket'),
    children:[
      {path:'jmovement' ,component: () => import('../views/Jmovements')},
      {path:'jrecommend' ,component: () => import('../views/Jrecommend')},
      {path:'/',redirect:'jmovement'}
    ]
  },
  {path:'/concept' ,component: () => import('../views/Concept')},
  {path:'/register' ,component: () => import('../views/Register')},
  {path:'/change' ,component: () => import('../views/Change')},
  {path:'/*',redirect:'/'}
]

const router = new VueRouter({
  routes
})

export default router
