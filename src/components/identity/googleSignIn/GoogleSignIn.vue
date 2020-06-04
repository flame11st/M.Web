<template>
    <div class="google-sign-in">
        <v-btn ref="googleButton" @click="googleLogin" outlined>
            <v-icon left>mdi-google</v-icon>Google
        </v-btn>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import ServiceAgent from '../../../services/serviceAgent';
import GooglAuthHelper from '@/helpers/GoogleAuthHelper';
import EventBus from '@/services/eventBus';

const serviceAgent = new ServiceAgent();
const googlAuthHelper = new GooglAuthHelper();

@Component
export default class GoogleLogin extends Vue {
    @Prop() successSignInCallback!: Function;

    async googleAuthCallback(googleUser: any) {
        EventBus.$emit('showLoader', true);
        await serviceAgent.GoogleLogin(googleUser.getAuthResponse().id_token);

        this.$store.dispatch('setIsSignedInThroughGoogle', true);

        this.successSignInCallback();
    }

    googleLogin() {
        googlAuthHelper.GoogleLogin(this.googleAuthCallback);
    }
}
</script>
