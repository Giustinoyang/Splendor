<template>
  <main class="container">
    <header>
      <h1>{{id}} of our company</h1>
     <section class="positionH">
        <div
          v-for="(position, positionid) of position"
          :key="'art-' + positionid"
          class="posList"
          @click="goToArticle(`/position/${position.position}`)"
        >
        <div v-if="position.position === id">
          <b>{{position.position}}</b>
        </div>
        <div v-else>
          {{position.position}}
        </div>
        </div>
      </section>
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
    let [position] = await Promise.all([
      $axios.$get(`${process.env.BASE_URL}/api/positions`),
    ])
    const people = data
    return {
      people: people,
      id:id,
      position:  position,
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
.positionH {
  grid-template-columns: repeat(3, calc(100% / 3));
  display: grid;
  grid-gap: 10px;
  margin-top: 40px;
  border: 1px solid grey;
  border-radius: 100px;
}
.article {
  cursor: pointer;
  margin-bottom: 20px;
}
.posList {
  cursor: pointer;
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
