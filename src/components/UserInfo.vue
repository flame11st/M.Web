<template>
    <div class="user-info" dark>
        <div v-if="userName">
            <div class="avatar">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-avatar v-on="on">
                            <img src="https://randomuser.me/api/portraits/women/81.jpg">
                        </v-avatar>
                    </template>
                    <span>{{ userName }}</span>
                </v-tooltip>
            </div>

            <div class="icons">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon dark @click="logOut" v-on="on">mdi-logout</v-icon>
                    </template>
                <span>Logout</span>
            </v-tooltip>
            </div>
        </div>

        <div v-else>
            <div class="avatar">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-avatar color="blue" v-on="on">
                            <v-icon dark>mdi-account-circle</v-icon>
                        </v-avatar>
                    </template>
                    <span>Guest</span>
                </v-tooltip>
            </div>
            <div class="icons">
                <login />
                <sign-up />
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Login from './identity/login/Login.vue';
import SignUp from './identity/signUp/SignUp.vue';
import ServiceAgent from '../services/serviceAgent';

const serviceAgent = new ServiceAgent();

@Component({
    components: {
        Login,
        SignUp,
    },
})
export default class UserInfo extends Vue {
    async logOut() {
        await serviceAgent.Logout();

        this.$store.dispatch('logout');
        window.location.replace('/');
    }

    get userName() {
        const result = this.$store.state.userName;

        return result;
    }
}
</script>

<style>
    .user-info {
        padding: 10px;
    }

    .user-info > div {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .icons {
        display: grid;
        justify-self: start;
        align-content: center;
        grid-auto-flow: column;
    }

    .icons i {
        margin-right: 10px;
        font-size: 35px !important;
    }

    .avatar {
        justify-self: center;
    }
</style>
