<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <div v-on="on">
                <v-dialog
                    class="sign-up"
                    v-model="dialog"
                    persistent
                    max-width="600px"
                >
                    <template v-slot:activator="{ on }">
                        <v-icon dark v-on="on">mdi-account-plus</v-icon>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Sign up</span>
                        </v-card-title>
                        <v-card-text>
                            <v-text-field
                                label="Name*"
                                required
                                v-model="userDTO.Name"
                            ></v-text-field>
                            <v-text-field
                                label="Email*"
                                required
                                v-model="userDTO.Email"
                            ></v-text-field>
                            <v-text-field
                                label="Password*"
                                type="password"
                                required
                                v-model="userDTO.Password"
                            ></v-text-field>
                            <v-menu
                                v-model="menu"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="userDTO.DateOfBirth"
                                        label="Date of birth"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="userDTO.DateOfBirth" no-title scrollable>
                                <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="signUpSubmit">Sign up</v-btn>
                        </v-card-actions>
                        </v-card>
                </v-dialog>
            </div>
        </template>
        <span>Sign up</span>
    </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ServiceAgent from '../../../services/serviceAgent';
import UserDTO from '../../../objects/userDTO';

const serviceAgent = new ServiceAgent();

@Component
export default class SignUp extends Vue {
    public userDTO = new UserDTO();

    public dialog = false;

    public menu = false;

    async signUpSubmit() {
        await serviceAgent.SignUp(this.userDTO);

        this.$store.dispatch('setUserIdentity');
        this.dialog = false;
    }
}
</script>

<style>

</style>
