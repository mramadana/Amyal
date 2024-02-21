<template>
    
    <div class="slider" dir="ltr">
        <Carousel :value="products" :responsiveOptions="responsiveOptions" :autoplayInterval="4000">
            <template #item="slotProps">
                <img :src="slotProps.data.image" alt="" class="slider-img">
            </template>
        </Carousel>
    </div>
    
</template>

<script>

export default {
    props: {
        products: Array,
        numVisible: Number,
        numScroll: Number
    },

    data() {
        return {

        };
    },

    methods: {
        getSeverity(status) {
            switch (status) {
                case 'INSTOCK':
                    return 'success';

                case 'LOWSTOCK':
                    return 'warning';

                case 'OUTOFSTOCK':
                    return 'danger';

                default:
                    return null;
            }
        }
    }
}
</script>

<style lang="scss">

</style>