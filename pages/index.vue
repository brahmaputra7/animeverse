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
import MasterHead from '~/components/Index/MasterHead.vue'
import Popular from '~/components/Index/Popular.vue'
import AllList from '~/components/Index/AllList.vue'

export default {
  components:{
      AllList,
      MasterHead,
      Popular
  }
}
</script>
