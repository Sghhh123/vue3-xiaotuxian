<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'app',
  setup() {
    const store = useStore()
    console.log('store', store.state.userName)
  }
}
</script>

<style></style>
<style lang="less"></style>
