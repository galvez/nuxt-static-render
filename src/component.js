
function getDataFunc(component) {
  let parent = component.$parent
  while (parent) {
    if (parent.$options.staticData) {
      return parent.$options.staticData.bind(parent)
    }
    parent = parent.$parent
  }
}

const isServer = process.server

export default {
  name: 'NuxtStaticRender',
  data: () => ({
    hydrated: false
  }),
  async created() {
    if (!isServer) {
      const clientDataFunc = getDataFunc(this, 'clientData')
      if (typeof clientDataFunc !== 'function') {
        return
      }
      const result = await clientDataFunc({})
      if (!result) {
        return
      }
      Object.assign(this.$staticData, result)
      this.hydrated = true
      this.$parent.$forceUpdate()

      const clientDataLoadedFunc = getDataFunc(this, 'clientDataLoaded')
      if (typeof clientDataLoadedFunc === 'function') {
        clientDataLoadedFunc(this.$staticData)
      }
    }
  },
  render(h) {
    if (!isServer) {
      if (this.hydrated) {
        return h('div', this.$slots.default)
      }
      const vnode = h('div', [])
      vnode.asyncFactory = {}
      vnode.isComment = true
      return vnode
    } else {
      return h('div', this.$slots.default)
    }
  }
}
