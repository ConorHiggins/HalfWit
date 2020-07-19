<template>
  <v-app>
    <v-app-bar
      color="deep-purple accent-4"
      dark
      app
      clipped-left>
      <v-toolbar-title
        class="mr-12 ml-3">
        Half Wit
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-row
        align="center"
        class="mr-3">
        <v-text-field
          clearable
          autofocus
          hide-details
          placeholder="Press / to search"
          v-model="keyword"
          prepend-icon="mdi-magnify"
          ref="searchInput">
        </v-text-field>
      </v-row>
    </v-app-bar>

    <v-main>
      <GifList/>
    </v-main>
  </v-app>
</template>

<script>
// import vue from 'vuex'
import GifList from './components/GifList'

export default {
  name: 'App',
  components: {
    GifList,
  },
  data: () => {
    return {
      timeout: null
    }
  },
  computed: {
    keyword: {
      get () {
        return this.$store.state.searchTerm
      },
      set (value) {
        if (this.timeout !== undefined){
          clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
          this.$store.commit('updateTerm', value)
        }, 500);
      }
    }
  },
  created: function(){
    this.$root.$on('searchFocus', this.focusInput);
  },
  methods: {
    focusInput: function(){
      this.$refs.searchInput.focus();
    }
  },
  destroyed() {
    clearInterval(this.timeout)
  }
};
</script>
