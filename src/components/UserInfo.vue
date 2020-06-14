<template>
    <div class="user-info">
        <div v-if="userId">
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
                            <span v-if="user">{{ user.Name }}</span>
                        </v-tooltip>
                    </div>
                </template>
                <v-card width="200" class="user-info-menu-items">
                    <v-list>
                        <user-settings :user="user" :logoutCallback="logOut"/>

                        <v-list-item @click="logOut">
                            <v-list-item-icon>
                                <v-icon>mdi-logout</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="'Sign out'" />
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item v-if="user && user.Role === 'Admin'">
                            <v-list-item-icon>
                                <v-icon>mdi-cogs</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <a href="/admin">Admin</a>
                                </v-list-item-title>
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
import { Watch } from 'vue-property-decorator';
import ServiceAgent from '../services/serviceAgent';
import GoogleAuthHelper from '@/helpers/GoogleAuthHelper';
import UserSettings from './UserSettings.vue';
import User from '@/objects/user';
import EventBus from '@/services/eventBus';

const serviceAgent = new ServiceAgent();
const googleAuthHelper = new GoogleAuthHelper();

@Component({
    components: {
        UserSettings,
    },
})
export default class UserInfo extends Vue {
    user: User | null = null;

    async logOut() {
        const self = this;
        EventBus.$emit('showLoader', true);

        if (this.isSignedInThroughGoogle) {
            await googleAuthHelper.GoogleLogout();
        }
        await serviceAgent.Logout();

        this.$store.dispatch('logout');
        this.$store.dispatch('clearStore');

        setTimeout(() => {
            EventBus.$emit('showLoader', false);
        }, 500);
    }

    get userId(): string {
        const result = this.$store.getters.userId;

        return result;
    }

    get isSignedInThroughGoogle() {
        const result = this.$store.getters.isSignedInThroughGoogle;

        return result;
    }

    created() {
        this.setUser();
    }

    async setUser() {
        if (!this.userId) return;

        const userInfoResponse = await serviceAgent.GetUserInfo(this.userId);
        this.user = new User(userInfoResponse.data);
    }

    @Watch('userId')
    async onUserIdChanged() {
        if (!this.userId) return;

        const userInfoResponse = await serviceAgent.GetUserInfo(this.userId);
        this.user = new User(userInfoResponse.data);
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
