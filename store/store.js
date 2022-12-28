export const state = () => ({
    WatchlistData:[],
    WatchlistDataUpdated:false,
    WatchlistEmptyDialog:false,
    WatchlistDataAdd:{},
    WatchlistDataAddUpdated:false
})

export const mutations = {
    updateWatchlistData(state,payload){
        console.log("asd")
        state.WatchlistData = payload
        state.WatchlistDataUpdated = !state.WatchlistDataUpdated
        localStorage.WatchlistData = JSON.stringify(payload)
    },
    updateWatchlistEmptyDialog(state,payload){
        state.WatchlistEmptyDialog = !state.WatchlistEmptyDialog
        console.log("asd")
    },
    addToWatchlist(state, payload){
        state.WatchlistDataAdd = payload
        state.WatchlistDataAddUpdated =  !state.WatchlistDataAddUpdated
    }
}