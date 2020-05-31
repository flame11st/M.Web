<template>
    <div class="user-settings">
        <v-dialog
            v-model="settingsDialog"
            persistent
            max-width="600px"
        >
            <template v-slot:activator="{ on }">
                <v-list-item @click="clicked" v-on="on">
                    <v-list-item-icon>
                        <v-icon>mdi-account-cog</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="'Settings'" />
                    </v-list-item-content>
                </v-list-item>
            </template>
            <v-card>
                <v-card-title class="user-settings-title">
                    <span class="headline">Settings</span>
                </v-card-title>
                <v-card-text>
                    Change name
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="sign-up-dialog-button" text @click="settingsDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class UserSettings extends Vue {
    settingsDialog = false;

    clicked() {
        this.settingsDialog = true;
        debugger;
    }
}
</script>
