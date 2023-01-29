<template>
  <BoardComponent />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import BoardComponent from './components/BoardComponent.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    BoardComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
