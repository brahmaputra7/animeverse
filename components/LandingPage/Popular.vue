<!-- POPULAR ANIME -->

<template>
       <v-container>
            <v-row class="pb-10">
                <v-col cols="12" class="d-flex justify-space-between align-center pb-0">
                    <div style="font-size:1.2rem">DISCOVER POPULAR ANIME</div>
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
                        <div class="animeCard mb-10" @click="viewDetails(item)">

                            <div class="animeCard__score d-flex align-center px-1">
                                <v-icon x-small class="mr-1 yellow--text" v-if="item.score < 7">mdi-star-half-full</v-icon>
                                <v-icon x-small class="mr-1 yellow--text" v-else>mdi-star</v-icon>
                                {{ item.score }}
                            </div>

                            <div v-if="item.rank<11" class="animeCard__rank purple darken-3 elevation-5">
                                <div class="animeCard__rank__title">TOP</div>
                                <div class="animeCard__rank__value">10</div>
                            </div>

                            <v-img
                                lazy-src="https://picsum.photos/id/11/10/6"
                                height="250"
                                width="100%"
                                :src="item.images.jpg.image_url"
                            ></v-img>
                            <div class="animeCard__text mt-1">
                                
                            <div class="animeCard__text__add mb-2">
                               <v-btn block x-small class="green" text @click.stop="addToWatchlist(item)"><v-icon x-small>mdi-plus</v-icon> ADD TO WATCHLIST</v-btn>
                            </div>

                                {{ item.title }}
                            </div>
                        </div>
                    </v-col>
                </template>
                <template v-else>
                    <v-col cols="6" sm="3" md="2" v-for="index in 6" :key="index">
                        <v-skeleton-loader
                            type="card"
                            height="290"
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
          axios.get('https://api.jikan.moe/v4/top/anime?limit=6&page='+this.paginationNumber+search)
              .then(res=>{
                  this.topAnimeData = res.data.data
                  this.paginationData = res.data.pagination
                  console.log(this.paginationData)
                  console.log(this.topAnimeData)
              })
              .finally(res=>{
                  this.animeLoader = false
              })
      },
      viewDetails(item){
        console.log(item)
        this.$router.push('/details/' + item.mal_id)
      },
      addToWatchlist(val){
            if(this.$store.state.store.WatchlistData.length==0){
                this.$store.commit('store/updateWatchlistEmptyDialog',true)
            }else{
                let watchlistAttributes = {
                    mal_id:val.mal_id,
                    title:val.title,
                    image:val.images.jpg.image_url,
                    alternatives:''
                }
                val.titles.forEach((item,index)=>{
                    watchlistAttributes.alternatives += item.title
                    if(index!==val.title.length-1){
                        watchlistAttributes.alternatives += ', '
                    } 
                })
                this.$store.commit('store/addToWatchlist', watchlistAttributes)
            }
        }
  },
  watch:{
      paginationNumber(newV){
          this.retrieveAnime()
      }
  }
}
</script>


<style lang="scss">
.animeCard {
  position:relative;
  cursor:pointer;
  &:hover {
      .animeCard__text {
          height:fit-content;
          background:grey;  
          padding:10px;
          transform:translateY(-70%);
          background-color:#353535;
          color:#fff;
          
        .animeCard__text__add {
            display:block;
        }
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
        .animeCard__text__add {
            display:none;
        }
  }

  .animeCard__score {
    
    position:absolute;
    top:5px;
    left:5px;
    padding:1px;
    border-radius:5px;
    z-index:1;
    background: rgba(0, 0, 0, 0.84);
    color:#fff;
  }

  .animeCard__rank{
    padding:5px;
    div {
        line-height: 1;
    }
    font-weight: bold;
    .animeCard__rank__title{
        font-size:0.8em;
    }
    .animeCard__rank__value {
        font-size:1.5rem;
    }
    color:#fff;
    display:flex;
    align-items:center;
    justify-content: center;
    flex-flow:column;
    position:absolute;
    top:0;
    right:0;;
    z-index:1;
  }
  .v-img {
    border-radius:10px;
  }
}

</style>