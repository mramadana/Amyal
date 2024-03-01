<template>
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

                    <router-link class="layout-form sm" to="/profile">
                        {{ $t("Global.change_password") }}
                        <i class="fas fa-chevron-left"></i>
                    </router-link>

                    <router-link class="layout-form sm" to="/profile">
                        {{ $t("Global.notification_settings") }}
                        <i class="fas fa-chevron-left"></i>
                    </router-link>

                    <router-link class="layout-form sm del-color" to="/profile">
                        {{ $t("Global.delete_account") }}
                        <i class="fas fa-chevron-left"></i>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    definePageMeta({
        name: "Home.settings"
    })
</script>