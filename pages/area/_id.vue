<template>
  <section class="container">
    <header>
      <div class='topbox'>
       <a class='top' @click="goToArea(`/area`)">Area </a>
       <a class='topbox'>-&gt; </a>
       <a class='top' @click="goToArea(`/area/${area.id}`)">{{area.title}}</a>
      </div>
      <h1>{{ area.title }}</h1>
      <h3>{{ area.overview }}</h3>     
      
      <img :src="area.image" :alt="area.overview" />
      <p class='areaMain'>
        {{ area.details }}
      </p>
      <div
        v-for="(subArea, subAreaid) of area.subAreas"
        :key="'sub-' + subAreaid"
        class='subArea'
      >
        <div class="subcard">
          <img :src="subArea.image" class="subimg"/>
          <h2>{{subArea.title}}</h2>
          <p>{{subArea.details}}</p>
        </div>
      </div>
    </header>
    <areaShow>
      <h4>People who work in this area: </h4>
      <div
        v-for="(person, personid) of area.people"
        :key="'art-' + personid"
        class='areaShow'
        @click="goToArea(`/people/${person.id}`)"
        >
          {{person.name}}
      </div>
      
      <h4>Products belong to this area: </h4>
      <div
        v-for="(product, productid) of area.products"
        :key="'art-' + productid"
        class='areaShow'
        @click="goToArea(`/product/${product.id}`)"
        >
          {{product.title}}
      </div>
       <h4>Services belong to this area: </h4>
      <div
        v-for="(service, serviceid) of area.services"
        :key="'art-' + serviceid"
        class='areaShow'
        @click="goToArea(`/service/${service.id}`)"
        >
          {{service.title}}
      </div>
      
    </areaShow>
  </section>

    
</template>
<script>
export default {
  components: {
  },
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
    goToArea(path) {
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
h3 {
  margin: 30px 0;
  font-size: 20px;
  font-weight: bolder;
}
h4{
  font-size: 25px;
  margin-top: 30px;
  margin-bottom: 30px;
  color:#3567C5;
  text-align: left;
}
.areaShow {
  cursor: pointer;
  font-size: 20px;
  text-align: middle;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: serif;
  font-weight: bolder;
  text-decoration:underline;
  color: black;
  width: 100%;
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
.container {
  width: 100%
}
.subArea {
  padding: 20px 10px;
  display: inline;
  color: black;
  font-size: 18px;
  text-align: middle;
  margin-top: 20px;
  margin-bottom: 20px;
}
.subcard {
  max-width: 40%;
  height: 300px;
  display: inline-block;
  margin-left: 3%;
  margin-right: 3%;
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
.subimg {
  width: auto;
  height: auto;
  max-width: 20%;
  max-height:20%;
}
p {
  text-align: left;
  margin-top: 40px;
}
.areaMain{
  color: black;
  font-size: 18px;
  text-align: middle;
  margin-top: 20px;
  margin-bottom: 20px;
}
.top {
  cursor: pointer;
  color: black;
  font-size: 20px;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bolder;
  text-decoration:underline;
}
.topbox{
  color: black;
  font-size: 20px;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>
