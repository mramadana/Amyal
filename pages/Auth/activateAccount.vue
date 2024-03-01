<template>
    <div class="container">
        <div class="layout-form custom-width">
            <h1 class="main-title bold lg mb-5">{{ $t("Auth.activation_code") }}</h1>
            <form @submit.prevent="submitData">
                <div class="row">
                    <div class="col-12 col-md-8 mr-auto">
                        <div class="text-center mb-5">
                            <img src="@/assets/images/restore-image.svg" alt="restore-image" class="restore-image mb-4">
                            <p class="main-title">{{ $t("Auth.please_enter_activation_code") }}</p>
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
</template>

<script>

definePageMeta({
        name: "Home.activation_code",
    });
import VOtpInput from "vue3-otp-input";

export default {
    components: {
        VOtpInput,
    },
  data() {
    return {
      otpInput: null,
      bindModal: "",
    };
  },
  methods: {

    submitData() {   
        this.$router.push('/')
    }

  },
  
  mounted() {
    this.otpInput = this.$refs.otpInput;
  },
};
</script>

