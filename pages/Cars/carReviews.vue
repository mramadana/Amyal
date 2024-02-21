<template>
    <div class="container">
        <div class="layout-form custom-width lg">
            <h1 class="main-title bold lg mb-4">{{ $t("Global.car_reviews") }}</h1>
            <div class="view-all justify-content-center mb-4">
                <div class="hint">
                    <i class="fas fa-star"></i>
                    4.5
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 mb-4" v-for="review in results" :key="review.id">
                    <div class="sec-reviews layout-form mb-0">
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

            <!--***** Paginator *****-->
            <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-5 paginate-parent" dir="ltr" />
        </div>
    </div>
</template>

<script>
    definePageMeta({
        name: "Global.car_reviews",
    });
import image_1 from '@/assets/images/profile_img.jpg';
export default {
    
    name: "carReviews",
    data() {
        return {
            
            "results": [
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
</script>