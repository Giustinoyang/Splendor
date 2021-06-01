<template>
  <main class="container">
    <header>
      <h1>{{id}} of Our company</h1>
      <h4>Best</h4>
    </header>
    <section class="article-grid">
      <div
        v-for="(person, personid) of people"
        :key="'art-' + personid"
        class="article"
        @click="goToArticle(`/people/${person.id}`)"
      >
        <article-mini
          :title="person.name"
          :summary="person.overview"
          :image="person.image"
          :position="person.position"
        ></article-mini>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios'
import ArticleMini from '~/components/people/ArticleMini.vue'
export default {
  components: {
    ArticleMini,
  },
  async asyncData({ $axios, route }) {
    const { id } = route.params
    console.log('this url', process.env.BASE_URL)
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/people/${id}`
    )
    const people = data
    return {
      people: people,
      id:id,
    }
  },
  data() {
    return {
      adUrl: '',
    }
  },
  mounted() {
    setTimeout(async () => {
      const { data } = await axios.get('/api/ad')
      this.adUrl = data.url
    }, 1000)
  },
  methods: {
    goToArticle(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
.article-grid {
  display: grid;
  grid-template-columns: repeat(1, calc(100% / 1));
  grid-gap: 10px;
  margin-top: 40px;
}
.article {
  cursor: pointer;
  margin-bottom: 20px;
}
.ad img {
  width: 100%;
  height: 200px;
}
@media screen and (max-width: 600px) {
  .ad img {
    width: 100%;
    height: 100px;
  }
  .article-grid {
    display: block;
    margin: 40px 20px;
  }
}
</style>
