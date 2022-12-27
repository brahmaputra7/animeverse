<template>
  <v-app dark>
    <div class="themeSwitch elevation-2" :class="{'dark grey darken-3':this.$vuetify.theme.dark}" @click="reverseTheme">
      <v-icon v-if="this.$vuetify.theme.dark" class="yellow--text">mdi-white-balance-sunny</v-icon>
      <v-icon v-else >mdi-moon-waning-crescent</v-icon>
    </div>
    <nuxt/>
  </v-app>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  created(){
    //defining theme from latest user state
    if(!localStorage.dark==undefined){
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
  right:20px;
  z-index:10;
  padding:10px;
  border-radius:100%;
}
</style>