<template>
  <v-app id="inspire">
    <div style="display: flex; justify-content: center;">
      <div style="width: 30%; height: 30%">
        <v-carousel :show-arrows="false">
          <v-carousel-item
            v-for="details in storeNewsItem"
            v-if="details.mediaType === 'image/jpeg'"
            :key="details.id"
            :src="details.media"
            height="100%"
            width="100%"
            @click="openImg"
          ></v-carousel-item>

          <img v-else alt="" src="@/assets/img/default-img.jpg" style="width: 100%; height: 100%">
        </v-carousel>

        <v-card
          v-for="(details, i) in storeNewsItem"
          :key="i"
        >
          <v-card-subtitle class="pb-0">
            {{ details.date }}
          </v-card-subtitle>
          <v-card-subtitle class="pb-0">
            {{ details.author }}
          </v-card-subtitle>
          <v-card-title>{{ details.title }}</v-card-title>
          <v-card-text class="text--primary">
            {{ details.content }}
          </v-card-text>
          <v-card-text class="text--primary" style="display: flex; justify-content: space-between">
            <a :href="details.link" target="_blank">Ссылка на источник</a>
            <NuxtLink to="/news">Вернуться к новостям</NuxtLink>
          </v-card-text>
        </v-card>

        <v-dialog
          v-for="(details, i) in storeNewsItem"
          v-model="dialog"
          style=" height: 100%"
        >
          <v-card style="width: 100%; height: 100%; display: flex; justify-content: center">
            <img v-if="details.mediaType === 'image/jpeg'" :src="details.media" alt="" style="width: 60%; height: 60%">
            <img v-else alt="" src="@/assets/img/default-img.jpg"
                 style="width: 60%; height: 60%; position: relative; z-index: 999">
          </v-card>

          <v-btn
            color="dark"
            @click="dialog = false"
          >
            Закрыть
          </v-btn>
        </v-dialog>
      </div>
    </div>
  </v-app>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

@Component({
  name: '_id'
})
export default class _id extends Vue {
  storeNewsItem = []
  dialog = false

  findNewsItem() {
    this.storeNewsItem = this.$store.state.storeNews.filter(item => {
      return item.id === Number(this.$route.params.id)
    })
  }

  openImg() {
    this.dialog = true
  }

  mounted() {
    this.findNewsItem()
    if (this.storeNewsItem) {
      this.findNewsItem()
    }
  }
}
</script>

<style scoped>

</style>
