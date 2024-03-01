<script setup>
    definePageMeta({
        name: "Titles.finished",
    });
</script>
<template>
    <div class="container">
        <h1 class="main-title bold lg mb-5">{{ $t("Titles.finished") }}</h1>
        <OrdersMainOrderContent orderUrl="finished"/>
    </div>
</template>