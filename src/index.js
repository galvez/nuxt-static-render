import { resolve } from 'path'

export default function () {
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-static-render/plugin.js'
  })
  this.addTemplate({
    src: resolve(__dirname, 'component.js'),
    fileName: 'nuxt-static-render/component.js'
  })
  this.addTemplate({
    src: resolve(__dirname, 'middleware.js'),
    fileName: 'nuxt-static-render/middleware.js'
  })
  if (!Array.isArray(this.options.router.middleware)) {
    if (typeof this.options.router.middleware === 'string') {
      this.options.router.middleware = [this.options.router.middleware]
    } else {
      this.options.router.middleware = []
    }
  }
  this.options.router.middleware.unshift('nuxt-static-render')
}
