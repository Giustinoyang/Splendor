<template>
  <div>
    <the-header></the-header>
    <div class="mainpart">
      <Nuxt />
    </div>
    <the-bottom></the-bottom>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheBottom from '~/components/TheBottom.vue'
export default {
  components: {
    TheHeader,
    TheBottom,
  },
}
</script>

<style>
html {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.mainpart {
  padding-top: 70px;
}
.container {
  padding: 10px;
  margin: 40px auto;
  max-width: 800px;
  text-align: center;
}
a {
  color: white;
}
img {
  width: 100%;
}
</style>