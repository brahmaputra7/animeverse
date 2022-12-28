<template>
  <v-app dark>

    <div class="themeSwitch elevation-2" :class="{'dark grey darken-3':$vuetify.theme.dark, 'grey lighten-3':!$vuetify.theme.dark}" @click="reverseTheme">
      <v-icon v-if="this.$vuetify.theme.dark" class="yellow--text">mdi-white-balance-sunny</v-icon>
      <v-icon v-else >mdi-moon-waning-crescent</v-icon>
    </div>

    
    
    <!-- Navigation Bar -->
    <div class="nverseNavbar" :class="{'grey darken-4':$vuetify.theme.dark, 'grey lighten-4' :!$vuetify.theme.dark}">
      <v-container>
        <v-row class="justify-space-between">
          <v-col class="d-flex justify-space-between">
          <img src="/img/logo.svg" width="130px" @click="goToHome()">
          <div>
            <v-btn small text fab @click="$router.push('/#search')"><v-icon>mdi-magnify</v-icon></v-btn>
            <v-btn small text fab><v-icon>mdi-playlist-play</v-icon></v-btn>
          </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!-- -->
    

    <nuxt/>

    <Footer></Footer>

  </v-app>
</template>

<script>
import Footer from '~/components/Default/Footer.vue'

export default {
  
  components:{
        Footer
    },

  data(){
    return {

    }
  },
  created(){
    console.log(localStorage.dark)
    //defining theme from latest user state
    if(localStorage.dark==undefined){
      localStorage.dark = 'dark'
    }else{
      this.$vuetify.theme.dark = localStorage.dark
    }
  },  
  methods:{
    reverseTheme(){
      //theme switching
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      //saving current theme option
      localStorage.dark = this.$vuetify.theme.dark
    },
    goToHome(){
      this.$router.push('/')
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }
}
</script>

<style lang="scss" scoped>
.themeSwitch {
  &:hover {
    transform:scale(1.1);
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
  width:100%;
  position:fixed;
  z-index:10;
  height:60px;
  display:flex;
  align-items: center;
  justify-content: center;
  img {
    transition:0.4s;
    cursor:pointer;
    &:hover {
      filter: invert(100%);
      transform:scale(0.8);
    }
  }
}
</style>