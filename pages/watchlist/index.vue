<template>
    <div class="nverseContent pb-10 ">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-alert type="info" text class="mt-3">
                        Watchlist is <b>stored on your browser</b>. It will lost if you clear your browser cache. You can save it as a json file to use it again.
                    </v-alert>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="d-flex align-center justify-space-between " style="flex-flow:row wrap">
                    <div class="d-flex align-center justify-space-between" >
                        <h1>Watchlist</h1>
                    </div>
                    <div>
                        <v-btn class="primary" @click="addWatchListDialog=true"><v-icon small>mdi-plus</v-icon> New watchlist</v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row v-if="watchlistData.length==0">
                <v-col cols="12">
                    You have no watchlist. Please create a new one.
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col cols="12" v-for="item,index in watchlistData" :key="index">
                    <v-card class="pa-5">
                        <div class="d-flex justify-space-between" style="flex-flow:row wrap">
                            <h2>{{ item.name }}</h2>
                            <div>
                                <v-btn text>
                                    Edit
                                </v-btn>
                                <v-btn text @click="deleteWatchlist(index)">
                                    delete
                                </v-btn>
                            </div>
                        </div>
                        <v-divider class="my-3"></v-divider>
                        <div v-if="item.data.length==0">
                            Currently no item added to this group. Discover animes then add it here.
                        </div>
                        <template v-else>
                            <div v-for="itemAnime,indexAnime in item.data" :key="indexAnime+'anime'" class="watchlistItem ">
                                <div class="d-flex align-center justify-space-between" style="flex-flow:row wrap">
                                        <div class="watchlistItem__imagepreview mr-4">
                                            <v-img class="mr-4" :src="itemAnime.image" width="100px" style="flex-grow:0"></v-img>
                                        </div>
                                        <div class="my-3">
                                            <div class="watchlistItem__title">{{ itemAnime.title }}</div>
                                            <div class="watchlistItem__alternatives">{{ itemAnime.alternatives }}</div>
                                        </div>
                                    <div>
                                        <v-btn class="error">
                                            <v-icon >mdi-delete</v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="addWatchListDialog" width="300px">
            <v-card class="pa-5">
                Create a new watchlist
                <v-text-field dense label="Watchlist name" class="mt-4" hide-details v-model="newWatchlist" outlined></v-text-field>
                <div class="d-flex justify-end mt-2">
                    <v-btn class="green" :disabled="newWatchlist==''" small @click="createWatchlist(0)"><v-icon small>mdi-plus</v-icon>Add</v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            newWatchlist:'',
            addWatchListDialog:false,
            watchlistData:[
                {
                    name:'Watchlist Group 1',
                    data:[
                        {
                            mal_id:41467,
                            image:"https://cdn.myanimelist.net/images/anime/1764/126627t.jpg",
                            title:"Bleach: Sennen Kessen-hen",
                            alternatives:"Bleach: Sennen Kessen-hen , Bleach: Thousand-Year Blood War Arc , BLEACH 千年血戦篇 , Bleach: Thousand-Year Blood War"
                        },
                        {
                            mal_id:41467,
                            image:"https://cdn.myanimelist.net/images/anime/1764/126627t.jpg",
                            title:"Bleach: Sennen Kessen-hen",
                            alternatives:"Bleach: Sennen Kessen-hen , Bleach: Thousand-Year Blood War Arc , BLEACH 千年血戦篇 , Bleach: Thousand-Year Blood War"
                        },
                        {
                            mal_id:41467,
                            image:"https://cdn.myanimelist.net/images/anime/1764/126627t.jpg",
                            title:"Bleach: Sennen Kessen-hen",
                            alternatives:"Bleach: Sennen Kessen-hen , Bleach: Thousand-Year Blood War Arc , BLEACH 千年血戦篇 , Bleach: Thousand-Year Blood War"
                        }
                    ]
                }
            ]
        }
    },
    methods:{
        createWatchlist(){
            this.addWatchListDialog = false
            this.watchlistData.push({
                name:this.newWatchlist,
                data:[]
            })
            this.newWatchlist = ''
        },
        deleteWatchlist(index){
            console.log(index)
            this.watchlistData.splice(index, 1)
        }
    }
}
</script>

<style lang="scss">
.watchlistItem {
    .watchlistItem__title {
        font-size:1.5rem;
    }
    .watchlistItem__alternatives {
        font-size:  1rem;
    }
    .watchlistItem__number {
        padding:10px;
        font-size:1.3em;
        width:50px;
        height:50px;
        border-radius:100%;
        display:flex;
        align-items: center;
        justify-content: center;
    }
    .watchlistItem__imagepreview{
        width: 100px;
        height:100px;
        overflow:hidden;
    }
    border-bottom:1px solid grey;
    padding:10px;
    margin:15px 0;
    padding-bottom:20px;
}
</style>
