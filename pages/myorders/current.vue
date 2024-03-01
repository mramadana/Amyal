<script setup>
    definePageMeta({
        name: "Titles.current",
    });
</script>
<template>
    <div class="container">
        <h1 class="main-title bold lg mb-5">{{ $t("Titles.current") }}</h1>
        <OrdersMainOrderContent orderUrl="current"/>
    </div>
</template>