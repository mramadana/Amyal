<template>
    <h2>event id : {{ id }}</h2>
</template>

<script setup>
const { id } = useRoute().params;
</script>

