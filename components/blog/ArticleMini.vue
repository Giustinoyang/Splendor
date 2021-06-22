<template>
  <div class="article-mini">
    <div class="card">
      <h3>{{ title }}</h3>
    </div>
    <div class="card2"><p>{{summary}}</p></div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    summary: { type: String, default: () => '' },
  },
}
</script>

<style scoped>
.card {
  padding: 20px 10px;
  border: 1px solid grey;
  border-radius: 400px;
  float: left;
  width: 30%;
  height: 180px;
  font-size: 24px;
}
.card2 {
  padding: 20px 10px;
  border: 1px solid grey;
  border-radius: 4px;
  float: right;
  width: 60%;
  height: 180px;
  font-size: 18px;
}
h3 {
  position: relative;
  top: 50%; 
  transform: translateY(-50%);
}
p {
  text-align: center;
  position: relative;
  top: 50%; 
  transform: translateY(-50%);
}

.img {
  width: 100%;
  height: 200px;
  max-width: 600px;
  margin: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 40px;
}
.overv {
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>
