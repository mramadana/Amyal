<template>
    <section>
        <div class="inner-app mb-5" v-if="!loading">
            <div class="container">
                <div class="row d-flex align-items-center">
                    <div class="col-12 col-xl-6">
                        <div class="app-info">
                            <h2 class="main-title lg bold mb-4">
                                {{ banner_home.description }}
                            </h2>
                            <div class="app-btns">
                                <NuxtLink :to="banner_home.android_link" class="btn-app d-flex">
                                    <img src="@/assets/images/google-paly-img.png" alt="google-img" class="store-img" />
                                </NuxtLink>
                                <NuxtLink :to="banner_home.ios_link" class="btn-app d-flex">
                                    <img src="@/assets/images/app-store-img.png" alt="app-store" class="store-img"/>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-xl-6">
                        <div class="app-imgs">
                            <div class="frame-img-1">
                                <img src="@/assets/images/frame-img.png" alt="frame-image" class="main-img-1">
                                <!-- <img src="@/assets/images/car-frame-2.png" alt="" class="sub-image"> -->
                                <img :src="banner_home.image" alt="" class="sub-image">
                            </div>
                            <div class="frame-img-2">
                                <img src="@/assets/images/frame-img.png" alt="frame-image" class="main-img-2">
                                <!-- <img src="@/assets/images/car-frame-1.png" alt="" class="sub-image"> -->
                                <img :src="banner_home.image1" alt="" class="sub-image">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <Skeleton width="100%" height="480px" class="slider-img rounded-0"></Skeleton>
        </div>

    </section>
</template>

<script setup>
    defineProps(['banner_home', 'loading'])
</script>




