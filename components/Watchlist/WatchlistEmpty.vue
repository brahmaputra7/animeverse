<template>
    <v-dialog v-model="emptyDialog" width="300">
        <v-card class="pa-5 text-center">
            <div>You have no watchlist.</div>
            <v-btn outlined class="primary mt-5"  @click="createWatchlist()">CREATE A WATCHLIST</v-btn>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props:['dialog'],
    data(){
        return{
            emptyDialog:false
        }
    },
    methods:{
        createWatchlist(){
            this.emptyDialog = false
            this.$router.push('/watchlist')
        }
    },
    watch:{
        '$store.state.store.WatchlistEmptyDialog'(newV,oldV){
            this.emptyDialog = true
        }
    }
}
</script>
