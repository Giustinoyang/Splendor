<template>
  <section class="container">
    <header>
       <div class='topbox'>
       <a class='top' @click="goToArticle(`/people`)">People </a>
       <a class='topbox'>-&gt; </a>
       <a class='top' @click="goToArticle(`/people/${person.id}`)">{{person.name}}</a>
      </div>
      <h1>{{ person.name }}</h1>
      <h3>{{ person.overview }}</h3>
      <h4>People work in this area:</h4>
      <div
        v-for="(area, areaid) of person.areas"
        :key="'art-' + areaid"
        class='title'
        @click="goToArticle(`/area/${area.id}`)"
      >
        {{area.title}}
      </div>
      <article>
      <p class='articleMain'>
        {{ person.details }}
      </p>
    </article>
    <img :src="person.image" :alt="person.overview" />
      <h4>Products worked by this person: </h4>
       <div
        v-for="(product, productid) of person.products"
        :key="'art-' + productid"
        class='article'
        @click="goToArticle(`/product/${product.id}`)"
      >
        {{product.title}}
      </div>
       <h4>Services worked by this person: </h4>
      <div
        v-for="(service, serviceid) of person.services"
        :key="'art-' + serviceid"
        class='article'
        @click="goToArticle(`/service/${service.id}`)"
      >
        {{service.title}}
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
      `${process.env.BASE_URL}/api/person/${id}`
    )
    const person = data
    return {
      person,
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
  white-space: pre-wrap;
  font-size: 20px;
  line-height: 150%;
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

.articleMain{
  color: black;
  font-size: 18px;
  text-align: middle;
  margin-top: 20px;
  margin-bottom: 20px;
}
.article {
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