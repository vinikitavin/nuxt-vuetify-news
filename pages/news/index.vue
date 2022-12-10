<template>
  <div class="news">
    <NewsFilter @filter="getFilterValue"/>
    <NewsTable @paginatedValues="getPaginatedValues" :paginated-news="paginatedNews"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import NewsFilter from '@/components/NewsFilter'
import NewsTable from '@/components/NewsTable'
// import { getModule } from 'vuex-module-decorators';
// import getNews from '@/store/getNews';
// import { store } from '@/store';
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
  filterValue = {}
  paginatedValues = {
    currentPage: 1,
    pageSize: 5
  }
  news = []
  // storeNews = getModule(getNews)

  getPaginatedValues(paginatedValues) {
    this.paginatedValues = paginatedValues
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
          title: item.title,
          content: item.content
        };
      });
      console.log(news, 'news')
      console.log(this.$store.state.counter, 'storeNews')
    } catch(error) {
      console.log(error)
    }
  }

  get paginatedNews() {
    const start = (this.paginatedValues.currentPage * this.paginatedValues.pageSize) - this.paginatedValues.pageSize
    const end = this.paginatedValues.currentPage * this.paginatedValues.pageSize

    if (this.filterValue.search && !this.filterValue.date) {
      return this.news.filter(item => item.title.toLowerCase().includes(this.filterValue.search.trim().toLowerCase())).slice(start, end)
    }
    if (!this.filterValue.search && this.filterValue.date) {
      return this.news.filter(item => item.date.includes(this.filterValue.date.trim())).slice(start, end)
    }
    if (this.filterValue.search && this.filterValue.date) {
      return this.news.filter(item =>
        item.title.toLowerCase().includes(this.filterValue.search.trim().toLowerCase())
        &&
        item.date.includes(this.filterValue.date.trim()))
        .slice(start, end)
    } else {
      return this.news.slice(start, end)
    }
  }

  getFilterValue (filterValue) {
    this.filterValue = filterValue
  }

  async mounted() {
    await this.getNews()
  }
}
</script>

<style lang="scss" scoped>
</style>
