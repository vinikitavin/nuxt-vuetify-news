<template>
  <div class="news-table" @click="getPaginatedValues">
    <table v-if="paginatedNews.length" class="news-table__table table">
      <thead class="table__head">
      <tr class="table__rows">
        <th
          v-if="isIncrease"
          class="table__row"
          @click="setIsIncrease"
        >Дата ↓
        </th>
        <th
          v-else
          class="table__row"
          @click="setIsIncrease"
        >Дата ↑
        </th>
        <th class="table__row">Заголовок</th>
        <th class="table__row">Анонс</th>
      </tr>
      </thead>
      <tbody class="table__body">
      <NewsTableBodyRows
        v-for="newsItem in paginatedNews"
        :key="newsItem.id"
        :news-item="newsItem"
        class="table__rows"
      />
      </tbody>
    </table>
    <div v-else class="news-table__message"
    >
      Нет подходящих новостей
    </div>
    <v-pagination
      v-model="currentPage"
      :length="setSlidesQuantity"
      class="news-table__pagination"
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
  background-color: white;

  &__table {
    border: 1px solid black;
  }

  &__pagination {
    margin: 20px 0;
  }
}

.table {
  @media (max-width: 426px) {
    &__row {
      font-size: 14px;
    }
  }

  &__row:nth-child(1) {
    min-width: 90px;
    cursor: pointer;
  }

  &__row:nth-child(1):hover {
    opacity: 0.6;
  }
}
</style>
