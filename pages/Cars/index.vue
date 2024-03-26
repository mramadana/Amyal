<template>
    <div>
        <div class="container">
            <div class="layout-form custom-width lg">
                <h1 class="main-title bold lg mb-5">{{ $t("Global.luxury_cars") }}</h1>
                <div class="search-box main_input with_icon mb-5">
                    <button type="button" class="static-btn search-btn" @click="filterDialog">
                        <i class="fas fa-list-ul search-icon"></i>
                    </button>
                    <input type="search" class="input" v-model="searchTerm" @input="filterCars" :placeholder=" $t('Global.search') " />
                </div>
    
                <div class="row">
                    <div class="col-12 col-md-6 mb-4" v-for="car in cars" :key="car.id">
                        <nuxt-link :to="'/Cars/' + car.id" class="car-box" @click="saveFormData(car.id)" v-if="!loading">
                            <img :src="car.image" alt="car-img" class="car-img">
                            <div class="info">
                                <h3 class="car-name">{{ car.name }}</h3>
                                <div class="car-rent">
                                    <i class="fa-solid fa-coins"></i>
                                    <span class="hint">{{ $t("Global.daily_rent")}} : </span>
                                    <span class="price">{{ car.price[0].price }} {{ $t("Global.Rs") }}</span>
                                </div>
                                <div class="car-rent">
                                    <i class="fa-solid fa-coins"></i>
                                    <span class="hint">{{ $t("Global.monthly_rent")}}: </span>
                                    <span class="price">{{car.price[1].price}} {{ $t("Global.Rs") }}</span>
                                </div>
                                <div class="car-rent">
                                    <i class="fa-solid fa-coins"></i>
                                    <span class="hint">{{ $t("Global.yearly_rent")}}: </span>
                                    <span class="price">{{car.price[2].price}} {{ $t("Global.Rs") }}</span>
                                </div>
                            </div>
                            <span class="car-hint">{{ car.name }}</span>
                        </nuxt-link>
                    </div>
                </div>

                <div class="nodata d-flex justify-content-center" v-if="cars.length == 0 && !loading">
                    <div class="radio-content">
                        <img  loading="lazy" src="@/assets/images/no_data.avif" alt="image" class="no-data-img car-img">
                        <div class="no-data-text">{{ $t('Global.no_products') }}</div>
                    </div>
                </div>
                    
                <div class="d-flex align-items-center justify-content-between row" v-if="loading">
                    <div v-for="i in 4" :key="i" class="col-12 col-md-6 mb-4">
                        <Skeleton height="150px" class="slider-img rounded-2"></Skeleton>
                    </div>
                </div>



    
                <!--***** Paginator *****-->
                <div v-if="showPaginate">
                    <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-5 paginate-parent" dir="ltr" />
                </div>
            </div>
        </div>
    
        <!-- ***** Filter Dialog ***** -->

        <Dialog v-model:visible="filtering_dialog" modal class="custum_dialog_width" :draggable="false">
            <div class="main-text text-center">
              <p class="main-title"> {{$t('Global.filter')}} </p>
            </div>
            <p class="main-title mb-4"> {{ $t('Global.brand') }} </p>

            <form @submit.prevent="submitData">
                <div class="row with-br-bottom mb-4" v-if="!loading">
                    <div class="col-12 col-md-6" v-for="item in brands" :key="item">
                        <div class="radios form-group">
                            <div class="d-flex gap-3">
                            <label class="custom-radio custom-check">
                                <input type="checkbox" name="opinion" :value="item.id" v-model="checkedIds" class="d-none">
                                <span class="mark">
                                    <i class="fas fa-check icon"></i>
                                </span>
                                <p class="hint">{{item.name}}</p>
                            </label>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-between row" v-if="loading">
                    <div v-for="i in 4" :key="i" class="col-12 col-md-6 mb-4">
                        <Skeleton height="20px" width="100px" class="slider-img rounded-2"></Skeleton>
                    </div>
                </div>
                <MultiRangeSlider
                    baseClassName="multi-range-slider-bar-only mb-2"
                    :minValue="oBarMinValue"
                    :maxValue="oBarMaxValue"
                    :max="max_price"
                    :min="min_price"
                    :rangeMargin="0"
                    @input="update_oBarValues"
                />

                <p class="text-center range-text mb-4"> {{oBarMinValue}}  {{ $t('Global.Rs') }} - {{oBarMaxValue}} {{ $t('Global.Rs') }}</p>

                <div class="section-btns d-flex justify-content-center">
                    <button type="submit" class="custom-btn sm"> {{$t('Auth.confirmation')}} </button>
                </div>
            </form>

        </Dialog>
    </div>
</template>

<script setup>
    definePageMeta({
    name: "Titles.cars",
    middleware: 'auth',
})

// response
const { response } = responseApi();
// axios
const axios = useApi();
const loading = ref(true);

import MultiRangeSlider from "multi-range-slider-vue";
import "../node_modules/multi-range-slider-vue/MultiRangeSliderBlack.css";
import "../node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css";

const filtering_dialog = ref(false);
const checkedIds = ref([]);
const oBarMinValue = ref(0);
const oBarMaxValue = ref(0);
const searchTerm = ref('');
const min_price = ref();
const max_price = ref();
// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();


const brands = ref([]);

