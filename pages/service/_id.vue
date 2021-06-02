<template>
  <section class="container">
    <header>
      <h1>{{ service.title }}</h1>
      <h4>{{ service.overview }}</h4>
      <div
        class='title'
        @click="goToArticle(`/area/${service.area.id}`)"
      >
        {{service.area.title}}
      </div>
      <div
        v-for="(people, peopleid) of service.people"
        :key="'art-' + peopleid"
        class='article'
        @click="goToArticle(`/people/${people.id}`)"
      >
        {{people.name}}
      </div>
      <img :src="service.image" :alt="service.overview" />
    </header>
    <article>
      <p>
        {{ service.details }}
      </p>
    </article>
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, route }) {
    const { id } = route.params
    console.log('this url', process.env.BASE_URL)
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/service/${id}`
    )
    const service = data
    return {
      service,
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
.article {
  cursor: pointer;
  font-size: 16px;
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
</style>
