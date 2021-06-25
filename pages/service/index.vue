<template>
  <main class="container">
    <header>
      <h1>SERVICE</h1>
      <h4>And it's made with Nuxt</h4>
    </header>
    <section class="service-grid">
      <div
        v-for="(service, serviceid) of services"
        :key="'art-' + serviceid"
        class="service"
        @click="goToService(`/service/${service.id}`)"
      >
        <normal-card
          :title="service.title"
          :summary="service.overview"
          :image="service.image"     
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
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/services`)
    const services = data
    return {
      services,
    }
  },
  data() {
    return {
      adUrl: '',
    }
  },
  methods: {
    goToService(path) {
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
.service-grid {
  display: grid;
  grid-template-columns: repeat(1, calc(100% / 1));
  grid-gap: 10px;
  margin-top: 40px;
}
.service {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
