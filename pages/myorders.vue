<script setup>
definePageMeta({
    middleware: 'auth',
});
</script>
<template>
    <div class="container">
        <h1 class="main-title bold lg mb-5 mt-5 text-center">{{ $t("Home.myrequests") }}</h1>

        <div class="section-btns mb-5">

            <nuxt-link class="custom-btn order-btn sm" to="/myorders/pending">{{ $t("Titles.pending") }}</nuxt-link>

            <nuxt-link class="custom-btn order-btn sm" to="/myorders/Payment">{{ $t("Titles.payment_pending") }}</nuxt-link>

            <nuxt-link class="custom-btn order-btn sm" to="/myorders/current">{{ $t("Titles.current") }}</nuxt-link>

            <nuxt-link class="custom-btn order-btn sm" to="/myorders/finished">{{ $t("Titles.finished") }}</nuxt-link>

        </div>
        
        <div class="layout-form custom-width w-100">
            <NuxtPage />
        </div>
    </div>
  </template>
  

  
