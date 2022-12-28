<!-- details page -->

<template>
    <div class="nverseContent pb-10">
        <template v-if="!retrieveLoader">

            <!-- Masthead of anime -->
            <div class="animePreview">
                <div class="animePreview__darkoverlay d-flex">
                </div>
                <div class="animePreview__backdrop d-flex" :style="'background:url(' + animeData.images.jpg.image_url + ')'"
                    v-if="!retrieveLoader">
                </div>
                <div class="animePreview__img d-flex">
                    <img :src="animeData.images.jpg.image_url" />
                </div>
            </div>

            <!-- Detail Section -->
            <v-container class="animeDetail">
                <v-row>
                    <v-col cols="12" md="8">

                        <!-- title and information-->
                        <div class="mt-5 animeDetail__title">{{ animeData.title }}</div>
                        <div class="animeDetail__alternatives mt-2">
                            <b>Alternatives:</b>
                            <i v-for="item, index in animeData.titles" :key="index">
                                {{ item.title }} <span v-if="index != animeData.titles.length - 1">, </span>
                            </i>
                        </div>

                        <!-- Statisitc Information -->
                        <div class="statisticInfo d-flex mt-5">
                            <div class="statisticInfo__item" v-if="animeData.score !== null && animeData.score !== 0">
                                <div class="statisticInfo__item__scoretext">score</div>
                                <div class="statisticInfo__item__score">{{ animeData.score }}</div>
                                <div class="statisticInfo__item__users"> {{ numberWithCommas(animeData.scored_by) }} users
                                </div>
                            </div>
                            <div class="statisticInfo__item" v-if="animeData.rank != null && animeData.rank !== 0">
                                <div class="statisticInfo__item__scoretext">rank</div>
                                <div class="statisticInfo__item__score">#{{ animeData.rank }}</div>
                                <div class="statisticInfo__item__users"> </div>
                            </div>
                            <div class="statisticInfo__item"
                                v-if="animeData.popularity !== null && animeData.popularity !== 0">
                                <div class="statisticInfo__item__scoretext">popularity</div>
                                <div class="statisticInfo__item__score">#{{ animeData.popularity }}</div>
                                <div class="statisticInfo__item__users"> </div>
                            </div>
                            <div class="statisticInfo__item" v-if="animeData.members !== null && animeData.members !== 0">
                                <div class="statisticInfo__item__scoretext">members</div>
                                <div class="statisticInfo__item__members">{{ numberWithCommas(animeData.members) }}
                                </div>
                                <div class="statisticInfo__item__users"> </div>
                            </div>
                        </div>

                        <!-- Add to Watchlist Button -->
                        <div class="my-5">
                            <v-btn @click="addToWatchlist()" color="orange"
                                outlined><v-icon>mdi-bookmark-plus-outline</v-icon><b>ADD TO WATCHLIST</b></v-btn>
                        </div>

                        <v-divider class="my-3"></v-divider>

                        <!-- Synopsis Section -->
                        <div class="itemSection">
                            <div class="itemSection__title"><b>Synopsis</b></div>
                            <div class="itemSection__desc">{{ animeData.synopsis }}</div>

                        </div>

                        <!-- Background Section -->
                        <div class="itemSection mt-5" v-if="animeData.background !== null">
                            <div class="itemSection__title"><b>Background</b></div>
                            <div class="itemSection__desc">{{ animeData.background }}</div>
                        </div>

                    </v-col>

                    <v-col cols="12" md="4">

                        <!-- youtube video embed -->
                        <div class="mt-5" v-if="animeData.trailer.embed_url !== null">
                            <iframe width="100%" height="250px" :src="animeData.trailer.embed_url"
                                title="YouTube video player" frameborder="0"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                        </div>

                        <!-- official page button -->
                        <div class="my-3">
                            <v-btn block @click="goToLink(animeData.url)"><v-icon>mdi-link</v-icon>Visit Official
                                Page</v-btn>
                        </div>

                        <!-- Streamin services link -->
                        <div class="watchNow mt-5" v-if="animeData.streaming.length !== 0">

                            <div class="watchNow__title text-center">
                                Watch now on:
                            </div>

                            <div class="watchNow__item" @click="goToLink(item.url)"
                                v-for="item, index in animeData.streaming" :key="index">
                                <v-icon class="watchNow__item__icon yellow--text">mdi-play</v-icon> {{ item.name }}
                            </div>
                        </div>
                    </v-col>

                </v-row>
            </v-container>
        </template>

        <!-- skeleton loader if data is loading -->
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
    components: {
    },
    data() {
        return {
            
            // anime full data from /anime/{id}/full
            animeData: {},

            // loading when fetching data
            retrieveLoader: true,

            // status of empty dialog, if watchlist not found
            emptyDialog: false
        }
    },
    created() {
        
        // if no ID, back to landing page
        if (this.$route.params.id == undefined) {
            this.$router.push('/')
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        // retrieve data by ID
        this.retrieveAnimeFullById()
    },
    methods: {
        retrieveAnimeFullById() {

            // fetching full data by ID
            axios.get('https://api.jikan.moe/v4/anime/' + this.$route.params.id + '/full')
                .then(res => {
                    this.animeData = res.data.data
                    console.log(this.animeData)
                })
                .finally(res => {
                    this.retrieveLoader = false
                })
        },
        kFormatter(num) {

            // format big number to K
            return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
        },
        numberWithCommas(x) {
            
            // separating three digit wit commas
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        goToLink(url) {
            
            //open URL
            window.open(url, '_blank')
        },
        addToWatchlist() {
            
            // updateing watchlist data
            if (this.$store.state.store.WatchlistData.length == 0) {
                this.$store.commit('store/updateWatchlistEmptyDialog', true)
            } else {
                let watchlistAttributes = {
                    mal_id: this.animeData.mal_id,
                    title: this.animeData.title,
                    image: this.animeData.images.jpg.image_url,
                    alternatives: ''
                }
                this.animeData.titles.forEach((item, index) => {
                    watchlistAttributes.alternatives += item.title
                    if (index !== this.animeData.title.length - 1) {
                        watchlistAttributes.alternatives += ', '
                    }
                })
                this.$store.commit('store/addToWatchlist', watchlistAttributes)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.animeDetail {
    .animeDetail__title {
        font-size: 2.5rem;
        line-height: 1.1;
    }

    .animeDetail__alternatives {
        max-width: 500px;
        font-size: (0.8em);
    }
}

.itemSection {
    .itemSection__title {
        font-size: 1.4rem;
        border-bottom: 2px solid $outline-brown;
        padding-bottom: 5px;
        margin-bottom: 10px;
    }

    .itemSection__desc {
        font-size: 0.9rem;
    }
}

.animePreview {
    width: 100%;
    height: 350px;
    position: relative;
    display: flex;
    justify-content: center;
    overflow: hidden;

    .animePreview__backdrop {
        transform: scale(1.3);
        filter: blur(8px);
        width: 100%;
        height: 400px;
        background-size: cover !important;
    }

    .animePreview__darkoverlay {
        background-color: #000;
        position: absolute;
        z-index: 2;
        opacity: 0.6;
        top: 0;
        height: 350px;
        width: 100%;
    }

    .animePreview__img {
        position: absolute;
        z-index: 2;
        top: 0;
        height: 100%;
    }

}

.statisticInfo {
    .statisticInfo__item {
        .statisticInfo__item__score {
            font-size: 2rem;
        }

        .statisticInfo__item__scoretext {
            background-color: #472D0F;
            width: 100%;
            text-align: center;
            padding: 2px;
            border-radius: 2px;
            color: #fff;
        }

        .statisticInfo__item__users {
            font-size: 0.7rem;
            margin-bottom: 2px;
        }

        .statisticInfo__item__members {
            font-size: 1rem;
            margin-bottom: 2px;
        }

        div {
            line-height: 1;
        }

        flex-flow:column;
        display:flex;
        align-items:center;
        justify-content:space-between;
        height:80px;
        padding:5px;
        border:1px solid #7D490C;
        background: rgba(255, 138, 0, 0.1);

        flex-grow:1;
    }

    -webkit-transform-origin-x: 0;
    width:100%;
    flex-flow:row wrap;
}

.watchNow {

    .watchNow__title {
        font-weight: bold;
        padding: 10px;
    }

    .watchNow__item {
        &:hover {
            .watchNow__item__icon {
                font-size: 1rem;
            }
        }

        cursor:pointer;
        padding:10px;
        border:1px solid grey;
        transition:0.3s;
    }

    .watchNow__item__icon {
        font-size: 0;
        transition: 0.3s;
    }
}


@media only screen and (max-width: 600px) {
    .animeDetail {
        .animeDetail__title {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
    }
}
</style>