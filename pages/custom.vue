<script setup>
definePageMeta({
    layout: "custom",
});

// this method from utils folder imported
const { sayHello } = useUtils();
sayHello();
</script>

<template>
    <div style="background-color: green">
    </div>
</template>

<script>


export default {

    data() {
        return {

        }
    },

    methods: {

    }
}
</script>