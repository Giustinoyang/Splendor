<template>
  <header class="header">
    <div class="header-content">
      <nav class="first"> 
        <img class="button" @click="goToTag(`/`)" src="~/static/Splendor.png"/>
        <div
          v-for="(title, titleIndex) of titleOptions"
          :key="'menu-item-' + titleIndex"
          class="menu-item"
          @click="goToTag(title.path)"
        >
          <a class = "button">{{ title.name }}</a>
          &nbsp;|&nbsp;
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
    goToTag(path) {
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
  line-height: 200%;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
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
  font-size: 120%;
  font-weight:bolder;
}
.first {
  display: flex;
  align-items:center;
  width: 800px;
}
img {
  width: auto;
  height: auto;
  max-width: 2.5%;
  max-height:2.5%;
}
@media screen and (max-width: 600px) {
  .menu-item{
    font-size: 80%;
  }
}
</style>
