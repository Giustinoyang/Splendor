<template>
  <header class="header">
    <div class="header-content">
      <nav class="first"> 
        <img class="button" @click="goToArticle(`/`)" src="~/static/Splendor.png"/>
        <div
          v-for="(title, titleIndex) of titleOptions"
          :key="'menu-item-' + titleIndex"
          class="menu-item"
          @click="goToArticle(title.path)"
        >
          <a class = "button">{{ title.name }}</a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOptions: [
        
      ],
      titleOptions: [
        {
          name: 'PLENDOR',
          path: '/',
        },
        {
          name: 'Area',
          path: '/area',
        },
        {
          name: 'Service',
          path: '/service',
        },
        {
          name: 'Product',
          path: '/product',
        },
        {
          name: 'People',
          path: '/people',
        },
        {
          name: 'Career',
          path: '/career',
        },
        {
          name: 'Contact',
          path: '/contact',
        },
      ],
    }
  },
  methods: {
    goToArticle(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style>
.header {
  height: 70px;
  background: black;
  color: white;
  display: flex;
  justify-content: space-between;
  line-height: 200%;
  position: fixed;
  width: 100%;
  top: 0;
}
.button {
  cursor: pointer;
}
.header-content {
  width: 100%;
  max-width: 800px;
  margin: auto;
}
.menu-item {
  display: flex;
  text-align: center;
  font-size: 20px;
  font-weight:bolder;
}
.right {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: auto;
  max-width: 50%;
  text-align: center;
}
.title {
  font-size: 1.3rem;
  margin-bottom: 5px;
}
.first {
  display: flex;
  align-items: flex-start;
}
img {
  width: auto;
  height: auto;
  max-width: 5%;
  max-height:5%;
}
</style>
