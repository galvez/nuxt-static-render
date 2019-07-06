import Vue from 'vue'
import nuxtMiddleware from '../middleware'
import NuxtStaticRender from './component'
import staticRenderMiddleware from './middleware'

// Make <nuxt-static-render /> available globally
Vue.component('nuxt-static-render', NuxtStaticRender)

nuxtMiddleware['nuxt-static-render'] = staticRenderMiddleware

export default async (ctx, inject) => {
  ctx.$staticData = {}
  await staticRenderMiddleware(ctx, true)
  inject('staticData', ctx.$staticData)
}
