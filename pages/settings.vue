<template>
    <div>

        <div class="container">
            <div class="layout-form custom-width lg">
                <h1 class="main-title bold lg mb-5">{{ $t("Home.settings") }}</h1>
                <div class="row justify-content-center">
                    <div class="col-12 col-md-11">
    
                        <router-link class="layout-form sm" to="/editProfile">
                            {{ $t("Global.edit_profile") }}
                            <i class="fas fa-chevron-left"></i>
                        </router-link>
    
                        <router-link class="layout-form sm" to="/changeMobileNumber">
                            {{ $t("Global.change_mobile_number") }}
                            <i class="fas fa-chevron-left"></i>
                        </router-link>
    
                        <router-link class="layout-form sm" to="/changeEmail">
                            {{ $t("Global.change_email") }}
                            <i class="fas fa-chevron-left"></i>
                        </router-link>
    
                        <router-link class="layout-form sm" to="/changePassword">
                            {{ $t("Global.change_password") }}
                            <i class="fas fa-chevron-left"></i>
                        </router-link>
    
                        <router-link class="layout-form sm" to="/notificationSettings">
                            {{ $t("Global.notification_settings") }}
                            <i class="fas fa-chevron-left"></i>
                        </router-link>
    
                        <button @click="deleteAcount = true" class="layout-form sm del-color w-100">
                            {{ $t("Global.delete_account") }}
                            <i class="fas fa-chevron-left"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        
        <!-- logout Dialog -->
        <Dialog v-model:visible="deleteAcount" modal class="custum_dialog_width" :draggable="false">
            <div class="text-center">
                <img src="@/assets/images/noun_warning.png" alt="check-img" class="check-img">
                <h1 class="main-title bold mb-4">{{ $t('Global.congratulations_request') }}</h1>
                <div class="section-btns mt-5">
                    <button type="button" class="custom-btn sm d-inline-flex" @click="deleteAcount = false">{{ $t('Home.retreat') }}</button>
                    <button type="button" class="custom-btn logout sm d-inline-flex" @click="deletedAcount">{{ $t('Global.delete') }}</button>
                </div>
            </div>
        </Dialog>

        <!-- delete successfully dialog -->
        <Dialog v-model:visible="delete_Successfully" modal class="custum_dialog_width without-close" :draggable="false">
            <div class="text-center">
                <img src="@/assets/images/check.png" alt="check-img" class="check-img">
                <h1 class="main-title bold mb-4">{{ $t('Global.account_deleted') }}</h1>
                <NuxtLink class="custom-btn sm d-inline-flex" to="/Auth/register">{{ $t('Auth.create_account') }}</NuxtLink>
            </div>
        </Dialog>

    </div>
</template>

<script>
    definePageMeta({
        name: "Home.settings"
    })

    export default {
        data() {
            return {
                deleteAcount: false,
                delete_Successfully: false,
            };
        },

        methods: {
            deletedAcount() {
                localStorage.clear();
                this.delete_Successfully = true
                this.deleteAcount = false
            }
        }
    }
</script>