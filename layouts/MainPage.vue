<template>
  <v-app id="inspire">
    <TheHeader/>
    <Nuxt />
  </v-app>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import TheHeader from '@/components/TheHeader'

@Component({
  name: 'MainPage',
  components: {
    TheHeader
  }
})
export default class MainPage extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
