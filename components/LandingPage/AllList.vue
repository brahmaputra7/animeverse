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
                            <v-text-field label="Find your favorite anime here..." dense outlined rounded prepend-inner-icon="mdi-magnify" @keyup.enter="retrieveAnime('search')" v-model="searchKey"></v-text-field>
                        </div>
                    </v-col>
                </v-row>
            <v-row>
            
                
            <!-- Populate: Anime Data-->
            <template v-if="!animeLoader">
                <v-col cols="6" sm="3" md="2" v-for="item,index in animeData" :key="index"  @click="viewDetails(item)">
                    <div class="animeCard mb-10">
                        
                        <div class="animeCard__score d-flex align-center px-1">
                                <v-icon x-small class="mr-1 yellow--text" v-if="item.score < 7">mdi-star-half-full</v-icon>
                                <v-icon x-small class="mr-1 yellow--text" v-else>mdi-star</v-icon>
                                {{ item.score }}
                            </div>

                        <v-img
                            lazy-src="https://picsum.photos/id/11/10/6"
                            height="250"
                            width="100%"
                            :src="item.images.jpg.image_url"
                        ></v-img>
                        <div class="animeCard__text mt-1">
                            <div class="animeCard__text__add mb-2">
                               <v-btn block x-small class="green" text><v-icon x-small>mdi-plus</v-icon> ADD TO WATCHLIST</v-btn>
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

          
          //current pagination
          paginationNumber:1,

          //current pagination status from API
          paginationData:{},

          //search field text field model
          searchKey:''
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

          axios.get('https://api.jikan.moe/v4/anime?limit=12&page='+this.paginationNumber+search)
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
      }
  },
  watch:{
      paginationNumber(newV){
          this.retrieveAnime()
      }
  }
}
</script>