<template>
  <main class="container">
    <header>
      <h1>AREA</h1>
      <h4>Where we focus on</h4>
    </header>
    <section class="area-grid">
      <div
        v-for="(area, areaid) of areas"
        :key="'art-' + areaid"
        class="area"
        @click="goToarea(`/area/${area.id}`)"
      >
        <normal-card
          :title="area.title"
          :summary="area.overview"
          :image="area.image"
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
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/areas`)
    const areas = data
    return {
      areas,
    }
  },
  data() {
    return {
      adUrl: '',
    }
  },
  methods: {
    goToarea(path) {
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
.area-grid {
  display: grid;
  grid-template-columns: repeat(1, calc(100% / 1));
  grid-gap: 10px;
  margin-top: 40px;
}
.area {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
