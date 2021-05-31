<template>
  <section class="container">
    <header>
      <h1>{{ product.title }}</h1>
      <h4>{{ product.overview }}</h4>
      <img :src="product.image" :alt="product.overview" />
    </header>
    <article>
      <p>
        {{ product.details }}
      </p>
    </article>
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, route }) {
    const { id } = route.params
    console.log('this url', process.env.BASE_URL)
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/product/${id}`
    )
    const product = data
    return {
      product,
    }
  },
}
</script>

<style scoped>
h4 {
  margin: 30px 0;
}
.comments {
  margin-top: 60px;
  text-align: left;
}
.comment {
  padding: 20px;
  background: #f7f7f7;
  border: 1px solid darkgray;
  margin: 10px;
}
.comment .date {
  color: darkgray;
  font-size: 14px;
}
img {
  max-width: 600px;
}
p {
  text-align: left;
  margin-top: 40px;
}
</style>
