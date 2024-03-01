<template>

    <div>

        <div class="container">
            <div class="layout-form custom-width">
                <h1 class="main-title bold lg mb-5">{{ $t("Auth.activation_code") }}</h1>
                <form @submit.prevent="submitData">
                    <div class="row">
                        <div class="col-12 col-md-8 mr-auto">
                            <div class="text-center mb-5">
                                <img src="@/assets/images/restore-image.svg" alt="restore-image" class="restore-image mb-4">
                                <p class="main-title">{{ $t("Global.Please_activation_email") }}</p>
                            </div>
    
                            <div class="layout-activate d-flex" dir="ltr">
                                <v-otp-input
                                ref="otpInput"
                                v-model="bindModal"
                                input-classes="otp-input"
                                separator=" "
                                :num-inputs="6"
                                :should-auto-focus="true"
                                :is-input-num="true"
                                @on-change="handleOnChange"
                                @on-complete="handleOnComplete"
                                />
                            </div>
    
                            <button type="submit" class="custom-btn w-100 mr-auto"> {{ $t('Auth.confirmation') }} </button>
    
                            <div class="new-sign mt-4">
                                {{ $t('Auth.havent_received_code') }}
                                <button type="button">{{ $t('Auth.resend_code') }}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <Dialog v-model:visible="successfullySent" modal class="custum_dialog_width without-close" :draggable="false" >
            <div class="text-center">
                <img src="@/assets/images/check.png" alt="check-img" class="check-img">
                <h3 class="main-title bold mb-4">{{ $t('Global.email_changed_successfully') }}</h3>
            </div>
        </Dialog>

    </div>
    
</template>

<script>
definePageMeta({
    name: "Global.activation_code",
})

import VOtpInput from "vue3-otp-input";

export default {
    components: {
        VOtpInput,
    },
  data() {
    return {
      successfullySent: false,
      otpInput: null,
      bindModal: "",
    };
  },
  methods: {

    submitData() {   
        this.successfullySent = true;
        setTimeout(() => {
            this.successfullySent = false;
            this.$router.push('/settings');
        }, 1000);
    }

  },
  
  mounted() {
    this.otpInput = this.$refs.otpInput;
  },
};
</script>

