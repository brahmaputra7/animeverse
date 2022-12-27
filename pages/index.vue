<template>
  <div>
    
    <!-- Navigation Bar -->
    <div class="nverseNavbar" :class="{'grey darken-4':this.$vuetify.theme.dark, 'grey lighten-4' :!this.$vuetify.theme.dark}">
      <v-container>
        <v-row class="justify-space-between">
          <v-col class="d-flex justify-space-between">
          <img src="/img/logo.svg" width="200px">
            hello
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!-- -->

    <nuxt-child></nuxt-child>

  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="scss" scoped>
.nverseNavbar {
  width:100%;
  position:fixed;
  z-index:10;
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