const cars = ref([]);
const update_oBarValues = (e) => {
    oBarMinValue.value = e.minValue;
    oBarMaxValue.value = e.maxValue;
};


const saveFormData = (id) => {
            // Get existing form data from localStorage or initialize it as an empty object
            let formData = JSON.parse(localStorage.getItem('formData')) || {};
            
            // Save the clicked car ID to the formData object
            formData.carId = id;
            
            // Save the updated formData back to localStorage
            localStorage.setItem('formData', JSON.stringify(formData));

};

const filterDialog = async () => {
    filtering_dialog.value = true;
    await getBrands();
};

// get brands data
const getBrands = async () => {
    await axios.get('brands').then(res => {
        if (response(res) == "success") {
            brands.value = res.data.data;
        }
    }).catch(err => console.log(err));
};

// get cars
const getCars = async () => {
    loading.value = true;
    const rentalData = JSON.parse(localStorage.getItem('formData'));
    await axios.get(`cars?rental_type_id=${rentalData.rentalType.id}&car_category_id=${rentalData.selectedCarId}`).then(res => {
        if (response(res) == "success") {
            cars.value = res.data.data.data;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
            min_price.value = res.data.data.min_price;
            max_price.value = res.data.data.max_price;
        }
        loading.value = false;
    }).catch(err => console.log(err));

};

// filtering data by brand and range slider
const submitData = async () => {
    loading.value = true;
    const rentalData = JSON.parse(localStorage.getItem('formData'));
    await axios.get(`cars?from=${oBarMinValue.value}&to=${oBarMaxValue.value}&brand_id=${checkedIds.value}&rental_type_id=${rentalData.rentalType.id}&car_category_id=${rentalData.selectedCarId}`).then(res => {
        if (response(res) == "success") {
            filtering_dialog.value = false;
            checkedIds.value = [];
            oBarMinValue.value = 0;
            oBarMaxValue.value = 0;
            cars.value = res.data.data.data;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
        }
        loading.value = false;
    }).catch(err => console.log(err));
};

// filtering data by brand 
const filterCars = () => {
    const rentalData = JSON.parse(localStorage.getItem('formData'));
    loading.value = true;
    axios.get(`cars?search=${searchTerm.value}&rental_type_id=${rentalData.rentalType.id}&car_category_id=${rentalData.selectedCarId}`).then(res => {
        if (response(res) == "success") {
            cars.value = res.data.data.data;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
            console.log('filterCars', res.data.data.data);
            loading.value = false;

        }
    })
    console.log('filterCars');
};

// pagination
const onPaginate = (e) => {
    loading.value = true;
    currentPage.value = e.page + 1;
    window.scrollTo(0, 0);
    getCars();
};


let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value
});


onMounted(async () => {
    await getCars();
});

</script>

<!-- <script>
import MultiRangeSlider from "multi-range-slider-vue";
import "../node_modules/multi-range-slider-vue/MultiRangeSliderBlack.css";
import "../node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css";
import image_1 from '@/assets/images/2.png';
export default {
    components: {
    MultiRangeSlider
  },
    data() {
        return {

            filtering_dialog: false,
            checkedIds: [],
            oBarMinValue: 150,
            oBarMaxValue: 350,
            // test filter
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
            brands: [
                {
                    id: 1,
                    name: 'هوندا'
                    
                },
                {
                    id: 2,
                    name: 'رولز رويس'
                },
                {
                    id: 3,
                    name: 'بي إم دبليو'

                },
                {
                    id: 4,
                    name: 'نيسان'
                }
            ],
        }
    },

    methods: {
        submitData() {
            this.filtering_dialog = false;
        },
        update_oBarValues(e) {
        this.oBarMinValue = e.minValue;
        this.oBarMaxValue = e.maxValue;
        },
        // test filter
        onPaginate(e) {
            this.currentPage = e.page + 1;
            window.scrollTo(0, 0);
        },

        filterData(data) {
            this.cars = data;
        },

        filterDialog() {
            this.filtering_dialog = true;
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
        },

        minValue() {
      return 0; // Minimum value of the slider
    },
    maxValue() {
      return this.totalRange; // Maximum value of the slider
    },
  }
}

</script> -->

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
        box-shadow: 0px 0px 2px 0px rgba(128, 128, 128, 20%);
        .car-img {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 10px;
            flex-shrink: 0;
            margin-inline-end: 20px;
            margin-bottom: 10px;
            @media (max-width: 768px) {
                margin-inline-end: 0;
            }
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
                max-width: 150px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                direction: ltr;
                
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

<style lang="scss">

.multi-range-slider-bar-only .bar {
    direction: ltr;
}

.multi-range-slider-bar-only .bar-left, .multi-range-slider-bar-only .bar-right {
    background-color: #E9E9E9;
    box-shadow: inset 0px 0px 5px #E9E9E9;
}

.bar-inner-left, .bar-inner-right, .multi-range-slider-bar-only .thumb::before {
    background-color: var(--main);
    box-shadow: none;
    border: 1px solid var(--main);
}

.multi-range-slider-bar-only .bar-inner {
    background-color: var(--main);
    border: 1px solid var(--main);
    box-shadow: inset 0px 0px 5px var(--main);
}

.multi-range-slider-bar-only .thumb .caption * {
    color: var(--wh);
    background-color: var(--main);
}

</style>