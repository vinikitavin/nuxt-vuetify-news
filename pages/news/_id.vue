<template>
  <v-app id="inspire">
    <div class="news-item d-flex justify-center">
      <div class="news-item__content">
        <v-carousel :show-arrows="false" class="news-item__carousel">

          <v-carousel-item
            v-for="details in storeNewsItem"
            v-if="details.mediaType === 'image/jpeg'"
            :key="details.id"
            :src="details.media"
            class="news-item__carousel-item"
            @click="openImg"
          ></v-carousel-item>

          <img v-else alt="default-img" class="news-item__default-img" src="@/assets/img/default-img.jpg">

        </v-carousel>

        <v-card
          v-for="(details, i) in storeNewsItem"
          :key="i"
          class="news-item__news-card news-card"
        >

          <v-card-subtitle class="news-card__subtitle pb-0">
            {{ details.date }}
          </v-card-subtitle>
          <v-card-subtitle class="news-card__subtitle pb-0">
            {{ details.author }}
          </v-card-subtitle>
          <v-card-title class="news-card__title">
            {{ details.title }}
          </v-card-title>
          <v-card-text class="news-card__content text--primary">
            {{ details.content }}
          </v-card-text>
          <v-card-text class="news-card__links text--primary">
            <a :href="details.link" class="news-card__link-item" target="_blank">Ссылка на источник</a>
            <NuxtLink class="news-card__link-item" to="/news">Вернуться к новостям</NuxtLink>
          </v-card-text>

        </v-card>

        <v-dialog
          v-for="(details, i) in storeNewsItem"
          v-model="dialog"
          class="news-item__popup popup"
        >
          <v-card class="popup__card d-flex justify-center">
            <img
              v-if="details.mediaType === 'image/jpeg'"
              :src="details.media"
              alt="popup-img"
              class="popup__img"
            >
            <img
              v-else
              alt="popup-img"
              class="popup__img"
              src="@/assets/img/default-img.jpg"
            >
          </v-card>

          <v-btn
            class="news-item__btn"
            color="dark"
            @click="dialog = false"
          >Закрыть
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

<style lang="scss" scoped>
.news-item {
  padding: 60px 0;

  &__content {
    max-width: 1150px;
  }

  @media (max-width: 1440px) {
    &__content {
      width: 60%;
    }
  }

  @media (max-width: 600px) {
    &__content {
      width: 100%;
      padding: 0 30px;
    }
  }

  @media (max-width: 376px) {
    &__content {
      padding: 0 15px;
    }
  }

  &__default-img {
    height: 100%;
  }

  &__carousel-item {
    cursor: pointer;
  }
}

.news-card {
  &__links {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 376px) {
    &__links {
      flex-direction: column;
      align-items: center;
    }
  }

  &__link-item {
    color: black;
  }

  &__title {
    word-break: normal;
  }
}

.popup {
  &__img {
    width: 60%;
    height: 60%;
  }

  @media (max-width: 600px) {
    &__img {
      width: 100%;
      height: 60%;
    }
  }
}
</style>
