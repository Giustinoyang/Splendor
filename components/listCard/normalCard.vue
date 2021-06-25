<template>
  <div class="normal-card">
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
  border: 1px solid white;
  border-radius: 400px;
  float: left;
  width: 30%;
  height: 150px;
  font-size: 24px;
  background:	#3567C5;
  color: white;
  margin-top: 80px;
  margin-bottom: 60px;
  text-decoration:underline;
  }

.card2 {
  padding: 20px 10px;
  border: 1px solid white;
  border-radius: 4px;
  float: right;
  width: 60%;
  height: 250px;
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 50px;
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
</style>
