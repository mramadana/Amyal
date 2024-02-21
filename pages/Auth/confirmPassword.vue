<template>
    <div class="container">
        <div class="layout-form custom-width">
            <h1 class="main-title bold lg mb-5">{{ $t("Auth.restore_password") }}</h1>
            <form @submit.prevent="submitData">
                <div class="row">
                    <div class="col-12 col-md-8 mr-auto">
                        <div class="text-center mb-5">
                            <img src="@/assets/images/restore-image.svg" alt="restore-image" class="restore-image mb-4">
                            <p class="main-title">{{ $t("Auth.confirm_password") }}</p>
                        </div>
                        <div class="form-group">
                            <label class="label">
                                {{ $t('Auth.new_password') }}
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
                                {{ $t('Auth.definitely_new_password') }}
                                <span class="hint-red">*</span>
                            </label>
                            <div class="main_input with_icon">
                                <input :type="inputType('definitelyNewPassword_2')" name="password_confirmation" class="custum-input-icon" :placeholder=" $t('Auth.please_confirm_password') ">
                                <button class="static-btn" type="button" @click="togglePasswordVisibility('definitelyNewPassword_2')" :class="{ 'active_class': passwordVisible.definitelyNewPassword_2 }">
                                <i class="far fa-eye icon"></i>
                                </button>
                            </div>
                        </div>

                        <button class="custom-btn w-100 mr-auto">{{ $t('Auth.confirmation') }}</button>

                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
definePageMeta({
    name: "Auth.new_password",
});
export default {
    
    data() {
        return {
            passwordVisible: {
                definitelyNewPassword: false,
                definitelyNewPassword_2: false
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
            this.$router.push('/Auth/login')
        }
    }
}
</script>