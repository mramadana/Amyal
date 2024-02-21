<template>
    <div class="container">
        <div class="layout-form custom-width lg">
            <h1 class="main-title bold lg mb-4">{{ $t("Global.car_details") }}</h1>
            <h3 class="main-title mb-5">سيارة هوندا فاخرة</h3>
            <img src="@/assets/images/2.png" alt="car-img" class="car-img w-100">
            <div class="row">

                <div class="col-12 col-md-6 mb-5">
                    <div class="layout-form sm-radius">
                        <div class="head-form">
                            <h3 class="main-title mb-0">{{ $t("Global.car_details") }} :</h3>
                        </div>
                        <div class="car-info">
                            <div class="info">
                                <span class="name">سيارة هوندا فاخرة</span>
                                <span class="value">سيارة هوندا فاخرة</span>
                            </div>
                            <div class="info model-bg">
                                <span class="name">سيارة هوندا فاخرة</span>
                                <span class="value">سيارة هوندا فاخرة</span>
                            </div>
                            <div class="info">
                                <span class="name">سيارة هوندا فاخرة</span>
                                <span class="value">سيارة هوندا فاخرة</span>
                            </div>
                            <div class="info rent-bg">
                                <span class="name">سيارة هوندا فاخرة</span>
                                <span class="value">سيارة هوندا فاخرة</span>
                            </div>
                            <div class="info rent-mounth">
                                <span class="name">سيارة هوندا فاخرة</span>
                                <span class="value">سيارة هوندا فاخرة</span>
                            </div>
                            <div class="info rent-bg">
                                <span class="name">سيارة هوندا فاخرة</span>
                                <span class="value">سيارة هوندا فاخرة</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 mb-5">
                    <div class="layout-form sm-radius">
                        <div class="head-form">
                            <h3 class="main-title mb-0">{{ $t("Global.car_reviews") }} :</h3>
                            <div class="view-all">
                                <div class="hint">
                                    <i class="fas fa-star"></i>
                                    4.5
                                </div>
                                <NuxtLink to="/cars/carReviews" class="link">{{ $t("Global.view_all") }}</NuxtLink>
                            </div>
                        </div>
                        <div class="car-info main-rev">
                            <div v-for="review in results" :key="review.id" class="sec-reviews">
                                <img :src="review.image" alt="customer-img" class="customer-img">
                                <div class="info">
                                    <div class="title">
                                        {{ review.name }}
                                        <div class="d-flex align-items-center gap-2">
                                            <i class="far fa-clock clock"></i>
                                            <span class="date">{{ review.timeAdd }}</span>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-start rate-parent mt-2 mb-2 sm-rate">
                                        <Rating v-model="review.rate" readonly :cancel="false" :dir="'ltr'"/>
                                    </div>
                                    <p class="disc">هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق</p>
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
    const { id } = useRoute().params;
    definePageMeta({
    middleware: 'auth',
    name: "Titles.car_details",
});
</script>

<script>
    import image_1 from '@/assets/images/profile_img.jpg';
    export default {
        data() {
            return {
                // title: this.$t("Titles.home"),
                
                "results": [
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
</script>

<style lang="scss">
    .car-img {
        height: auto;
        max-height: 300px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 30px;
    }

</style>




