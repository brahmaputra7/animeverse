<template>
    <div class="nverseContent">
        <div  class="animePreview">
            <div class="animePreview__darkoverlay d-flex">
            </div>
            <div class="animePreview__backdrop d-flex" :style="'background:url('+animeData.images.jpg.image_url+')'" v-if="!retrieveLoader">
            </div>
            <div class="animePreview__img d-flex"  v-if="!retrieveLoader">
                <img :src="animeData.images.jpg.image_url"/>
            </div>
        </div>
        <v-container class="animeDetail">
            <v-row>
                <v-col cols="12" md="9">
                    <div class="animeDetail__title">{{ animeData.title }}</div>
                    <div>{{ animeData.synopsis }}</div>
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
            animeData:{},
            retrieveLoader:true
        }
    },
    created(){
        console.log(this.$route.params)
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .animeDetail {
        .animeDetail__title {
            font-size:2.5rem;
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
</style>