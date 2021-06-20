<template>
  <section class="container">
    <header>
      <div class='topbox'>
       <a class='top' @click="goToArticle(`/area`)">Area </a>
       <a class='topbox'>-&gt; </a>
       <a class='top' @click="goToArticle(`/area/${area.id}`)">{{area.title}}</a>
      </div>
      <h1>{{ area.title }}</h1>
      <h4>{{ area.overview }}</h4>     
      
      <img :src="area.image" :alt="area.overview" />
      <p class='articleMain'>
        {{ area.details }}
      </p>
    </header>
    <article>
      <p>People who work in this area: </p>
       <div
        v-for="(person, personid) of area.people"
        :key="'art-' + personid"
        class='article'
        @click="goToArticle(`/people/${person.id}`)"
        >
          {{person.name}}
        </div>
      
      <p>Products belong to this area: </p>
      <div
        v-for="(product, productid) of area.products"
        :key="'art-' + productid"
        class='article'
        @click="goToArticle(`/product/${product.id}`)"
        >
          {{product.title}}
      </div>
       <p>Services belong to this area: </p>
      <div
        v-for="(service, serviceid) of area.services"
        :key="'art-' + serviceid"
        class='article'
        @click="goToArticle(`/service/${service.id}`)"
        >
          {{service.title}}
      </div>
    </article>
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
      `${process.env.BASE_URL}/api/area/${id}`
    )
    const area = data
    return {
      area,
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
.personD {
  white-space:nowrap;
  cursor: pointer;
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
.article {
  cursor: pointer;
  color: black;
  font-size: 18px;
  text-align: middle;
  margin-top: 20px;
  margin-bottom: 20px;
}
.articleMain{
  color: black;
  font-size: 18px;
  text-align: middle;
  margin-top: 20px;
  margin-bottom: 20px;
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
