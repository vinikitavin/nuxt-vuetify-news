<template>
  <v-app-bar class="header">
    <v-toolbar-title class="header__logo">Новости</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

@Component({
  name: 'TheHeader',
  layout: 'MainPage'
})
export default class TheHeader extends Vue {
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  max-height: 64px;

  &__logo {
    color: black;
  }
}
</style>
