<template>
    <div class="container">
        <div class="layout-form custom-width">
            <h1 class="main-title bold lg mb-5">{{ $t("Auth.restore_password") }}</h1>
            <form @submit.prevent="submitData">
                <div class="row">
                    <div class="col-12 col-md-8 mr-auto">
                        <div class="text-center mb-5">
                            <img src="@/assets/images/restore-image.svg" alt="restore-image" class="restore-image mb-4">
                            <p class="main-title">برجاء ادخال رقم الجوال لاستعادة كلمة المرور</p>
                        </div>

                        <div class="form-group mb-5">
                            <label class="label">
                                {{ $t('Auth.mobile_number') }}
                                <span class="hint-red">*</span>
                            </label>
                            <div class="with_cun_select">
                                <input type="number" class="main_input" name="name" v-model="name" :placeholder="$t('Auth.mobile_number')">
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
                        <button type="submit" class="custom-btn w-100 mr-auto"> {{ $t('Auth.confirmation') }} </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    definePageMeta({
    name: "Auth.restore_password",
});
import Dropdown from 'primevue/dropdown';
import dropdown_img from '@/assets/images/Flag.webp';
import dropdown_img_1 from '@/assets/images/messi.gif';

export default {
    components: {
        Dropdown
    },
    data() {
        return {
            name: '',
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
        }
    },

    methods: {
        submitData() {
            this.$router.push('/Auth/restorepassword-check-code')
        }
    }
}
</script>