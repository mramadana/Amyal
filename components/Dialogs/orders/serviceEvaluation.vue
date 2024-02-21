<template>
    <div class="container">

        <!-- start to rating the service -->
        <Dialog v-model:visible="serviceRating" modal class="custum_dialog_width" :draggable="false">
            <form @submit.prevent="submitData">
                <div class="text-center">
                    <h1 class="main-title bold mb-4">{{ $t('Global.service_rating') }}</h1>
                    <h3 class="main-disc mb-3">{{ $t('Global.leave_comment') }}</h3>
                    <div class="d-flex justify-content-center rate-parent mb-4">
                        <Rating v-model="customerRate" :cancel="false" :dir="'ltr'"/>
                    </div>

                    <textarea  class="main_input main_area mb-4" :placeholder="$t('Global.write_comment')"></textarea>
    
                    <div class="section-btns">
                        <button type="submit" class="custom-btn sm"> {{$t('Global.send_evaluation')}} </button>
                        <button type="button" @click="serviceRating = false" class="custom-btn sm cancel"> {{$t('Global.not_now')}} </button>
                    </div>
                </div>
            </form>
        </Dialog>

        <!-- start sent Successfully -->
        <Dialog v-model:visible="sent_Successfully" modal class="custum_dialog_width" :draggable="false">
                <div class="text-center">
                    <img src="@/assets/images/check.png" alt="check-img" class="check-img">
                    <h1 class="main-title bold mb-4">{{ $t('Global.evaluation_sent_successfully') }}</h1>
                </div>
        </Dialog>
    </div>
</template>

<script>

export default {
    data() {
        return {
            serviceRating: false,
            customerRate: null,
            sent_Successfully: false
        };
    },

    methods: {
        submitData() {
            this.serviceRating = false;
            this.sent_Successfully = true;
            setTimeout(() => {
                this.sent_Successfully = false;
            }, 1500);
        }
    }
}
</script>