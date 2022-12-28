<template>
    <v-footer
    padless
  >
        <v-card
        text
        tile
        class="text-center"
        width="100%"
        >
        <v-card-text>
            <v-btn
            v-for="item,index in icons"
            :key="index"
            class="mx-4"
            icon
            >
            <v-icon size="24px" @click="goToLink(item.link)">
                {{ item.icon }}
            </v-icon>
            </v-btn>
        </v-card-text>
        

        <v-divider></v-divider>

        <v-card-text>
            {{ new Date().getFullYear() }} — <strong>Amartha Front-End Engineer Candidate - Brahma Putra</strong>
        </v-card-text>
        </v-card>
  </v-footer>
</template>

<script>
export default {
    data(){
        return {
            icons:[
                {
                    icon:'mdi-linkedin',
                    link:'https://www.linkedin.com/in/brahmaputra7/'
                },
                {
                    icon:'mdi-github',
                    link:'https://github.com/brahmaputra7'
                },
                {
                    icon:'mdi-web',
                    link:'https://brahmaptr.com'
                },
                {
                    icon:'mdi-code-tags',
                    link:'https://github.com/brahmaputra7/animeverse'
                }
            ]
        }
    },
    methods:{
        goToLink(url){
            console.log(url)
            window.open(url, '_blank')
        }
    }

    }

</script>
