<template>
  <main class="container">
    <header>
      <h1>{{id}} of our company</h1>
     <section class="positionH">
        <div
          v-for="(position, positionid) of position"
          :key="'art-' + positionid"
          class="posList"
          @click="goToposition(`/people/position/${position.position}`)"
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
    <section class="position-grid">
      <div
        v-for="(person, personid) of people"
        :key="'art-' + personid"
        class="position"
        @click="goToposition(`/people/${person.id}`)"
      >
        <people-card
          :title="person.name"
          :summary="person.overview"
          :image="person.image"
          :position="person.position"
        ></people-card>
      </div>
    </section>
  </main>
</template>

<script>
import PeopleCard from '~/components/listCard/peopleCard.vue'
export default {
  components: {
    PeopleCard,
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
  methods: {
    goToposition(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped>

h2 {
  margin-bottom: 30px;
}
.position-grid {
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
.position {
  cursor: pointer;
  margin-bottom: 20px;
}
.posList {
  cursor: pointer;
  font-size: 18px;
}
</style>
