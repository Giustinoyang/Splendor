<template>
  <section class="container">
    <header>
      <h1>{{ person.name }}</h1>
      <h4>{{ person.overview }}</h4>
      <img :src="person.image" :alt="person.overview" />
    </header>
    <article>
      <p>
        {{ person.details }}
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
      `${process.env.BASE_URL}/api/person/${id}`
    )
    const person = data
    return {
      person,
    }
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
