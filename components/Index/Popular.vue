<template>
       <v-container>
            <v-row>
                <v-col cols="12" class="d-flex justify-space-between align-center pb-0">
                    <div style="font-size:1.2rem">RECENT POPULAR ANIME</div>
                    <v-pagination
                        :disabled="animeLoader"
                        v-model="paginationNumber"
                        :length="paginationData.last_visible_page"
                        :total-visible="0"
                        class="pa-0"
                    ></v-pagination>
                </v-col>
                <template v-if="!animeLoader">
                    <v-col cols="6" sm="3" md="2" v-for="item,index in topAnimeData" :key="index">
                        <div class="animeCard mb-10">
                            <v-img
                                lazy-src="https://picsum.photos/id/11/10/6"
                                height="250"
                                width="100%"
                                :src="item.images.jpg.image_url"
                            ></v-img>
                            <div class="animeCard__text mt-1">
                                {{ item.title }}
                                
                                {{ item.score }}
                            </div>
                        </div>
                    </v-col>
                </template>
                <template v-else>
                    <v-col cols="6" sm="3" md="2" v-for="index in 12" :key="index">
                        <v-skeleton-loader
                            type="card"
                            height="300"
                        ></v-skeleton-loader>
                    </v-col>
                </template>
            </v-row>
      </v-container>
</template>


<script>
import axios from 'axios'

export default {
  data(){
      return {
          topAnimeData:[],
          animeLoader:false,
          paginationNumber:1,
          paginationData:{},
          searchKey:''
      }
  },
  created(){
      this.retrieveAnime()
      console.log(this.$route.params)
  },
  methods:{
      //retrieve top anime
      retrieveAnime(event){
          if(event=='search'){
              this.paginationNumber = 1
          }
          this.animeLoader = true
          let search = ''
          console.log(this.searchKey)
          if(this.searchKey!==''){
              search = '&q='+this.searchKey
          }
          axios.get('https://api.jikan.moe/v4/top/anime?limit=12&page='+this.paginationNumber+search)
              .then(res=>{
                  this.topAnimeData = res.data.data
                  this.paginationData = res.data.pagination
                  console.log(this.paginationData)
                  console.log(this.topAnimeData)
              })
              .finally(res=>{
                  this.animeLoader = false
              })
      }
  },
  watch:{
      paginationNumber(newV){
          this.retrieveAnime()
      }
  }
}
</script>

<style lang="scss" scoped>
.animeCard {
  position:relative;
  &:hover {
      .animeCard__text {
          height:fit-content;
          background:grey;
          height:80px;
          padding:10px;
          transform:translateY(-40%);
          background-color:#353535;
          color:#fff;
      }
  }
  .animeCard__text {
      transition:0.2s;
      position:absolute;
      width:100%;
      height:40px;
      overflow: hidden;
      padding:0 5px;
      z-index:9;
      border-radius:0 0 10px 10px;
  }
}
</style>