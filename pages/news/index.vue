<template>
  <div class="news">
    <NewsFilter @filter="getFilterValue"/>
    <NewsTable :paginated-news="paginatedNews" :set-slides-quantity="setSlidesQuantity"
               @paginatedValues="getPaginatedValues"/>
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
  newsQuantity = 0

  get paginatedNews() {
    const start = (this.paginatedValues.currentPage * this.paginatedValues.pageSize) - this.paginatedValues.pageSize
    const end = this.paginatedValues.currentPage * this.paginatedValues.pageSize
    let paginatedNews = []

    this.newsQuantity = this.news.filter(item =>
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
    paginatedNews = this.newsQuantity.slice(start, end)
    this.$store.dispatch('increment', paginatedNews)
    return paginatedNews
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
    if (this.newsQuantity.length <= this.paginatedValues.pageSize) {
      return 1
    }
    return Math.ceil(this.newsQuantity.length / this.paginatedValues.pageSize)
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
