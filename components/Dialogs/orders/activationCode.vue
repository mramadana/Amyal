<template>
    <div class="container">
        <Dialog v-model:visible="verifyCode" modal class="custum_dialog_width md" :draggable="false">
            <div class="text-center">
                <h1 class="main-title bold mb-4">{{ $t('Global.verification_code') }}</h1>
                <h3 class="main-disc">{{ $t('Global.enter_activation_sent_your_mobile') }}</h3>
            </div>

            <form @submit.prevent="submitData">
                <div class="row">
                    <div class="col-12 col-md-8 mr-auto">

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

                        <button type="submit" class="custom-btn mr-auto"> {{ $t('Auth.confirmation') }} </button>

                        <div class="new-sign mt-4">
                            {{ $t('Auth.havent_received_code') }}
                            <button type="button">{{ $t('Auth.resend_code') }}</button>
                        </div>
                    </div>
                </div>
            </form>
        </Dialog>

        <Dialog v-model:visible="successfullySent" modal class="custum_dialog_width" :draggable="false">
            <div class="text-center">
                <img src="@/assets/images/check.png" alt="check-img" class="check-img">
                <h3 class="main-title bold mb-4">{{ $t('Global.authorization_sent_to_mobile') }}</h3>
                <button type="button" @click="trackOrder" class="custom-btn mr-auto"> {{ $t('Global.track_your_order') }} </button>
            </div>
        </Dialog>
    </div>
</template>

<script>
import VOtpInput from "vue3-otp-input";

export default {
    components: {
        VOtpInput,
    },

    data() {
        return {
            verifyCode: false,
            otpInput: null,
            bindModal: "",
            successfullySent: false,
        };
    },
    
    methods: {
        submitData() {
            this.otpInput = this.$refs.otpInput;
            this.otpInput = null;
            this.verifyCode = false;
            this.successfullySent = true;
        },

        trackOrder() {
            this.successfullySent = false;
        }
    },

    mounted() {
        this.otpInput = this.$refs.otpInput;
    },
}
</script>


