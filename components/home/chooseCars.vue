<template>
    <div class="container mb-5">
        <h1 class="main-title lg bold mb-5">{{ $t("Home.select_car_category") }}</h1>
        <div class="row justify-content-center">
            <div class="col-12 col-md-8">
                <div class="row justify-content-center">
                    <div class="col-6 col-md-4 d-flex justify-content-center mb-5" v-for="car in cars" :key="car.id">
                        <div class="cars-item">
                            <label class="custom-radio">
                                <input type="radio" name="single_car" :value="car.id" class="d-none" @change="handleCarSelection(car.id)">
                                <div class="radio-content">
                                    <img :src="car.image" alt="car-image" class="car-img">
                                    <p>{{ car.name }}</p>
                                    <p>{{ car.id }}</p>
                                </div>
                            </label>
                        </div>
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
    input:checked ~ .radio-content {
        background-color: #E0944166;
    }
</style>