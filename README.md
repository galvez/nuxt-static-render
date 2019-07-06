# nuxt-static-render

Nuxt's [asyncData][api] comes at a cost: the embedded `__NUXT__` payload. 

What if you could render some markup on the server and not hydrate it on the
client? You'd get a **dead component**: unable to properly update (re-render)
on the client-side following data updates. Even worse: you'd get a **node 
mismatch error**, since the client wouldn't have the actual data to rerender it.

Sometimes though, a _dead component_ is exactly what you need: say you're just
fetching data on the server to render some content, but **won't ever update
this fragment on the client-side**. Surely there's a way, right?

With `<nuxt-static-render>`, now there is. [And don't call me Shirley!][shirley]

[api]: https://nuxtjs.org/api/
[shirley]: https://www.youtube.com/watch?v=ixljWVyPby0

Setup with:

```sh
yarn install nuxt-static-render
```

Add to your Nuxt project via [`modules`][modules]:

[modules]: https://nuxtjs.org/guide/modules/

```js
export default {
  modules: [`nuxt-static-render`]
}
```

## Usage

Simply wrap your _dead markup fragments_ in `<nuxt-static-render>` anywhere
on the page, as many times as needed.

Use `$staticData` to access the static rendering data. It is automatically
populated on the server by the `serverData()` handler, which you can add to 
any Nuxt page. From the [included example][example]:

[example]: https://github.com/galvez/nuxt-static-render/blob/master/example/pages/index.vue

```html
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
```

The `top` div, rendered with `<nuxt-static-render>` should have markup based
on `$staticData.foobar`, which is **only populated on the server** and **is not 
added to the `__NUXT__`** payload. That means this data will only be used on the 
server to render markup and immediately discarded.

## Advanced

Say you have a huge chunk of markup that needs to be server-rendered for SEO,
but you don't want a massive `__NUXT__` payload to go with it. Still, once that
markup is rendered on the client, you have bits of it that **need hydration** 
so they can continue to be updated on the client. For this specific case, you 
can provide `clientData()`:

```js
export default {
  serverData() {
    // This is used to instantly render the fragments
    // on the server and deliver ready-for-display markup
    return {
      foobar: 'This should not be in __NUXT__'
    }
  },
  clientData() {
    // This is loaded asynchronously post-mount, i.e.,
    // server-side content is immediately displayed while
    // the page silently hydrates and gets ready for 
    // further dynamic updates on the client
    return {
      foobar: 'This should not be in __NUXT__'
    }
  }
}
```

In this usage, you can also define:

```js
export default {
  clientDataLoaded(data) {
  }
}
```

As a way of knowing when the data has been fully hydrated on the client.

> Use this feature only if you absolutely must avoid `__NUXT__`-based hydration 
> due to exceptionally large content.

# Kudos

To [Markus Oberlehner][markus] for [vue-lazy-hydration][vlh], which served
as inspiration for this module. The `asyncFactory` `render()` hack is mainly
what makes this possible at all.

[markus]: https://github.com/maoberlehner
[vlh]: https://github.com/maoberlehner/vue-lazy-hydration/
