<template>
  <div class="nverseContent">

      <!-- Including Recommendation component -->
      <MasterHead/>

      <!-- Including Popular component -->
      <Popular/>

      <!-- Including All List of Manga -->
      <AllList/>

      
  </div>
</template>

<script>

import MasterHead from '~/components/LandingPage/MasterHead.vue'
import Popular from '~/components/LandingPage/Popular.vue'
import AllList from '~/components/LandingPage/AllList.vue'

export default {
  components:{
      MasterHead,
      AllList,
      Popular
  }
}
</script>
