<template>
    <div class="container">
        <div class="layout-form custom-width lg">
            <h1 class="main-title bold lg mb-4">{{ $t("Global.car_details") }}</h1>

            <h3 class="main-title mb-5">{{ car_details.name }}</h3>

            <div class="d-flex align-items-center justify-content-center" v-if="loading">
                <skeleton width="120px" height="15px" class="mb-4" />
            </div>

            <img  v-if="!loading" :src="car_details.image" loading="lazy" alt="car-img" class="car-img w-100">

            <div v-if="loading">
                <skeleton width="100%" height="250px" class="mb-4" />
            </div>
            <div class="row">

                <div class="col-12 col-md-6 mb-5">
                    <div class="layout-form sm-radius" v-if="!loading">
                        <div class="head-form">
                            <h3 class="main-title mb-0">{{ $t("Global.car_details") }} :</h3>
                        </div>
                        <div class="car-info">
                            <div class="info">
                                <span class="name">{{ $t("Global.brand") }}</span>
                                <span class="value">{{ car_details.brand }}</span>
                            </div>
                            <div class="info model-bg">
                                <span class="name">{{ $t("Global.car_model") }}</span>
                                <span class="value">{{ car_details.model }}</span>
                            </div>
                            <div class="info">
                                <span class="name">{{ $t("Global.manufacturing_year") }}</span>
                                <span class="value">{{ car_details.manufacture_year }}</span>
                            </div>
                            <div class="info rent-bg">
                                <span class="name">{{ $t("Global.daily_rent")}}</span>
                                <span class="value main-cl">{{ first_price }}</span>
                            </div>
                            <div class="info rent-mounth">
                                <span class="name">{{ $t("Global.monthly_rent")}}</span>
                                <span class="value main-cl">{{ second_price }}</span>
                            </div>
                            <div class="info rent-bg">
                                <span class="name">{{ $t("Global.yearly_rent")}}</span>
                                <span class="value main-cl">{{ third_price }}</span>
                            </div>
                        </div>

                    </div>
                    <div class="car-info" v-if="loading">
                        <skeleton width="100%" height="250px" class="mb-4" />
                    </div>
                </div>
                
                <div class="col-12 col-md-6 mb-5">
                    <div class="layout-form sm-radius">
                        <div class="head-form">
                            <h3 class="main-title mb-0">{{ $t("Global.car_reviews") }} :</h3>
                            <div class="view-all">
                                <div class="hint">
                                    <i class="fas fa-star"></i>
                                    {{ car_details.rate }}
                                </div>
                                <NuxtLink to="/cars/carReviews" class="link">{{ $t("Global.view_all") }}</NuxtLink>
                            </div>
                        </div>
                        <div class="car-info main-rev" v-if="!loading">
                            <div v-if="rates.length">
                                <div v-for="review in rates" :key="review.id" class="sec-reviews">
                                    <img :src="review.user_image" alt="customer-img" class="customer-img">
                                    <div class="info w-100">
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
                            <div v-else>
                                <p class="no-data text-center p-3">{{ $t("Global.no_rates") }}</p>
                            </div>
                        </div>

                        <div class="layout-card mb-4" v-if="loading">
                            <div v-for="i in 2" :key="i" class="sec-reviews align-items-center">
                                <skeleton shape="circle" size="5rem" class="customer-img" />
                                <div class="info">
                                    <skeleton width="5rem" height=".7rem" class="mb-4" />
                                    <div class="hint-info gap-3">
                                        <skeleton width="7rem" height=".7rem" class="mx-auto" />
                                        <skeleton width="5rem" height=".7rem" class="mx-auto" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-8 mr-auto d-flex justify-content-center">
                    <Nuxt-link to="/orders/rentalreQuest" class="custom-btn lg bold">طلب تأجير</Nuxt-link>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>

    definePageMeta({
        middleware: 'auth',
        name: "Titles.car_details",
    });

    const first_price = ref(null);
    const second_price = ref(null);
    const third_price = ref(null);

    const { id } = useRoute().params;

    const axios = useApi();

    const { response } = responseApi();

    const car_details = ref([]);
    const rates = ref([]);
    const loading = ref(true);

    // get car details
    const getCarDetails = async () => {
        loading.value = true;
        const rentalData = JSON.parse(localStorage.getItem('formData'));
        await axios.get(`car-details?car_id=${rentalData.carId}`).then(res => {
            if (response(res) == "success") {
                car_details.value = res.data.data;
                rates.value = res.data.data.rates;
                first_price.value = car_details.value.price[0].price;
                second_price.value = car_details.value.price[1].price;
                third_price.value = car_details.value.price[2].price;
                console.log('car_detailseeeeeeeeeeeeeeee', first_price.value, second_price.value, third_price.value);
            }
            loading.value = false;
        }).catch(err => console.log(err));
    };


   onMounted(() => {
        getCarDetails();
    });

</script>

<!-- <script>
    import image_1 from '@/assets/images/profile_img.jpg';
    export default {
        data() {
            return {
                // title: this.$t("Titles.home"),
                
                "rates": [
                    {
                        "id": "65586fb1d29f8bf44f1cfc05",
                        "name": "عمرو عميل",
                        "image": image_1,
                        "comment": "good",
                        "rate": 2,
                        "timeAdd": "منذ ٨ أيام"
                    },
                    {
                        "id": "65586d5805934df2e5093f76",
                        "name": "عمرو عميل",
                        "image": image_1,
                        "comment": "good",
                        "rate": 4,
                        "timeAdd": "منذ ٨ أيام"
                    },
                ]
            }
        },
    }
</script> -->

<style lang="scss">
    .car-img {
        height: auto;
        max-height: 300px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 30px;
    }

</style>




