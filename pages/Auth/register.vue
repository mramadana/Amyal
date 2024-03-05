<template>
    <div class="container">
        <div class="layout-form custom-width">
            <h1 class="main-title bold lg mb-5">{{ $t("Auth.create_account") }}</h1>
            <form @submit.prevent="submitData">
                <div class="row">
                    <div class="col-12 col-md-8 mr-auto">

                        <div class="form-group text-center">
                            <div class="input_auth">
                                <div class="edit-label">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <img src="@/assets/images/upload_layout.png" alt="default-img" :class="{'hidden-default' : uploadedImage.length > 0, 'default-class': true}">
                                <GlobalImgUploader acceptedFiles="image/*" :newImages="logo" name="logo" @uploaded-images-updated="updateUploadedImages_1" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="label">
                                {{ $t('Auth.username') }}
                                <span class="hint-red">*</span>
                            </label>
                            <div class="main_input">
                                <i class="fas fa-user sm-icon"></i>
                                <input type="text" class="custum-input-icon" name="name" v-model="name" :placeholder="$t('Auth.enter_username')">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="label">
                                {{ $t('Auth.mobile_number') }}
                                <span class="hint-red">*</span>
                            </label>
                            <div class="with_cun_select">
                                <div class="main_input">
                                    <i class="fas fa-mobile-alt sm-icon"></i>
                                    <input type="number" class="custum-input-icon" name="name" v-model="name" :placeholder="$t('Auth.please_mobile_number')">
                                </div>
                                <div class="card d-flex justify-content-center dropdown_card">
                                <Dropdown
                                v-model="selectedCountry"
                                :options="countries"
                                optionLabel="name"
                                >
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex-group-me">
                                    <img
                                        :alt="slotProps.value.label"
                                        :src="slotProps.value.image"
                                        :class="`mr-2 flag flag-${slotProps.value.key.toLowerCase()}`"
                                        style="width: 24px"
                                    />
                                    <div>{{ slotProps.value.key }}</div>
                                    </div>
                                    <span v-else>
                                    {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex-group-me">
                                    <img
                                        :alt="slotProps.option.label"
                                        :src="slotProps.option.image"
                                        :class="`mr-2 flag flag-${slotProps.option.key.toLowerCase()}`"
                                        style="width: 24px"
                                    />
                                    <div>{{ slotProps.option.key }}</div>
                                    </div>
                                </template>
                                </Dropdown>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="label">
                                {{ $t('Auth.email') }}
                                <span class="hint-red">*</span>
                            </label>
                            <div class="main_input">
                                <i class="fas fa-envelope sm-icon"></i>
                                <input type="email" class="custum-input-icon" name="email" v-model="email" :placeholder="$t('Auth.please_enter_email')">
                            </div>
                        </div>

                        <div class="form-group">
                                <label class="label">
                                    {{ $t('Auth.password') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="main_input with_icon">
                                    <i class="fas fa-lock sm-icon"></i>
                                    <input :type="inputType('definitelyNewPassword')" name="password" class="custum-input-icon" :placeholder=" $t('Auth.please_enter_password') ">
                                    <button class="static-btn" type="button" @click="togglePasswordVisibility('definitelyNewPassword')" :class="{ 'active_class': passwordVisible.definitelyNewPassword }">
                                    <i class="far fa-eye icon"></i>
                                    </button>
                                </div>
                        </div>

                        <div class="form-group">
                            <label class="label">
                                {{ $t('Auth.confirm_password_sm') }}
                                <span class="hint-red">*</span>
                            </label>
                            <div class="main_input with_icon">
                                <i class="fas fa-lock sm-icon"></i>
                                <input :type="inputType('definitelyNewPassword_2')" name="password_confirmation" class="custum-input-icon" :placeholder=" $t('Auth.please_confirm_password') ">
                                <button class="static-btn" type="button" @click="togglePasswordVisibility('definitelyNewPassword_2')" :class="{ 'active_class': passwordVisible.definitelyNewPassword_2 }">
                                <i class="far fa-eye icon"></i>
                                </button>
                            </div>
                        </div>

                        <div class="radios form-group check-inner mb-4">
                            <div class="d-flex gap-3">
                                <label class="custom-radio custom-check">
                                    <input type="checkbox" name="is_condition" v-model="checked" class="d-none">
                                    <span class="mark">
                                        <i class="fas fa-check icon"></i>
                                    </span>
                                    <p class="check-text hint">
                                    {{ $t("Auth.agree_to") }}
                                    <NuxtLink to="/terms" target="_blank" class="anchor">
                                        {{ $t("Auth.terms_and_conditions") }}
                                    </NuxtLink >
                                    </p>
                                </label>
                            </div>
                        </div>
                        
                        <button class="custom-btn w-100 mr-auto">{{ $t('Auth.confirmation') }}</button>

                        <div class="new-sign mt-4">
                            {{ $t('Auth.already_have_account') }}
                            <nuxt-link to="/Auth/login" >{{ $t('Auth.login') }}</nuxt-link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
definePageMeta({
    name: "Auth.create_account",
});
import dropdown_img from '@/assets/images/Flag.webp';
import dropdown_img_1 from '@/assets/images/messi.gif';
export default {

    data() {
        return {
            uploadedImage: [],
            selectedCountry: {
                    key: "+966",
                    code: "SA",
                    image: dropdown_img,
            },
            countries: [
                {
                key: "+966",
                code: "SA",
                image: dropdown_img_1,
                },
                {
                key: "+20",
                code: "Eg",
                image: dropdown_img_1,
                },
            ],
            passwordVisible: {
                definitelyNewPassword: false,
                definitelyNewPassword_2: false
            },
        }
    },
    methods: {
    // get the array from each input upload image upload
        updateUploadedImages_1(images) {
            this.uploadedImage = images;
        },

        togglePasswordVisibility(input) {
            this.passwordVisible[input] = !this.passwordVisible[input];
        },

        inputType(input) {
            return this.passwordVisible[input] ? 'text' : 'password';
        },

        submitData() {
            this.$router.push('/Auth/activateAccount')
        }
    }
}
</script>