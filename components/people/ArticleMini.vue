<template>
  <div class="article-mini">
    <div class="card">
        <div class="img" :style="{ 'background-image': `url(${image})` }"></div>
    </div>
    <div class="card2">
        <h3>{{ title }}</h3>
        <h4>{{position}}</h4>
        <p>{{summary}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    summary: { type: String, default: () => '' },
    position: { type: String, default: () => ''},
  },
}
</script>

<style scoped>
.card {
  border-radius: 100px;
  float: left;
  width: 30%;
  height: 180px;
}
.card2 {
  padding: 20px 10px;
  border: 1px solid grey;
  border-radius: 4px;
  float: right;
  width: 60%;
  height: 180px;
}
p {
  text-align: center;
  position: relative;
  top: 50%; 
  transform: translateY(-50%);
}

.img {
  width: auto;
  height: 100%;
  max-width: 100%;
  max-height:100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 4px;
}
.overv {
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>
