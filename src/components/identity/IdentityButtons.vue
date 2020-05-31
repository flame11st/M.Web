<template>
    <div class="identity-buttons">
        <login :successSignInCallback="setUserData" />

        <v-divider dark />
        Other options
        <div class="other-options">
            <sign-up :successSignInCallback="setUserData" class="sign-up-component"/>
            <google-sign-in :successSignInCallback="setUserData" class="google-sign-in-component"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Login from './login/Login.vue';
import SignUp from './signUp/SignUp.vue';
import GoogleSignIn from './googleSignIn/GoogleSignIn.vue';

@Component({
    components: {
        Login,
        SignUp,
        GoogleSignIn,
    },
})
export default class IdentityButtons extends Vue {
    setUserData() {
        const self = this;
        this.$store.dispatch('setUserIdentity');
        this.$store.dispatch('setUserMovies');

        setTimeout(() => {
            self.$store.dispatch('showLoader', false);
        }, 1000);
    }
}
</script>

<style lang="scss">
    @use '../../style/variables';

    .identity-buttons {
        display: grid;
        justify-items: center;
        justify-self: center;
        align-items: center;
        width: 60%;

        button.v-btn {
            color: variables.$fonts-color;
        }

        .other-options {
            display: grid;
            width: 100%;
            grid-auto-flow: column;
            justify-items: center;
            padding-top: 10px;

            .sign-up-component {
                justify-self: start;
            }

            .google-sign-in-component {
                justify-self: end;
            }
        }

        .v-divider {
            width: 100%;
            margin: 20px 0 0;
        }
    }
</style>
