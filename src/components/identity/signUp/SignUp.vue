<template>
    <div class="sign-up">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
            <template v-slot:activator="{ on }">
                <!-- <v-icon v-on="on">mdi-account-plus</v-icon> -->
                <v-btn v-on="on" outlined>
                    <v-icon left>mdi-account-plus</v-icon>Sign up
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="sign-up-title">
                    <span class="headline">Sign up</span>
                </v-card-title>
                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="formValid"
                    >
                        <v-text-field
                            label="Name"
                            required
                            :rules="[validationRules.required]"
                            v-model="userDTO.Name"
                        ></v-text-field>
                        <v-text-field
                            label="Email"
                            required
                            :rules="[validationRules.required, validationRules.emailValidate]"
                            v-model="userDTO.Email"
                        ></v-text-field>
                        <v-text-field
                            label="Password"
                            type="password"
                            required
                            counter
                            :rules="[validationRules.required, validationRules.passwordLength]"
                            v-model="userDTO.Password"
                        ></v-text-field>
                        <v-text-field
                            label="Confirm Password"
                            type="password"
                            required
                            counter
                            :rules="[validationRules.required , validationRules.passwordConfirm]"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="sign-up-dialog-button" text @click="dialog = false">Close</v-btn>
                    <v-btn color="sign-up-dialog-button" text @click="signUpSubmit">Sign up</v-btn>
                </v-card-actions>
                </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import ServiceAgent from '../../../services/serviceAgent';
import UserDTO from '../../../objects/userDTO';

const serviceAgent = new ServiceAgent();

@Component
export default class SignUp extends Vue {
    @Prop() successSignInCallback!: Function;

    userDTO = new UserDTO();

    dialog = false;

    menu = false;

    formValid = false;

    validationRules = {
        required: (v: string) => !!v || 'Field is required',
        passwordConfirm: (v: string) => v === this.userDTO.Password || 'Passwords does not match',
        emailValidate: (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        passwordLength: (v: string) => v.length >= 8 || 'Password length shold be more then 8 characters',
    }

    async signUpSubmit() {
        (this.$refs.form as any).validate();
        if (!this.formValid) return;

        await serviceAgent.SignUp(this.userDTO);

        this.successSignInCallback();
        this.dialog = false;
    }
}
</script>

<style lang="scss">
    @use '../../../style/variables';

    .sign-up-title {
        background-color: variables.$additional-color;
    }

    .sign-up-dialog-button--text {
        color: variables.$additional-color !important;
    }
</style>
