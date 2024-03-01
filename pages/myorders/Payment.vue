<script setup>
    definePageMeta({
        name: "Titles.payment_pending",
    });
</script>
<template>
    <div class="container">
        <h1 class="main-title bold lg mb-5">{{ $t("Titles.payment_pending") }}</h1>
        <OrdersMainOrderContent orderUrl="payment"/>
    </div>
</template>