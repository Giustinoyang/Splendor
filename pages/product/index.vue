<template>
  <main class="container">
    <header>
      <h1>PRODUCT</h1>
      <h4>And it's made with Nuxt</h4>
    </header>
    <section class="product-grid">
      <div
        v-for="(product, productid) of products"
        :key="'art-' + productid"
        class="product"
        @click="goToProduct(`/product/${product.id}`)"
      >
        <normal-card
          :title="product.title"
          :summary="product.overview"
          :image="product.image"
        ></normal-card>
      </div>
    </section>
  </main>
</template>

<script>
import NormalCard from '~/components/listCard/normalCard.vue'
export default {
  components: {
    NormalCard,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/products`)
    const products = data
    return {
      products,
    }
  },
  data() {
    return {
      adUrl: '',
    }
  },
  methods: {
    goToProduct(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 50px;
  font-weight: bolder;
  font-family: "Lucida Handwriting", "Lucida Console","Courier New", monospace;
}
h2 {
  margin-bottom: 30px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(1, calc(100% / 1));
  grid-gap: 10px;
  margin-top: 40px;
}
.product {
  cursor: pointer;
  text-align: middle;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
