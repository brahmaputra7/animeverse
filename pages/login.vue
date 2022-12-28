<template>
    <div class="login">
        <v-card class="pa-10">
            <div>
                <v-text-field v-model="sendData.email"></v-text-field>
            </div>
            <div>
                <v-text-field v-model="sendData.password"></v-text-field>
            </div>
            <div>
                <v-btn @click="login()">login</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            sendData: {
                email:'',
                password:''
            }
        }
    },
    methods:{
        login(){
            console.log("login")    
            axios(
                {
                    url:'https://x8ki-letl-twmt.n7.xano.io/api:y2cVQN0H/auth/login',
                    method:'post',
                    data:{
                        email:this.sendData.email,
                        password:this.sendData.password
                    }
                }
            ).then(res=>{
                console.log(res)

                axios(
                    {
                        url:'https://x8ki-letl-twmt.n7.xano.io/api:y2cVQN0H/auth/login',
                        method:'post',
                        data:{
                            email:this.sendData.email,
                            password:this.sendData.password
                        }
                    }
                ).then(res=>{
                    console.log(res)
                })
                
            })
        }
    }
}
</script>

<style lang="scss">
    .login {
        .v-card {
            width:300px;
            height:350px;
        }
        height:100vh;
        width:100%;
        position:absolute;
        top:0;
        left:0;
        z-index:20;
        background: linear-gradient(90.91deg, #6AAEFF 4.91%, #611BA7 86.42%);
        display:flex;
        align-items: center;
        justify-content: center;
    }
</style>
