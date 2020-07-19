<template>
  <v-container>
    <!-- <v-row class="text-center">
      <h1>Gifs Here {{searchTerm}}</h1>
    </v-row> -->
    <v-row dense>
        <v-col
          v-for="gif in gifs"
          :key="gif.id"
          cols="6"
          md="4"
          lg="2"
        >
          <v-card
            @click="copyToClipboard(gif, $event)">
            <v-img
              :src="gif.images.downsized_medium.url"
              class="white--text align-end"
              height="200px"
              :ripple="false"
            />
          </v-card>
        </v-col>
      </v-row>

      <v-snackbar
        v-model="showAlert"
        :color="alertColor"
        right
        bottom>

        {{alertMessage}}

        <template #action>
          <v-btn
            dark
            text
            @click="showAlert = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { API_KEY } from '../config/key'

  export default {
    name: 'GifList',
    data: () => {
      return {
        showAlert: false,
        alertMessage: 'GIF Copied',
        alertColor: 'success',
        gifs: []
      }
    },
    computed: {
      ...mapState([
        'searchTerm'
      ]),
    },
    mounted: async function() {
      this.lookUpGifs();
    },
    methods: {
      lookUpGifs: async function(){
        let baseUrl = 'http://api.giphy.com/v1/gifs/trending';
        let payload = {
          'api_key': API_KEY,
          'limit': 10
        };

        if (this.searchTerm.length) {
          payload['q'] = this.searchTerm;
          baseUrl = 'http://api.giphy.com/v1/gifs/search'
        }

        let url = `${baseUrl}?${new URLSearchParams(payload).toString()}`;
        const response = await fetch(url);
        const json = await response.json();
        this.gifs = json.data;
      },
      copyToClipboard (g) {
        try {
          this.$clipboard(g.images.original.url);
          this.alertMessage = 'GIF Copied';
          this.alertColor = 'success';
          this.showAlert = true;
        }
        catch (e) {
          this.alertMessage = 'GIF failed to copy!';
          this.alertColor = 'danger';
          this.showAlert = true;
        }
      }
    },
    watch: {
      searchTerm() {
        this.lookUpGifs();
      },
    },
  }
</script>
