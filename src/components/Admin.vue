<template>
    <div class="admin">
        <v-card class="job-manager">
            <v-list>
                <v-subheader>Job manager commands</v-subheader>
                <v-divider />
                <template v-for="(command, index) in commands">
                    <v-list-item  :key="command">
                        <template>
                            <v-list-item-content>
                                <div class="job-manager-command-name">{{ command }}</div>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-btn icon @click="runCommand(command)">
                                    <v-icon color="green">mdi-play</v-icon>
                                </v-btn>
                            </v-list-item-icon>
                        </template>
                    </v-list-item>
                    <v-divider :key="index" v-if="index !== commands.length - 1"/>
                </template>
            </v-list>
        </v-card>

        <v-card class="upload-imdb-rating">
            <span> Update imdb rating from file </span>
            <template>
                <v-file-input v-model="ratingFile" multiple label="File input"></v-file-input>
            </template>
            <v-btn color="green" @click="updateImdbRatings">Update</v-btn>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ServiceAgent from '@/services/serviceAgent';
import EventBus from '@/services/eventBus';

const serviceAgent = new ServiceAgent();

@Component
export default class Admin extends Vue {
    commands: string[] = [];

    ratingFile: any = [];

    async mounted() {
        const commandsResponse = await serviceAgent.GetAllJobManagerCommands();
        this.commands = commandsResponse.data;
    }

    runCommand(command: string) {
        serviceAgent.RunCommand(command);
        EventBus.$emit('openSnackbar', { snackbarText: `Command ${command} runned`, snackbarSuccess: true });
    }

    updateImdbRatings() {
        const formData = new FormData();
        formData.append('files', this.ratingFile[0], 'imdbRating');
        serviceAgent.UpdateImdbRatingsFromFile(formData);

        EventBus.$emit('openSnackbar', { snackbarText: 'Update Imdb rating started', snackbarSuccess: true });
    }
}
</script>

<style lang="scss">
    .admin {
        padding: 40px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;


        .job-manager {
            .v-list-item {
                .v-list-item__icon {
                    margin: 0 !important;
                    align-self: center;
                }
            }
        }

        .upload-imdb-rating {
            padding: 20px;
            height: fit-content;
        }
    }

</style>
