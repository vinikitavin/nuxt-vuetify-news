<template>
  <div class="filter">
    <v-col
      cols="12"
      md="4"
      sm="6"
    >
      <v-text-field
        v-model="search"
        class="filter__search"
        label="Поиск по заголовку"
      ></v-text-field>
    </v-col>
    <v-col
      cols="12"
      md="4"
      sm="6"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        class="filter__data-wrapper"
        min-width="auto"
        offset-y
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            class="filter__data-input"
            label="Поиск по дате"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          class="filter__data-picker"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            class="filter__picker-btn"
            color="primary"
            text
            @click="menu = false"
          >
            Отменить
          </v-btn>
          <v-btn
            class="filter__picker-btn"
            color="primary"
            text
            @click="$refs.menu.save(date)"
          >
            Принять
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col
      cols="12"
      md="4"
      sm="6"
    >
      <v-btn
        class="filter__apply"
        elevation="2"
        outlined
        @click="emitPickerAndSearch"
      >Применить
      </v-btn>
      <v-btn
        class="filter__reset"
        elevation="2"
        outlined
        @click="resetPickerAndSearch"
      >Очистить
      </v-btn>
    </v-col>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

@Component({
  name: 'NewsFilter',
})
export default class NewsFilter extends Vue {
  date = ''
  menu = false
  search = ''

  emitPickerAndSearch() {
    this.$emit('filter', {
      search: this.search,
      date: this.date
    });
  }

  resetPickerAndSearch() {
    this.date = ''
    this.search = ''
    this.emitPickerAndSearch()
  }
}
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  align-items: center;
}

@media (max-width: 960px) {
  .filter {
    flex-flow: column;
    align-items: start;
  }
}
</style>
