<template>
  <main class="container">
    <div>
      <h1>PEOPLE IN OUR COMPANY</h1>
      <section class="positionH">
        <div
          v-for="(position, positionid) of position"
          :key="'art-' + positionid"
          class="posList"
          @click="goToPeople(`/people/position/${position.position}`)"
        >
        {{position.position}}
        </div>
      </section>
    </div>
    <section class="people-grid">
      <div
        v-for="(person, personid) of people"
        :key="'art-' + personid"
        class="people"
        @click="goToPeople(`/people/${person.id}`)"
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
  methods: {
    goToPeople(path) {
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
.people-grid {
  display: grid;
  grid-template-columns: repeat(1, calc(100% / 1));
  grid-gap: 10px;
  margin-top: 40px;
}
.posList {
  cursor: pointer;
  font-size: 25px;
}
.people {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
