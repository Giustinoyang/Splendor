<template>
  <section class="container">
    <header>
       <div class='topbox'>
       <a class='top' @click="goToProduct(`/product`)">Product</a>
       <a class='topbox'>-&gt; </a>
       <a class='top' @click="goToProduct(`/product/${product.id}`)">{{product.title}}</a>
      </div>
      <h1>{{ product.title }}</h1>
      <h3>{{ product.overview }}</h3>
      <product>
      <p class='productMain'>
        {{ product.details }}
      </p>
    </product>
       <img :src="product.image" />
      <h4>Product belongs to this area: </h4>
      
      <div
        class='title'
        @click="goToProduct(`/area/${product.area.id}`)"
      >
        {{product.area.title}}
      </div>
      <h4>People who work for this product: </h4>
      <div
        v-for="(people, peopleid) of product.people"
        :key="'art-' + peopleid"
        class='product'
        @click="goToProduct(`/people/${people.id}`)"
      >
        {{people.name}}
      </div>
     
    </header>
    
  </section>
</template>
<script>
export default {
  components: {
  },
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
h3 {
  margin: 30px 0;
  font-size: 20px;
  font-weight: bolder;
}
h4{
  font-size: 25px;
  margin-top: 30px;
  margin-bottom: 30px;
  color:#3567C5;
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
.top {
  cursor: pointer;
  color: black;
  font-size: 20px;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bolder;
  text-decoration:underline;
}
.topbox{
  color: black;
  font-size: 20px;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
.productMain{
  color: black;
  font-size: 18px;
  text-align: middle;
  margin-top: 20px;
  margin-bottom: 20px;
}
.product {
  cursor: pointer;
  font-size: 20px;
  text-align: middle;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: serif;
  font-weight: bolder;
  text-decoration:underline;
}

.title{
  cursor: pointer;
  font-size: 20px;
  text-align: middle;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: serif;
  font-weight: bolder;
  text-decoration:underline;
  }
</style>
