<!-- Add to Watchlist Dialog -->

<template>
    <v-dialog v-model="addDialog" width="300">
        <v-card class="pa-5 text-center">
            <div  class="d-flex justify-end"><v-icon small @click="addDialog=false">mdi-close</v-icon></div>
            Select watchlist:
            <div>
                <template>
                    <div  v-for="item,index in watchlistData" @click="updateWatchlistData(index)"  :key="index">
                        <v-btn block :disabled="checkIfExist(index)" class="primary my-2 rounded-lg pa-2" style="height:auto">
                            <span class="text-wrap" v-if="checkIfExist(index)" style="max-width:250px">Added to: {{ item.name }}</span>
                            <span class="text-wrap" v-else  style="max-width:250px">{{item.name }}</span>
                        </v-btn>
                    </div>
                </template>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props:['dialog'],
    data(){
        return{

            //status of dialog active
            addDialog:false,

            //current watchlist data, contain name and items
            watchlistData:[],

            //current active data to add
            watchlistDataToAdd:{}
        }
    },
    methods:{
        createWatchlist(){

            //push to watchlist creation if no watchlist found
            this.emptyDialog = false
            this.$router.push('/watchlist')
        },
        checkIfExist(val){

            //checking if the item exist, by mal_id
            let found = false
            this.watchlistData[val].data.forEach((item,index)=>{
                if(item.mal_id==this.watchlistDataToAdd.mal_id){
                    found=true
                }
            })
            if(found){
                return true
            }else{
                return false
            }
        },
        updateWatchlistData(index){

            //updating watchlis tdata
            this.watchlistData[index].data.push(this.watchlistDataToAdd)

            let watchlistData = JSON.parse(JSON.stringify(this.watchlistData))
            this.$store.commit('store/updateWatchlistData', watchlistData)
        }
    },
    watch:{
        '$store.state.store.WatchlistDataAddUpdated'(newV,oldV){
            
            //listening to State change
            this.addDialog = true
            this.watchlistData = JSON.parse(JSON.stringify(this.$store.state.store.WatchlistData))
            this.watchlistDataToAdd = JSON.parse(JSON.stringify(this.$store.state.store.WatchlistDataAdd))
        }
    }
}
</script>

<style scoped>  
</style>