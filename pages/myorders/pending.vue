<script setup>
    definePageMeta({
        name: "Titles.pending",
    });
</script>
<template>
    <div class="container">
        <h1 class="main-title bold lg mb-5">{{ $t("Titles.pending") }}</h1>
        <OrdersMainOrderContent orderUrl="pending"/>
    </div>
</template>

