<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <div v-on="on">
                <v-dialog
                    class="login"
                    v-model="dialog"
                    persistent
                    max-width="600px"
                >
                    <template v-slot:activator="{ on }">
                        <v-icon dark v-on="on">mdi-login</v-icon>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Login</span>
                        </v-card-title>
                        <v-card-text>
                            <v-text-field label="Email*" required v-model="email"></v-text-field>
                            <v-text-field
                                label="Password*"
                                type="password"
                                required
                                v-model="password"
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="loginSubmit">Login</v-btn>
                        </v-card-actions>
                        </v-card>
                </v-dialog>
            </div>
        </template>
        <span>Login</span>
    </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ServiceAgent from '../../../services/serviceAgent';

const serviceAgent = new ServiceAgent();

@Component
export default class Login extends Vue {
    public email = '';

    public password = '';

    public response= '';

    public dialog = false;

    public inProgress = false;

    async loginSubmit() {
        await serviceAgent.Login(this.email, this.password);

        this.$store.dispatch('setUserIdentity');
        this.dialog = false;
    }
}
</script>

<style scoped>
</style>
