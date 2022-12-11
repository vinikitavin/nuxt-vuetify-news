<template>
  <div class="news">
    <NewsFilter
      class="news__filter"
      @filter="getFilterValue"/>
    <NewsTable
      class="news__table"
      :paginated-news="paginatedNews"
      :set-slides-quantity="setSlidesQuantity"
      @paginatedValues="getPaginatedValues"
      @isIncrease="getIsIncrease"
    />
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator';
import NewsFilter from '@/components/NewsFilter'
import NewsTable from '@/components/NewsTable'
import axios from "axios";

@Component({
  name: 'NewsPage',
  layout: 'MainPage',
  components: {
    NewsFilter,
    NewsTable
  }
})
export default class NewsPage extends Vue {
  filterValue = {
    search: '',
    date: ''
  }
  paginatedValues = {
    currentPage: 1,
    pageSize: 5
  }
  news = []
  fullNewsArray = 0
  isIncrease = true

  get paginatedNews() {
    const start = (this.paginatedValues.currentPage * this.paginatedValues.pageSize) - this.paginatedValues.pageSize
    const end = this.paginatedValues.currentPage * this.paginatedValues.pageSize
    let sortedNews = []

    const getSortedNews = (newsArray) => {
      if (this.isIncrease) {
        return newsArray.sort((a, b) => a.id - b.id)
      } else {
        return newsArray.sort((a, b) => b.id - a.id)
      }
    }

    this.fullNewsArray = this.news.filter(item =>
      item.title
        .toLowerCase()
        .includes(this.filterValue.search
          .trim()
          .toLowerCase())
      && item.date
        .includes(this.filterValue.date
          .trim()
        )
    )

    sortedNews = getSortedNews(this.fullNewsArray).slice(start, end)
    this.$store.dispatch('increment', sortedNews)
    return sortedNews
  }

  async getNews() {
    try {
      const url = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fstatic.feed.rbc.ru%2Frbc%2Flogical%2Ffooter%2Fnews.rss'
      const getUrl = await axios(url)
      const newsItems = getUrl.data.items;
      const news = newsItems.map((item, index) => {
        return {
          id: index + 1,
          date: item.pubDate.slice(0, 10),
          author: item.author,
          link: item.link,
          mediaType: item.enclosure.type,
          media: item.enclosure.link,
          title: item.title,
          content: item.content
        };
      });
      this.news = news
    } catch (error) {
      console.log(error)
    }
  }

  get setSlidesQuantity() {
    if (this.fullNewsArray.length <= this.paginatedValues.pageSize) {
      return 1
    }
    return Math.ceil(this.fullNewsArray.length / this.paginatedValues.pageSize)
  }

  getIsIncrease(isIncrease) {
    this.isIncrease = isIncrease
  }

  getPaginatedValues(paginatedValues) {
    this.paginatedValues = paginatedValues
  }

  getFilterValue(filterValue) {
    this.filterValue = filterValue
  }

  async mounted() {
    await this.getNews()
  }
}
</script>

<style lang="scss" scoped>
</style>
