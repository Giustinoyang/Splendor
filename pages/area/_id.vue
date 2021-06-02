<template>
  <section class="container">
    <header>
      <h1>{{ area.title }}</h1>
      <h4>{{ area.overview }}</h4>
      <p>Working on: </p>
       <div
        v-for="(person, personid) of area.people"
        :key="'art-' + personid"
        class='article'
        @click="goToArticle(`/people/${person.id}`)"
        >
          {{person.name}}
        </div>
      <img :src="area.image" :alt="area.overview" />
    </header>
    <article>
      <p>
        {{ area.details }}
      </p>
      <p>Product and Service: </p>
      <div
        v-for="(product, productid) of area.products"
        :key="'art-' + productid"
        class='article'
        @click="goToArticle(`/product/${product.id}`)"
        >
          {{product.title}}
      </div>
      <div
        v-for="(service, serviceid) of area.services"
        :key="'art-' + serviceid"
        class='article'
        @click="goToArticle(`/service/${service.id}`)"
        >
          {{service.title}}
      </div>
    </article>
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, route }) {
    const { id } = route.params
    console.log('this url', process.env.BASE_URL)
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/area/${id}`
    )
    const area = data
    return {
      area,
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
.personD {
  white-space:nowrap;
  cursor: pointer;
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
</style>
