<template>
  <div class="wrapper">
    <nuxt-static-render class="top">
      <div>{{ $staticData.foobar }}</div>
    </nuxt-static-render>
    <div class="bottom" @click="counter++">
      <div>
        <p>This component should remain operational.<p>
        <p>Here's a counter: {{ counter }}. Click to increment.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  serverData() {
    return {
      foobar: 'This should not be in __NUXT__'
    }
  },
  asyncData() {
    return {
      counter: 1
    }
  }
}
</script>

<style>
html, body, #__nuxt, #__layout {
  margin: 0px;
  padding: 0px;
}
.wrapper {
  position: fixed;
  border: 1px solid #000;
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  & > div {
    height: 50vh;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font: 2rem sans-serif;
  }
}
</style>
