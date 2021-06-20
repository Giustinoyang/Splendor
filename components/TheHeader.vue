<template>
  <header class="header">
    <div class="header-content">
      <nav class="first">
        <img src="~/static/Splendor.png"/>&nbsp; 
        <div
          v-for="(title, titleIndex) of titleOptions"
          :key="'menu-item-' + titleIndex"
          class="menu-item"
        >
          <nuxt-link :to="title.path">
            <div v-if="title.name===PLENDOR">
              <img src="~/static/Splendor.png"/>
            </div>
            {{ title.name }}
          </nuxt-link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
        </div>
      </nav>
      <nav class="right">
        <div
          v-for="(item, itemIndex) of menuOptions"
          :key="'menu-item-' + itemIndex"
          class="menu-item"
        >
          <nuxt-link :to="item.path">
            {{ item.name }}
          </nuxt-link>
          &nbsp;&nbsp;|
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
          name: 'Introduction',
          path: '/introduction',
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
.header-content {
  width: 100%;
  max-width: 800px;
  margin: auto;
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
  max-width: 2.5%;
  max-height:2.5%;
}
</style>
