<template>
    <div class="nverseContent">
        <template v-if="!retrieveLoader">
        <div  class="animePreview">
            <div class="animePreview__darkoverlay d-flex">
            </div>
            <div class="animePreview__backdrop d-flex" :style="'background:url('+animeData.images.jpg.image_url+')'" v-if="!retrieveLoader">
            </div>
            <div class="animePreview__img d-flex"  >
                <img :src="animeData.images.jpg.image_url"/>
            </div>
        </div>
        <v-container class="animeDetail">
            <v-row>
                <v-col cols="12" md="8">
                    
                    <div class="animeDetail__title">{{ animeData.title }}</div>
                    <div class="d-flex align-center" style="flex-flow:row wrap">
                        <div>
                            <v-icon small class="mr-1">mdi-star</v-icon>{{ animeData.score }}/10 <b class="ml-1"> ({{ kFormatter(animeData.scored_by) }})</b>
                        </div>
                    </div>
                    <div class="my-5">
                        <v-btn color="orange" outlined><v-icon>mdi-bookmark-plus-outline</v-icon><b>ADD TO WATCHLIST</b></v-btn>
                    </div>
                    <div class="animeDetail__desc">{{ animeData.synopsis }}</div>
                    <v-btn class="mt-2" x-small rounded outlined>READ MORE</v-btn>
                    
                </v-col>
                <v-col cols="12" md="4">
                    <iframe width="100%" height="250px" :src="animeData.trailer.embed_url" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </v-col>
            </v-row>
        </v-container>
        </template>
        <template v-else>
            <v-skeleton-loader type="image,image">

            </v-skeleton-loader>
            <v-container>
                
            <v-skeleton-loader type="title,paragraph,image,table">

            </v-skeleton-loader>
            </v-container>
        </template>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            animeData:{},
            retrieveLoader:true
        }
    },
    created(){
        console.log(this.$route.params)
      document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.retrieveAnimeFullById()
    },
    methods:{
        retrieveAnimeFullById(){
            axios.get('https://api.jikan.moe/v4/anime/'+this.$route.params.id+'/full')
              .then(res=>{
                this.animeData = res.data.data
                console.log(this.animeData)
              })
              .finally(res=>{
                this.retrieveLoader = false
              })
        },
        kFormatter(num) {
            return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
        }
    }
}
</script>

<style lang="scss" scoped>
    .animeDetail {
        .animeDetail__title {
            font-size:2.5rem;
                line-height: 1.1;
        }
        .animeDetail__desc {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;;
        }
    }

    .animePreview {
        width:100%;
        height:350px;
        position:relative;
        display:flex;
        justify-content: center;
        overflow: hidden;
        .animePreview__backdrop {
            transform:scale(1.3);
            filter:blur(8px);
            width:100%;
            height:400px;
            background-size: cover !important;
        }
        .animePreview__darkoverlay {
            background-color:#000;
            position:absolute;
            z-index:2;
            opacity:0.6;
            top:0;
            height:350px;
            width:100%;
        }
        .animePreview__img {
            position:absolute;
            z-index:2;
            top:0;
            height:100%;
        }
        
    }

    @media only screen and (max-width: 600px) {
        .animeDetail {      
            .animeDetail__title {
                font-size:1.2rem;
                font-weight: bold;
                margin-bottom:10px;
            }
        }
    }
</style>