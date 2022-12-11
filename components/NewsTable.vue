<template>
  <div class="news-table" @click="getPaginatedValues">
    <table v-if="paginatedNews.length">
      <thead>
      <tr>
        <th v-if="isIncrease" @click="setIsIncrease">Дата ↓</th>
        <th v-else @click="setIsIncrease">Дата ↑</th>
        <th>Заголовок</th>
        <th>Анонс</th>
      </tr>
      </thead>
      <tbody>
      <NewsTableBodyRows v-for="newsItem in paginatedNews" :key="newsItem.id" :news-item="newsItem"/>
      </tbody>
    </table>
    <div v-else>
      Нет подходящих новостей
    </div>
    <v-pagination
      v-model="currentPage"
      :length="setSlidesQuantity"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
    ></v-pagination>
  </div>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator'
import NewsTableBodyRows from '@/components/NewsTableBodyRows'

@Component({
  name: 'NewsTable',
  components: {
    NewsTableBodyRows
  }
})
export default class NewsTable extends Vue {
  currentPage = 1
  pageSize = 5
  isIncrease = true

  @Prop({required: true}) paginatedNews
  @Prop({required: true}) setSlidesQuantity

  setIsIncrease() {
    this.isIncrease = !this.isIncrease;
    this.$emit('isIncrease', this.isIncrease)
  }

  getPaginatedValues() {
    this.$emit('paginatedValues', {
      currentPage: this.currentPage,
      pageSize: this.pageSize
    })
  }
}
</script>

<style lang="scss" scoped>
.news-table {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border: 1px solid white;
}

tr > th:nth-child(1) {
  width: 90px;
  cursor: pointer;
}
</style>
