<template>
    <div class="container">
        <div class="layout-form custom-width lg">
            <h1 class="main-title bold lg mb-4">{{ $t("Global.car_reviews") }}</h1>
            <div class="view-all justify-content-center mb-4">
                <div class="hint" v-if="!loading">
                    <i class="fas fa-star"></i>
                    {{ totalRate }}
                </div>

                <div class="d-flex align-items-center justify-content-between row" v-if="loading">
                    <Skeleton height="25px" width="40px" class="slider-img rounded-2"></Skeleton>
                </div>
            </div>
            <div class="row" v-if="!loading">
                <div class="col-12 col-md-6 mb-4" v-for="review in rates" :key="review.id">
                    <div class="sec-reviews layout-form mb-0">
                        <img :src="review.user_image" alt="customer-img" class="customer-img">
                        <div class="info w-100 text-start">
                            <div class="title">
                                {{ review.user }}
                                <div class="d-flex align-items-center gap-2">
                                    <i class="far fa-clock clock"></i>
                                    <span class="date">{{ review.created_at }}</span>
                                </div>
                            </div>

                            <div class="d-flex justify-content-start rate-parent mt-2 mb-2 sm-rate">
                                <Rating v-model="review.rate" readonly :cancel="false" :dir="'ltr'"/>
                            </div>
                            <p class="disc">{{ review.comment }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nodata d-flex justify-content-center" v-if="rates.length == 0 && !loading">
                    <div class="radio-content">
                        <img  loading="lazy" src="@/assets/images/no_data.avif" alt="image" class="no-data-img car-img">
                        <div class="no-data-text">{{ $t('Global.no_products') }}</div>
                    </div>
                </div>
                    
                <div class="d-flex align-items-center justify-content-between row" v-if="loading">
                    <div v-for="i in 2" :key="i" class="col-12 col-md-6 mb-4">
                        <Skeleton height="100px" class="slider-img rounded-2"></Skeleton>
                    </div>
                </div>

                <!--***** Paginator *****-->
                <div v-if="showPaginate">
                    <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-5 paginate-parent" dir="ltr" />
                </div>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    name: "Global.car_reviews",
});

const totalRate = ref('');


// response
const { response } = responseApi();
// axios
const axios = useApi();
const loading = ref(true);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

const rates = ref([]);

const carRates = async () => {
    loading.value = true;
  const rentalData = JSON.parse(localStorage.getItem("formData"));
  await axios.get(`car-rates?car_id=${rentalData.carId}`).then(res => {
    if (response(res) == "success") {
        rates.value = res.data.data.rate.data;
        totalRate.value = res.data.data.rate_avg;
        totalPage.value = res.data.data.rate.pagination.total_items;
        pageLimit.value = res.data.data.rate.pagination.per_page;
        console.log("carRates", res.data.data.rate.pagination);
    }
    loading.value = false;
  }).catch(err => console.log(err));
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
    await carRates();
});

</script>

<!-- <script>
import image_1 from '@/assets/images/profile_img.jpg';
export default {
    
    name: "carReviews",
    data() {
        return {
            
            "rates": [
                    {
                        "id": "65586fb1d29f8bf44f1cfc05",
                        "name": "عمرو عميل",
                        "image": image_1,
                        "comment": "good",
                        "rate": 1,
                        "timeAdd": "منذ ٨ أيام"
                    },
                    {
                        "id": "65586d5805934df2e5093f76",
                        "name": "عمرو عميل",
                        "image": image_1,
                        "comment": "good",
                        "rate": 2,
                        "timeAdd": "منذ ٨ أيام"
                    },
                    {
                        "id": "99",
                        "name": "محمد رمضان",
                        "image": image_1,
                        "comment": "لاشي",
                        "rate": 3,
                        "timeAdd": "منذ 11 أيام"
                    },
                    {
                        "id": "90",
                        "name": "محمد رمضان",
                        "image": image_1,
                        "comment": "لاشي",
                        "rate": 4,
                        "timeAdd": "منذ 2 أيام"
                    },
            ],
            pageLimit: 5,
            totalPage: 10,
            currentPage: 1,
        };
    },

    methods: {
        onPaginate(e) {
            this.currentPage = e.page + 1;
            window.scrollTo(0, 0);
        },
    }
}
</script> -->
