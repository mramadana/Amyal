<template>
    <div class="container mb-5">
        <h1 class="main-title lg bold mb-5">{{ $t("Home.select_car_category") }}</h1>
        <div class="row justify-content-center">
            <div class="col-12 col-md-8">
                <div class="row justify-content-center">
                    <div class="col-6 col-md-4 d-flex justify-content-center mb-5" v-for="car in cars" :key="car.id">
                        <div v-if="cars.length">
                            <div class="cars-item" v-if="!loading">
                                <label class="custom-radio">
                                    <input type="radio" name="single_car" :value="car.id" class="d-none" @change="handleCarSelection(car.id)">
                                    <div class="radio-content with_cutom_height">
                                        <img :src="car.image" alt="car-image" class="car-img">
                                        <p class="car-name">{{ car.name }}</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                        <div class="no-data custom-radio" v-else>
                            <div class="radio-content">
                                <img  loading="lazy" src="@/assets/images/no_data.avif" alt="image" class="no-data-img car-img">
                                <div class="no-data-text">{{ $t('Global.imgs') }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- skelton -->
                <div class="d-flex align-items-center justify-content-between" v-if="loading">
                    <div v-for="i in 3" :key="i">
                        <Skeleton width="220px" height="200px" class="slider-img rounded-2"></Skeleton>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'chooseCars',
    props: {
        cars: Array,
        loading: Boolean,
    },

    methods: {
        handleCarSelection(carId) {
            this.$emit('carSelected', carId);
        },
    }
}
</script>

<style lang="scss">
    .radio-content {
        padding: 20px;
        width: 200px;
        max-width: 100%;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 2px solid var(--main);
        cursor: pointer;
        &.with_cutom_height {
            height: 230px;
        }
        @media (max-width: 768px) {
           width: 100%;
        }
        @media (max-width: 550px) {
           width: 100%;
           height: 100%;
        }
        transition: .3s;
        .car-img {
            width: 125px;
            height: 125px;
            object-fit: cover;
            margin-bottom: 15px;
            @media (max-width: 768px) {
                width: 100px;
                height: 50px;
            }
            @media (max-width: 550px) {
                width: 95px;
                height: 70px;
            }
        }
    }

    .car-name {
        font-size: 14px;
    }

    input:checked ~ .radio-content {
        background-color: #E0944166;
    }
</style>