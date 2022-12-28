<!-- Main Feature -->

<template>
    <div class="pb-10" :class="{'grey darken-4':$vuetify.theme.dark, 'grey lighten-3':!$vuetify.theme.dark}">
        <v-container>

            <!-- Section Title-->
            <v-row class="mt-2">
                    <v-col cols="12" class="text-center">
                        <div>
                            <h1> Discover All Anime</h1>
                        </div>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center align-center">
                        <div style="max-width:800px;width:100%">
                            <v-text-field hide-details label="Find your favorite anime here..." dense outlined rounded prepend-inner-icon="mdi-magnify" @keyup.enter="retrieveAnime('search')" v-model="searchKey"></v-text-field>
                        </div>
                    </v-col>

                    <v-col cols="12" class="d-flex justify-center align-center">
                        <v-btn @click="showFilter=!showFilter"><v-icon small class="mr-2">mdi-filter</v-icon> <span v-if="showFilter" class="mr-1">HIDE</span><span class="mr-1" v-else>SHOW</span> FILTER</v-btn>
                    </v-col>

                </v-row>
            <v-row>
            
        <v-expand-transition>
            <v-row v-if="showFilter" class="mt-3">
                


                <v-col cols="12" md="3" class="filterItem pa-3 mb-3 text-center pt-5">
                            Set Maximum and Minimum Score
                            <v-range-slider
                                v-model="range"
                                @change="setMinMaxScore()"
                                :max="10"
                                :min="0"
                                hide-details
                                class="align-center mt-3"
                            >
                                <template v-slot:prepend>
                                <v-text-field
                                    :value="range[0]"
                                    class="mt-0 pt-0"
                                    hide-details
                                    single-line
                                    type="number"
                                    style="width: 50px"
                                    outlined
                                    dense
                                    @change="$set(range, 0, $event)"
                                ></v-text-field>
                                </template>
                                <template v-slot:append>
                                <v-text-field
                                    :value="range[1]"
                                    class="mt-0 pt-0"
                                    hide-details
                                    single-line
                                    type="number"
                                    style="width: 60px"
                                    outlined
                                    dense
                                    @change="$set(range, 1, $event)"
                                ></v-text-field>
                                </template>
                            </v-range-slider>
                        </v-col>

                        
                        <v-col cols="12" md="3" class="filterItem d-flex align-center justify-start pa-3 mb-3 pt-5" style="flex-flow:column wrap">

                            Filter by Status
                            <v-btn-toggle v-model="filter.status" @change="retrieveAnime()"  class="mt-3">
                                <v-btn value="airing" small>
                                    Airing
                                </v-btn>
                                <v-btn value="upcoming" small>
                                    Upcoming
                                </v-btn>
                                <v-btn value="complete" small>
                                    Complete
                                </v-btn>
                            </v-btn-toggle>
                        </v-col>
                        
                        <v-col cols="12 " md="3" class="filterItem d-flex align-center justify-center pa-3 mb-3" style="flex-flow:column wrap">
                            Order By
                            <v-autocomplete hide-details="" v-model="filter.order_by" outlined width="100%" dense class="mt-3" :items="sortItems" @change="retrieveAnime()"></v-autocomplete>
                            <v-btn-toggle v-model="filter.sort" @change="retrieveAnime()"  class="mt-3" v-if="filter.order_by!=='none'">
                                <v-btn value="asc" small>
                                    Ascending
                                </v-btn>
                                <v-btn value="desc" small>
                                    Descending
                                </v-btn>
                            </v-btn-toggle>

                        </v-col>
                        
                        <v-col cols="12 " md="3" class="filterItem d-flex align-center justify-center pa-3 mb-3" style="flex-flow:column wrap">
                            <div class="d-flex"> Rating <v-icon small class="ml-3" @click="animeRating=true"> mdi-information</v-icon></div>
                            <v-autocomplete hide-details="" v-model="filter.rating" outlined width="100%" dense class="mt-3" :items="ratingItems" @change="retrieveAnime()"></v-autocomplete>
                        </v-col>

            </v-row>
        </v-expand-transition>
            <!-- Populate: Anime Data-->
            <template v-if="!animeLoader">
                <v-col cols="6" sm="3" md="2" v-for="item,index in animeData" :key="index"  @click.stop="viewDetails(item)">
                    <div class="animeCard mb-10">
                        
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
                <v-col cols="6" sm="3" md="2" v-for="index in 12" :key="index">
                    <v-skeleton-loader
                        type="card"
                        height="290"
                    ></v-skeleton-loader>
                </v-col>
            </template>
            </v-row>

            <!-- Pagination -->
            <v-row class="mt-2">
                <v-col cols="12">
                    <v-pagination
                        :disabled="animeLoader"
                        v-model="paginationNumber"
                        :length="paginationData.last_visible_page"
                        :total-visible="8"
                    ></v-pagination>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="animeRating" width="300px">
            <v-card class="pa-5">  
                <b>Rating Information</b>  <br/>
                G - All Ages <br/>
                PG - Children <br/>
                PG-13 - Teens 13 or older <br/>
                R - 17+ (violence & profanity) <br/>
                R+ - Mild Nudity <br/>
                Rx - Hentai

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
      return {

          //contain anime data from API
          animeData:[],

          //Loader state when API fetching
          animeLoader:false,

          animeRating:false,
          //current pagination
          paginationNumber:1,

          //current pagination status from API
          paginationData:{},

          //search field text field model
          searchKey:'',

          range:[0,10],

          showFilter:false,

          sortItems:['none','title','type','episodes','score','popularity','members','favorites'],
          
          ratingItems:['none','g','pg','pg13','r17','r','rx'],
          
          filter:{
            max_score:10,
            min_score:0,
            status:'',
            order_by:'none',
            sort:'asc',
            rating:'none'
          }
      }
  },
  created(){
      this.retrieveAnime()
  },
  methods:{

      //retrieve top anime
      retrieveAnime(event){

          //set loader status
          this.animeLoader = true

          //condition if retrieving on search active
          if(event=='search'){
              this.paginationNumber = 1
          }

          let search = ''
          console.log(this.searchKey)
          if(this.searchKey!==''){
              search = '&q='+this.searchKey
          }
          
          let max_score = ''
          console.log(this.searchKey)
          if(this.filter.max_score!==''){
            max_score = '&max_score='+this.filter.max_score
          }

          let min_score = ''
          if(this.filter.min_score!==''){
            min_score = '&min_score='+this.filter.min_score
          }

            let status = ''
            if(this.filter.status!==''){
                status = '&status='+this.filter.status
            }
            
            let order_by = ''
            if(this.filter.order_by!=='none'){
                order_by = '&order_by='+this.filter.order_by
            }
            
            let sort = ''
            if(this.filter.sort!==''){
                sort = '&sort='+this.filter.sort
            }

            let rating = ''
            if(this.filter.rating!==''){
                rating = '&rating='+this.filter.rating
            }

            console.log('https://api.jikan.moe/v4/anime?limit=12&page='+this.paginationNumber+search+max_score+min_score+status+order_by+sort + rating)
          axios.get('https://api.jikan.moe/v4/anime?limit=12&page='+this.paginationNumber+search+max_score+min_score+status+order_by+sort + rating)
              .then(res=>{
                  this.animeData = res.data.data
                  this.paginationData = res.data.pagination
                  console.log(this.paginationData)
                  console.log(this.animeData)
              })
              .finally(res=>{
                  this.animeLoader = false
              })
      },
      viewDetails(item){
        console.log(item)
        this.$router.push('/details/' + item.mal_id)
      },
      setMinMaxScore(){
        this.filter.min_score = this.range[0]
        this.filter.max_score = this.range[1]
        this.retrieveAnime()
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

<style scoped>
.filterItem{
    padding:20px;
    border:1px solid grey;
}
</style>