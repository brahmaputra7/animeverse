<!-- default layout page -->

<template>
  <v-app dark>

    <!-- theme switch -->
    <div class="themeSwitch elevation-2"
      :class="{ 'dark grey darken-3': $vuetify.theme.dark, 'grey lighten-3': !$vuetify.theme.dark }" @click="reverseTheme">
      <v-icon v-if="this.$vuetify.theme.dark" class="yellow--text">mdi-white-balance-sunny</v-icon>
      <v-icon v-else>mdi-moon-waning-crescent</v-icon>
    </div>



    <!-- Navigation Bar -->
    <div class="nverseNavbar" :class="{ 'grey darken-4': $vuetify.theme.dark, 'grey lighten-4': !$vuetify.theme.dark }">
      <v-container>
        <v-row class="justify-space-between">
          <v-col class="d-flex justify-space-between">
            <img src="/img/logo.svg" width="130px" @click="goToHome()">
            <div>
              <v-btn small text fab @click="goToSearch()"><v-icon>mdi-magnify</v-icon></v-btn>
              <v-btn small text fab @click="$router.push('/watchlist')"><v-icon>mdi-playlist-play</v-icon></v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!-- -->

    <!-- Nuxt main app -->
    <nuxt />

    <!-- include router -->
    <Footer></Footer>


    <!-- include watchlist global components -->
    <WatchlistEmpty />
    <AddToWatchlist />

  </v-app>
</template>

<script>

//import every neede components
import Footer from '~/components/Default/Footer.vue'
import WatchlistEmpty from '~/components/Watchlist/WatchlistEmpty.vue'
import AddToWatchlist from '~/components/Watchlist/AddToWatchlist.vue'


export default {

  components: {
    Footer,
    WatchlistEmpty,
    AddToWatchlist,
  },

  data() {
    return {

    }
  },
  created() {

    //defining theme from latest user state
    if (localStorage.dark == undefined) {
      localStorage.dark = 'dark'
    } else {
      this.$vuetify.theme.dark = localStorage.dark
    }

    //fetching localStorage data
    if (localStorage.WatchlistData != undefined && localStorage.WatchlistData !== 'undefined') {
      this.$store.commit('store/updateWatchlistData', JSON.parse(localStorage.WatchlistData))
    }

  },
  methods: {

    reverseTheme() {

      //theme switching
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark

      //saving current theme option
      localStorage.dark = this.$vuetify.theme.dark
    },
    goToHome() {

      //push to home and scroll to top
      this.$router.push('/')
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    goToSearch() {

      //go to home if from another page, go to search if from home
      if (this.$route.path == '/') {
        window.location.href = '/#search'
      } else {
        this.$router.push('/')
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.themeSwitch {
  &:hover {
    transform: scale(1.1);
  }

  transition:0.2s;
  position:fixed;
  cursor:pointer;
  bottom:20px;
  right:40px;
  z-index:10;
  padding:10px;
  border-radius:100%;
}


.nverseNavbar {
  width: 100%;
  position: fixed;
  z-index: 10;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    transition: 0.4s;
    cursor: pointer;

    &:hover {
      filter: invert(100%);
      transform: scale(0.8);
    }
  }
}
</style>