<template>
    <div class="user-settings">
        <v-dialog
            v-model="settingsDialog"
            persistent
            max-width="700px"
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
            <v-card class="user-settings-card" v-if="user !== null">
                <v-card-title class="user-settings-title">
                    <span class="headline">Settings</span>
                </v-card-title>
                <v-card-text>
                    <div class="user-settings-field user-settings-field-v-text">
                        <span>Name:</span>
                        <v-form v-model="nameValid">
                            <v-text-field
                                v-model="user.Name"
                                outlined
                                dense
                                :rules="[validationRules.required]"
                            ></v-text-field>
                        </v-form>
                        <v-btn
                            text
                            :disabled="!nameChanged || !nameValid"
                            color="green"
                            @click="changeName"
                        >Change name</v-btn>
                    </div>

                    <v-divider />

                    <div class="user-settings-field user-settings-field-v-text">
                        <span>Email:</span>
                        <v-form v-model="emailValid">
                            <v-text-field
                                v-model="user.Email"
                                outlined
                                dense
                                :rules="[validationRules.required, validationRules.emailValidate]"
                                :readonly="isSignedInThroughGoogle"
                            ></v-text-field>
                        </v-form>
                        <v-btn
                            v-if="!isSignedInThroughGoogle"
                            text :disabled="!emailChanged || !emailValid"
                            color="green"
                            @click="changeEmail"
                        >Change email</v-btn>
                    </div>

                    <v-divider />

                    <div class="user-settings-field">
                        <span>User movies count:</span>
                        <span v-text="userMoviesCount"></span>
                        <v-btn text :disabled="userMoviesCount === 0" @click="clearUserMovies">Clear all</v-btn>
                    </div>

                    <v-divider />

                    <div class="user-settings-field change-password-area" v-if="!isSignedInThroughGoogle">
                        <v-btn
                            @click="showChangePassword = !showChangePassword"
                            outlined
                        >Change Password</v-btn>

                        <v-expand-transition>
                            <div class="user-settings-field-change-password" v-show="showChangePassword">
                                <v-form v-model="formValid">
                                    <v-text-field
                                        label="Old Password"
                                        type="password"
                                        required
                                        counter
                                        :rules="[validationRules.required, validationRules.passwordLength]"
                                        v-model="oldPassword"
                                    ></v-text-field>

                                    <v-text-field
                                        label="Password"
                                        type="password"
                                        required
                                        counter
                                        :rules="[validationRules.required, validationRules.passwordLength]"
                                        v-model="newPassword"
                                    ></v-text-field>

                                    <v-text-field
                                        label="Confirm Password"
                                        type="password"
                                        required
                                        counter
                                        :rules="[validationRules.required , validationRules.passwordConfirm]"
                                    ></v-text-field>
                                </v-form>
                            </div>
                        </v-expand-transition>
                        <v-btn
                            outlined
                            color="green"
                            :disabled="!formValid"
                            v-show="showChangePassword"
                            @click="changeUserPassword"
                        >Submit</v-btn>
                    </div>

                    <v-divider />

                    <div class="user-settings-field">
                        <v-btn outlined color="red" @click="removeUserSectionVisible = !removeUserSectionVisible">Remove user</v-btn>

                        <v-slide-x-transition>
                            <span v-show="removeUserSectionVisible">Are you really want to remove your user?</span>
                        </v-slide-x-transition>

                        <v-slide-x-transition>
                            <div class="user-settings-field-remove-buttons" v-show="removeUserSectionVisible">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" fab dark small color="red" @click="deleteUser">
                                            <v-icon>mdi-check-bold</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Yes, delete user</span>
                                </v-tooltip>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" fab dark small color="green" @click="removeUserSectionVisible = false">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Cancel</span>
                                </v-tooltip>
                            </div>
                        </v-slide-x-transition>
                    </div>

                    <v-divider />
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="user-settings-dialog-button"
                        text
                        @click="settingsDialog = false"
                    >Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';
import User from '@/objects/user';
import ServiceAgent from '../services/serviceAgent';
import EventBus from '@/services/eventBus';

const serviceAgent = new ServiceAgent();

@Component
export default class UserSettings extends Vue {
    @Prop() user!: User;

    @Prop() logoutCallback!: Function;

    settingsDialog = false;

    removeUserSectionVisible = false;

    nameChanged = false;

    emailChanged = false;

    initialName = '';

    initialEmail = '';

    oldPassword = '';

    newPassword = '';

    formValid = false;

    nameValid = false;

    emailValid = false;

