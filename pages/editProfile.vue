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
                        
                        
                        <button class="custom-btn w-100 mt-5">{{ $t('Global.Saving_changes') }}</button>
                    </div>
                </div>
            </form>
        </div>

        <Dialog v-model:visible="successfullyChange" modal class="custum_dialog_width without-close" :draggable="false" >
            <div class="text-center">
                <img src="@/assets/images/check.png" alt="check-img" class="check-img">
                <h3 class="main-title bold mb-4">{{ $t('Global.Saving_changes_success') }}</h3>
            </div>
        </Dialog>
    </div>
</template>

<script>
definePageMeta({
    name: "Home.edit_profile",
    middleware: 'auth',
});
import dropdown_img from '@/assets/images/Flag.webp';
import dropdown_img_1 from '@/assets/images/messi.gif';
export default {
    data() {
        return {
            successfullyChange: false,
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

        submitData() {
            this.successfullyChange = true;
            setTimeout(() => {
                this.successfullyChange = false;
                this.$router.push('/settings');
            }, 1000);

        }
    },
}
</script>