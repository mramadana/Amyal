<template>

    <div>

        <div class="container">
            <div class="layout-form custom-width">
                <h1 class="main-title bold lg mb-5">{{ $t("Global.change_mobile_number") }}</h1>
                <form @submit.prevent="submitData">
                    <div class="row">
                        <div class="col-12 col-md-8 mr-auto">
                            <div class="text-center mb-5">
                                <img src="@/assets/images/restore-image.svg" alt="restore-image" class="restore-image mb-4">
                                <p class="main-title">{{ $t("Global.enter_current_password_new_mobile") }}</p>
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
                                    {{ $t('Global.new_mobile') }}
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
    
                            <button class="custom-btn w-100 mr-auto mt-5">{{ $t('Home.continuation') }}</button>
    
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import dropdown_img from '@/assets/images/Flag.webp';
import dropdown_img_1 from '@/assets/images/messi.gif';
definePageMeta({
    name: "Global.change_mobile_number",
});
export default {
    
    data() {
        return {
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
            this.$router.push('/mobileActivateCode');
        }
    }
}
</script>