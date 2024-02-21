<template>

    <div>
        <div class="container">
            <div class="layout-form custom-width lg">
                <h1 class="main-title bold lg mb-4">{{ $t("Global.order_details") }}</h1>
    
                <ClientOnly>
                    <ul :class="{ 'steps': true, 'small': rentalOptionCheck }">
                        
                        <li :class="{ 'step-item active': true }" v-if="!rentalOptionCheck">
                            <div class="icon-done">
                            <i class="fas fa-check icon"></i>
                            </div>
                            <span class="progress-label"> {{ $t("Global.waiting") }} </span>
                        </li>
            
                        <li :class="{ 'step-item': true, 'active': order == 2 || order == 3 || order == 4 }" v-if="!rentalOptionCheck">
                            <div class="icon-done">
                            <i class="fas fa-check icon"></i>
                            </div>
                            <span class="progress-label">{{ $t("Global.pay") }}</span>
                        </li>
        
                        <li :class="{ 'step-item': true, 'activeState': rentalOptionCheck, 'active': order == 3 || order == 4 }">
                            <div class="icon-done">
                            <i class="fas fa-check icon"></i>
                            </div>
                            <span class="progress-label">{{ $t("Global.current") }}</span>
                        </li>
            
                        <li :class="{ 'step-item': true, 'active': order == 4 }">
                            <div class="icon-done">
                            <i class="fas fa-check icon"></i>
                            </div>
                            <span class="progress-label">{{ $t("Global.finished") }}</span>
                        </li>
                    </ul>
    
                    <div class="steps-content mt-5" v-if="rentalOptionCheck">
                        <span class="hint"> * &nbsp; &nbsp; {{ $t("Global.congratulations") }} !</span> {{ $t("Global.payment_successfully") }} 
                    </div>
                </ClientOnly>
    
                <div class="row mt-5">
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
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mb-5">
                        <div class="layout-form sm-radius">
                            <div class="head-form">
                                <h3 class="main-title mb-0">{{ $t("Global.total") }} :</h3>
                            </div>
                            <div class="car-info">
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info price-bg">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mb-5">
                        <div class="layout-form sm-radius">
                            <div class="head-form">
                                <h3 class="main-title mb-0">{{ $t("Global.reservation_details") }} :</h3>
                            </div>
                            <div class="car-info">
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                                <div class="info price-bg">
                                    <span class="name">سيارة هوندا فاخرة</span>
                                    <span class="value">سيارة هوندا فاخرة</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mb-5">
                        <div class="layout-form sm-radius">
                            <div class="head-form">
                                <h3 class="main-title mb-0">{{ $t("Global.notes") }} :</h3>
                            </div>
                            <div class="car-info">
                                <div class="info">
                                    <span class="name">هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <button type="button" v-if="order == 2" @click="orderPaying" class="custom-btn lg mr-auto">{{ $t("Global.pay_now") }}</button>

                <button type="button" v-if="order == 3" @click="continuation" class="custom-btn lg mr-auto">{{ $t("Global.receive") }}</button>

                <button type="button" v-if="order == 4" @click="serviceRating" class="custom-btn lg mr-auto">{{ $t("Global.service_evaluation") }}</button>

            </div>
        </div>
    
        <!-- Dialog of activation Code -->
    
        <DialogsOrdersActivationCode ref="activationCode" />

        <!-- Dialog of service rating  -->

        <DialogsOrdersServiceEvaluation ref="serviceRating" />

        <!-- order Paying dialog -->
        <DialogsOrdersOrderPaying ref="orderPaying" />
    </div>

</template>

<script>
definePageMeta({
    name: "Global.order_details",
});
export default {
    data() {
        return {
            order: 3,
            rentalOptionCheck: false,
        }
    },
    
    methods: {
        rentalOption() {
            const formDataString = localStorage.getItem('formData');

            // Check if formDataString exists in localStorage
            if (formDataString) {
                // Parse the JSON string back into an object
                const formData = JSON.parse(formDataString);

                // Check if rentalOption is equal to "with_driver"
                if (formData.rentalOption === "without_driver") {
                    this.rentalOptionCheck = true;
                }
            }
        },

        continuation() {
            if(JSON.parse(localStorage.getItem('formData')).rentalOption === "with_driver") {
                console.log("with driver");
            } else {
                console.log("without driver");
            }
            this.$refs.activationCode.verifyCode = true;

        },

        // service rating dialog
        serviceRating() {
            this.$refs.serviceRating.serviceRating = true;
        },

        // order paying dialog

        orderPaying() {
            this.$refs.orderPaying.orderpaying = true;
        }
    },

    mounted() {
        this.rentalOption(); 
        // this.continuation();
    },

}
</script>

<style lang="scss">
    .steps {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 700px;
    max-width: 100%;
    margin: 0 auto 20px;

    &::before {
        content: "";
        position: absolute;
        width: 71%;
        height: 2px;
        background: var(--main);
    }
    &.small {
        &::before {
            width: 50%;
        }
    }
    .icon-done {
        width: 28px;
        height: 28px;
        background-color: #BDBDBD;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        position: relative;
        transition: all 0.3s ease-out;
        z-index: 4;
        .icon {
        display: none;
        }
        &::before {
        content: "";
        width: 100%;
        height: 100%;
        padding: 17px;
        position: absolute;
        border: 1.6px dashed transparent;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 50%;
        transition: all 0.3s ease-out;
        }
    }

    .progress-label {
        color: #828282;
    }
    .step-item {
        flex-grow: 1;
        margin: 0 auto;
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        transform: translateY(15px);
        gap: 10px;

        &.active, &.activeState {
        .icon-done {
            background-color: var(--main);
            color: #fff;
            .icon {
            display: block;
            }

            &::before {
            border-color: var(--main);
            }
        }

        .progress-label {
            color: #333333;
        }
        }
    }
    }

    .steps-content {
        width: 400px;
        background: rgba(224, 148, 65, 20%);
        margin: 0 auto;
        max-width: 100%;
        padding: 10px 15px;
        text-align: start;
        border-radius: 5px;
        gap: 10px;
        display: flex;
        font-size: 15px;
        font-weight: bold;
        .hint {
            color: var(--main);
        }
    }
</style>