<template>
  <tr>
    <td>{{ newsItem.date }}</td>
    <td>
      <NuxtLink :to="'/news/' + newsItem.id">{{ newsItem.title }}</NuxtLink>
    </td>
    <td>{{ newsItem.content }}</td>
  </tr>
</template>

<script>
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component({
  name: 'NewsTableBodyRows'
})
export default class NewsTableBodyRows extends Vue {
  @Prop({required: false}) newsItem
}
</script>

<style lang="scss" scoped>
tr > td:nth-child(2) {
  cursor: pointer;
}

tr > td:nth-child(2):hover {
  opacity: 0.6;
}
</style>
