<template>
  <tr class="table-body">
    <td class="table-body__row">{{ newsItem.date }}</td>
    <td class="table-body__row">
      <NuxtLink class="table-body__link" :to="'/news/' + newsItem.id">{{ newsItem.title }}</NuxtLink>
    </td>
    <td class="table-body__row">{{ newsItem.content }}</td>
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
.table-body {
  &__link {
    color: white;
    text-decoration: none;
  }

  &__link:hover {
    opacity: 0.6;
  }
}
</style>
