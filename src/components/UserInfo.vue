<template>
    <div class="user-info">
        <div v-if="userName">
            <v-menu
                transition="slide-y-transition"
                bottom
                offset-y
                content-class="mt-3"
            >
                <template v-slot:activator="{ on }">
                    <div class="avatar" v-on="on">
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-avatar v-on="on">
                                    <v-icon>mdi-account</v-icon>
                                </v-avatar>
                            </template>
                            <span>{{ userName }}</span>
                        </v-tooltip>
                    </div>
                </template>
                <v-card width="200" class="user-info-menu-items">
                    <v-list>
                        <user-settings />
                        <v-list-item @click="logOut">
                            <v-list-item-icon>
                                <v-icon>mdi-logout</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="'Sign out'" />
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ServiceAgent from '../services/serviceAgent';
import GoogleAuthHelper from '@/helpers/GoogleAuthHelper';
import UserSettings from './UserSettings.vue';

const serviceAgent = new ServiceAgent();
const googleAuthHelper = new GoogleAuthHelper();

@Component({
    components: {
        UserSettings,
    },
})
export default class UserInfo extends Vue {
    async logOut() {
        const self = this;
        this.$store.dispatch('showLoader', true);

        if (this.isSignedInThroughGoogle) {
            await googleAuthHelper.GoogleLogout();
        }
        await serviceAgent.Logout();

        this.$store.dispatch('logout');
        this.$store.dispatch('clearStore');

        setTimeout(() => {
            self.$store.dispatch('showLoader', false);
        }, 500);
    }

    get userName(): string {
        const result = this.$store.getters.userName;

        return result;
    }

    get isSignedInThroughGoogle() {
        const result = this.$store.getters.isSignedInThroughGoogle;

        return result;
    }
}
</script>

<style lang="scss">
    @use '../style/variables';

    .user-info {
        align-items: center;
        justify-items: center;
        display: grid;
        max-height: 80px;

        :hover {
            cursor: pointer;
        }

        > div {
            .avatar {
                .v-avatar {
                    background-color: variables.$additional-color;
                }
            }
        }
    }
</style>
