<template>

    <div>

        <div class="container">
            <div class="layout-form custom-width">
                <h1 class="main-title bold lg mb-5">{{ $t("Global.change_email") }}</h1>
                <form @submit.prevent="submitData">
                    <div class="row">
                        <div class="col-12 col-md-8 mr-auto">
                            <div class="text-center mb-5">
                                <img src="@/assets/images/restore-image.svg" alt="restore-image" class="restore-image mb-4">
                                <p class="main-title">{{ $t("Global.enter_current_password_new_email") }}</p>
                            </div>
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Auth.password') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="main_input with_icon">
                                    <input :type="inputType('definitelyNewPassword')" name="password" class="custum-input-icon" :placeholder=" $t('Auth.please_enter_password') ">
                                    <button class="static-btn" type="button" @click="togglePasswordVisibility('definitelyNewPassword')" :class="{ 'active_class': passwordVisible.definitelyNewPassword }">
                                    <i class="far fa-eye icon"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Global.new_email') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="main_input">
                                    <i class="fas fa-envelope sm-icon"></i>
                                    <input type="email" class="custum-input-icon" name="email" v-model="email" :placeholder="$t('Global.please_enter_new_email')">
                                </div>
                        </div>
    
                            <button class="custom-btn w-100 mr-auto mt-5">{{ $t('Home.continuation') }}</button>
    
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script>

definePageMeta({
    name: "Global.change_email",
});
export default {
    
    data() {
        return {
            passwordVisible: {
                definitelyNewPassword: false,
            }
        }
    },

    methods: {
        togglePasswordVisibility(input) {
            this.passwordVisible[input] = !this.passwordVisible[input];
        },

        inputType(input) {
            return this.passwordVisible[input] ? 'text' : 'password';
        },

        submitData() {
            this.$router.push('/emailActivateCode');
        }
    }
}
</script>