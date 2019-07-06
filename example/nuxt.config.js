import NuxtStaticRender from '../src'

export default {
  modules: [NuxtStaticRender],
  build: {
    postcss: {
      preset: {
        stage: 0
      }
    }
  }
}
