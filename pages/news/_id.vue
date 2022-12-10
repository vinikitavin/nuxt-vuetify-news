<template>
  <h1>{{ $route.params.id }}</h1>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

@Component({
  name: '_id'
})
export default class _id extends Vue {
  mounted() {
    console.log(this.$route.params, 'params')
  }
}
</script>

<style scoped>

</style>
