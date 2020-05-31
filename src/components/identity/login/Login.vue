<template>
    <div class="login">
        <!-- <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" outlined>
                    <v-icon left>mdi-login</v-icon>Login
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="login-title">
                    <span class="headline">Login</span>
                </v-card-title>
                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="formValid"
                    >
                        <v-text-field label="Email"
                            required
                            v-model="email"
                            :rules="[v => !!v || 'Field is required']"
                        ></v-text-field>
                        <v-text-field
                            label="Password"
                            type="password"
                            :rules="[v => !!v || 'Field is required']"
                            required
                            v-model="password"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="login-dialog-button" text @click="dialog = false">Close</v-btn>
                    <v-btn color="login-dialog-button" text @click="loginSubmit">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->

        <v-form
            ref="form"
            v-model="formValid"
        >
            <v-text-field label="Email"
                outlined
                required
                v-model="email"
                :rules="[validationRules.required, validationRules.emailValidate]"
            ></v-text-field>
            <v-text-field
                outlined
                label="Password"
                type="password"
                :rules="[validationRules.required]"
                required
                v-model="password"
            ></v-text-field>
        </v-form>
        <v-btn outlined @click="loginSubmit">
            <v-icon left>mdi-login</v-icon>Submit
        </v-btn>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import ServiceAgent from '../../../services/serviceAgent';
import GooglAuthHelper from '@/helpers/GoogleAuthHelper';

const serviceAgent = new ServiceAgent();
const googlAuthHelper = new GooglAuthHelper();

@Component
export default class Login extends Vue {
    @Prop() successSignInCallback!: Function;

    email = '';

    password = '';

    response= '';

    dialog = false;

    inProgress = false;

    formValid = false;

    validationRules = {
        required: (v: any) => !!v || 'Field is required',
        emailValidate: (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    }

    async loginSubmit() {
        (this.$refs.form as any).validate();
        if (!this.formValid) return;
        this.$store.dispatch('showLoader', true);

        await serviceAgent.Login(this.email, this.password);

        this.successSignInCallback();
    }
}
</script>

<style lang="scss">
    @use '../../../style/variables';

    .login {
        width: 100%;

        .login-title {
            background-color: variables.$additional-color;
        }

        .login-dialog-button--text {
            color: variables.$additional-color !important;
        }

        .v-input {
            fieldset {
                color: variables.$fonts-color !important;
            }
            .v-label {
                color: variables.$fonts-color !important;
            }

            .v-text-field__slot {
                background-color: none;
            }

            input {
                font-size: 16px;
                color: variables.$fonts-color !important;
            }
            input[type="password"] {
                color: variables.$fonts-color !important;
            }
        }
    }
</style>
