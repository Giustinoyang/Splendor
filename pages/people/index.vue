<template>
  <main class="container">
    <div>
      <h1>People in Our company</h1>
      <section class="positionH">
        <div
          v-for="(position, positionid) of position"
          :key="'art-' + positionid"
          class="posList"
          @click="goToArticle(`/position/${position.position}`)"
        >
        {{position.position}}
        </div>
      </section>
    </div>
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
  async asyncData({ app }) {
    let [people, position] = await Promise.all([
      app.$axios.$get(`${process.env.BASE_URL}/api/people`),
      app.$axios.$get(`${process.env.BASE_URL}/api/positions`),
    ])
    return {
      people: people,
      position: position,   
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

h1 {
  font-size: 50px;
  font-weight: bolder;
  font-family: "Lucida Handwriting", "Lucida Console","Courier New", monospace;
}

h2 {
  margin-bottom: 30px;
}
.positionH {
  grid-template-columns: repeat(3, calc(100% / 3));
  display: grid;
  grid-gap: 10px;
  margin-top: 40px;
  border: 1px solid grey;
  border-radius: 100px;
}
.article-grid {
  display: grid;
  grid-template-columns: repeat(1, calc(100% / 1));
  grid-gap: 10px;
  margin-top: 40px;
}
.posList {
  cursor: pointer;
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
