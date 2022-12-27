<!-- Master Head -->

<template>
    <v-container>
        <div class="mastHead pa-10 mt-3 rounded-lg">
                <div class="d-flex align-center justify-center" style="flex-flow:row wrap">
                    <div class="mr-10">
                        <img class="mastHead__img" src="/img/dino.png" width="300px" />
                    </div>
                    <div>
                        <div style="font-size:1.8rem">Welcome to animeverse!</div>
                        <div>Discover anime, create a watchlist, and enjoy your holliday season.</div>
                        <div class="mt-3">
                            <v-btn rounded outlined dark>Set Up your Watchlist<v-icon>mdi-arrow-right</v-icon></v-btn>
                        </div>
                    </div>
                </div>
        </div>
    </v-container>
</template>

<style lang="scss" scoped>
.mastHead {
    .mastHead__img {
        transform:scaleX(-1);
    }
    background: linear-gradient(90.91deg, #6AAEFF 4.91%, #611BA7 86.42%);
    color:#fff;
}
</style>