<template>
  <section class="container">
    <header>
       <div class='topbox'>
       <a class='top' @click="goToArticle(`/product`)">Product</a>
       <a class='topbox'>-&gt; </a>
       <a class='top' @click="goToArticle(`/people/${product.id}`)">{{product.title}}</a>
      </div>
      <h1>{{ product.title }}</h1>
      <h4>{{ product.overview }}</h4>
      <article>
      <p class='article'>
        {{ product.details }}
      </p>
    </article>
       <img :src="product.image" />
      <p>Service belongs to this area: </p>
      
      <div
        class='title'
        @click="goToArticle(`/area/${product.area.id}`)"
      >
        {{product.area.title}}
      </div>
      <p>People who work for this product: </p>
      <div
        v-for="(people, peopleid) of product.people"
        :key="'art-' + peopleid"
        class='article'
        @click="goToArticle(`/people/${people.id}`)"
      >
        {{people.name}}
      </div>
     
    </header>
    
  </section>
</template>
<script>
import ArticleMini from '~/components/people/ArticleMini.vue'
export default {
  components: {
    ArticleMini,
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
    goToArticle(path) {
      this.$router.push({ path })
    },
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
.article {
  cursor: pointer;
  font-size: 18px;
  text-align: middle;
  margin-top: 20px;
  margin-bottom: 20px;
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