    showChangePassword = false;

    validationRules = {
        required: (v: string) => !!v || 'Field is required',
        passwordConfirm: (v: string) => this.validateConfirmPassword(v) || 'Passwords does not match',
        emailValidate: (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        passwordLength: (v: string) => v.length >= 8 || 'Password length shold be more then 8 characters',
    }

    validateConfirmPassword(password: string) {
        return this.newPassword === password;
    }

    mounted() {
        this.initialEmail = this.user.Email;
        this.initialName = this.user.Name;
    }

    get userId(): string {
        const result = this.$store.getters.userId;

        return result;
    }

    get isSignedInThroughGoogle() {
        const result = this.$store.getters.isSignedInThroughGoogle;

        return result;
    }

    get currentUserName(): string {
        const result = this.$store.getters.userName;

        return result;
    }

    get userMoviesCount(): string {
        const result = this.$store.getters.userMoviesCount;

        return result;
    }

    changeName() {
        this.saveChanges('Name');
    }

    changeEmail() {
        this.saveChanges('Email');
    }

    private saveChanges(field: string) {
        const self = this;

        if (this.user !== null) {
            serviceAgent.ChangeUserInfo(this.user).then(() => {
                EventBus.$emit('openSnackbar', { snackbarText: `${field} succesfully changed`, snackbarSuccess: true });

                self.initialName = this.user.Name;
                self.initialEmail = this.user.Email;

                this.checkFieldsChanged();
            });
        }
    }

    changeUserPassword() {
        const self = this;

        if (this.user !== null) {
            serviceAgent.ChangeUserPassword(this.user.Id, this.oldPassword, this.newPassword).then(() => {
                EventBus.$emit('openSnackbar', { snackbarText: 'Password succesfully changed', snackbarSuccess: true });

                self.showChangePassword = false;
            }).catch(() => {
                EventBus.$emit('openSnackbar', { snackbarText: 'Incorrect old Password', snackbarSuccess: false });
            });
        }
    }

    clearUserMovies() {
        const self = this;

        serviceAgent.ClearUserMovies(this.user.Id).then(() => {
            EventBus.$emit('openSnackbar', { snackbarText: 'All movies were sucessfully removed', snackbarSuccess: true });

            this.$store.dispatch('setUserMovies');
        });
    }

    deleteUser() {
        const self = this;

        serviceAgent.DeleteUser(this.user.Id).then(() => {
            EventBus.$emit('openSnackbar', { snackbarText: 'User was sucessfully deleted', snackbarSuccess: false });

            this.logoutCallback();
        });
    }

    async clicked() {
        setTimeout(() => {
            this.settingsDialog = true;
        }, 100);
    }

    checkFieldsChanged() {
        this.nameChanged = !!this.user && this.user.Name !== this.initialName;
        this.emailChanged = !!this.user && this.user.Email !== this.initialEmail;
    }

    @Watch('user.Name')
    onUserNameChanged(val: string, oldVal: string) {
        this.checkFieldsChanged();
    }

    @Watch('user.Email')
    onUserEmailChanged(val: string, oldVal: string) {
        this.checkFieldsChanged();
    }
}
</script>

<style lang="scss">
@use '../style/variables';

    .user-settings-card {
        .user-settings-title {
            background-color: variables.$additional-color;
        }

        .user-settings-dialog-button--text {
            color: variables.$additional-color !important;
        }

        .v-card__text {
            padding-bottom: 0 !important;
            color: rgba(0, 0, 0, 0.9);
        }

        .user-settings-field {
            font-size: 17px;
            padding: 20px 0;
            display: grid;
            gap: 10px;
            grid-template-columns: 2fr 4fr 2fr;
            align-items: center;

            &.change-password-area {
                align-items: baseline;
            }

            .user-settings-field-change-password {
                .v-text-field {
                    margin: 0 !important;
                    padding-top: 0 !important;
                    padding-bottom: 10px !important;
                }
            }

            .user-settings-field-remove-buttons {
                display: grid;
                grid-auto-flow: column;
                justify-items: center;
                height: 35px;
            }

            &.user-settings-field-v-text {
                padding: 20px 0 0;
                align-items: baseline;
            }

            .change-password-button {
                align-self: baseline;
            }

            .v-text-field__details {
                margin: 0 !important;
            }
        }

        .snackbar-failed {
            .v-snack__wrapper {
                background-color: #F44336;
            }
        }

        .v-snack__wrapper {
            background-color: variables.$additional-color;
            min-width: 250px;
        }
    }
</style>
