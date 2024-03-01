<template>
    <div>
        <div class="container">
            <div class="layout-form custom-width lg">
                <h1 class="main-title bold lg mb-5">{{ $t("Global.luxury_cars") }}</h1>
                <div class="search-box main_input with_icon mb-5">
                    <button type="button" class="static-btn search-btn"  @click="filterDialog">
                        <i class="fas fa-list-ul search-icon"></i>
                    </button>
                    <input type="search" class="input" v-model="searchTerm" :placeholder=" $t('Global.search') " />
                </div>
    
                <div class="row">
                    <div class="col-12 col-md-6 mb-4" v-for="car in cars" :key="car.id">
                        <nuxt-link :to="'/Cars/' + car.id" class="car-box" @click="saveFormData(car.id)">
                            <img :src="car.image" alt="car-img" class="car-img">
                            <div class="info">
                                <h3 class="car-name">{{ car.name }}</h3>
                                <div class="car-rent">
                                    <i class="fa-solid fa-coins"></i>
                                    <span class="hint">الايجار اليومي: </span>
                                    <span class="price">{{ car.rent }} ر.س</span>
                                </div>
                                <div class="car-rent">
                                    <i class="fa-solid fa-coins"></i>
                                    <span class="hint">الايجار الشهري: </span>
                                    <span class="price">{{car.rent}} ر.س</span>
                                </div>
                                <div class="car-rent">
                                    <i class="fa-solid fa-coins"></i>
                                    <span class="hint">الايجار السنوي: </span>
                                    <span class="price">{{car.rent}} ر.س</span>
                                </div>
                            </div>
                            <span class="car-hint">{{ car.name }}</span>
                        </nuxt-link>
                    </div>
                </div>
    
                <!--***** Paginator *****-->
                <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-5 paginate-parent" dir="ltr" />
            </div>
        </div>
    
        <!-- ***** Filter Dialog ***** -->
        <DialogsFilterCar ref="filter_Car" @filterData="filterData"/>
    </div>
</template>

<script setup>
    definePageMeta({
    name: "Titles.cars",
});
</script>

<script>

import image_1 from '@/assets/images/2.png';
export default {
    data() {
        return {
            pageLimit: 5,
            totalPage: 10,
            currentPage: 1,
            searchTerm: '',
            cars: [
                {
                    image: image_1,
                    rent: '200',
                    name: "car 1",
                    id: "1",
                },
                {
                    image: image_1,
                    rent: '200',
                    name: "car 2",
                    id: "2",
                },
                {
                    image: image_1,
                    rent: '200',
                    name: "car 3",
                    id: "3",
                },
                {
                    image: image_1,
                    rent: '200',
                    name: "car 4",
                    id: "4",
                },
                {
                    image: image_1,
                    rent: '200',
                    name: "car 5",
                    id: "5"
                },
            ],
        }
    },

    methods: {
        onPaginate(e) {
            this.currentPage = e.page + 1;
            window.scrollTo(0, 0);
        },

        filterData(data) {
            this.cars = data;
        },

        filterDialog() {
            this.$refs.filter_Car.filtering_dialog = true;
        },

        saveFormData(id) {
            // Get existing form data from localStorage or initialize it as an empty object
            let formData = JSON.parse(localStorage.getItem('formData')) || {};
            
            // Save the clicked car ID to the formData object
            formData.carId = id;
            
            // Save the updated formData back to localStorage
            localStorage.setItem('formData', JSON.stringify(formData));

        }
    },

    computed: {
        cars() {
            // filter cars based on name
            return this.cars.filter(car => car.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
        }
  }
}

</script>

<style lang="scss">
    .car-box {
        position: relative;
        display: flex;
        align-items: center;
        padding: 20px;
        border-radius: 10px;
        transition: .3s;
        border: 1px solid gainsboro;
        @media (max-width: 768px) {
            flex-direction: column;
            gap: 12px;
            padding: 10px;
        }
        &:hover {
            transform: translateY(-10px);
        }
        box-shadow: 0px 0px 3px 0px gray;
        .car-img {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 10px;
            flex-shrink: 0;
            margin-inline-end: 20px;
            @media (max-width: 550px) {
                width: 100%;
                height: 100%;
                margin-inline-end: 0;
            }
        }
        .info {
            display: flex;
            flex-direction: column;
            text-align: start;
            gap: 10px;
            @media (max-width: 768px) {
                align-items: center;
                text-align: center;
            }
            
            .car-name {
                color: var(--main);
                font-weight: bold;
                font-size: 17px;
                margin-bottom: 0;
            }
            .car-rent {
                display: flex;
                align-items: center;
                gap: 5px;
                color: var(--main);
                font-weight: bold;
                font-size: 14px
            }
            .hint {
                font-size: 12px;
                color: gray;
            }

            .price {
                font-size: 14px
            }

        }
    }
</style>