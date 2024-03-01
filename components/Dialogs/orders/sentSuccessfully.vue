<template>
    <div class="container">
        <Dialog v-model:visible="sent_Successfully" modal class="custum_dialog_width" :draggable="false">
                <div class="text-center">
                    <img src="@/assets/images/check.png" alt="check-img" class="check-img">
                    <h1 class="main-title bold mb-4">{{ $t('Global.congratulations_request') }}</h1>
                    <NuxtLink class="custom-btn sm d-inline-flex" :to="'/orders/orderDetails/' + orderId">{{ $t('Global.track_your_order') }}</NuxtLink>
                </div>
        </Dialog>
    </div>
</template>

<script>
export default {
    props: ['orderId'],
    data() {
        return {
            sent_Successfully: false
        };
    },
}
</script>