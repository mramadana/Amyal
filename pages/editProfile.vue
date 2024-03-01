<template>
    <div class="container">
        <div class="layout-form custom-width">
            <h1 class="main-title bold lg mb-5">{{ $t("Home.edit_profile") }}</h1>
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
                        
                        
                        <button class="custom-btn w-100 mt-5">{{ $t('Global.Saving_changes') }}</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
definePageMeta({
    name: "Home.edit_profile",
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
        }
    },
    methods: {
    // get the array from each input upload image upload
        updateUploadedImages_1(images) {
            this.uploadedImage = images;
        },

        // submitData() {
            
        // }
    }
}
</script>