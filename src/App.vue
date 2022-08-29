<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  // mounted() {
  //   axios.get('user/userInfo')
  //   .then(res => {
  //     console.log(res)
  //   })
  // }
}
</script>
