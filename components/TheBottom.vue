<template>
  <dev class="bottom">
    <dev class="bottom-content">
        <h2>Splendor</h2>
        <p>The Best Company You Have Ever Known.</p>
    </dev>
  </dev>
</template>

<script>
export default {
}
</script>

<style>
.bottom {
  height: 70px;
  background: black;
  color: white;
  display: flex;
  justify-content: space-between;
  line-height: 200%;
  width: 100%;
}
.button {
  cursor: pointer;
}
.bottom-content {
  width: 100%;
  max-width: 800px;
  margin: auto;
}
.menu-item {
  display: flex;
  text-align: center;
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
