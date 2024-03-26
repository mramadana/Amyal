<template>
    <div>
        <main>
            <!-- start to main slider  -->
            
            <HomeMainSlider :slider="sliderHome" :loading="loading" class="mb-5"/>
            
            <!-- start to renting cars  -->
            <div class="renting-cars mb-5">
                <div class="container">
                    <form @submit.prevent="submitData" class="form">
                        <div class="mb-5 tab-btns">

                            <label class="custom-radio custom-radio-2">
                                <input type="radio" name="rental" value="1" v-model="rentalOption" class="d-none">
                                <div class="radio-content low-padding">
                                    <p>{{ $t('Home.without_driver') }}</p>
                                </div>
                            </label>

                            <label class="custom-radio custom-radio-2">
                                <input type="radio" name="rental" value="0" v-model="rentalOption" class="d-none">
                                <div class="radio-content low-padding">
                                    <p>{{ $t('Home.with_driver') }}</p>
                                </div>
                            </label>
                        </div>
                        <div class="row justify-content-center mb-4">
                            <div class="col-12 col-md-8">
                                <div class="row">
                                    <div class="col-12 col-md-6 mb-4">
                                        <label class="label">
                                            {{$t('Home.rental_type')}}
                                            <span class="hint-red">*</span>
                                        </label>
                                        <div class="flex justify-content-center dropdown_card">
                                            <Dropdown v-model="rentalType" :options="rentals" optionLabel="name" :placeholder="$t('Home.choose_rental_type')" class="w-full md:w-14rem custum-dropdown" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 mb-4">
                                        <div class="form-group">
                                            <label class="label">
                                                {{$t('Home.rental_period')}}
                                                <span class="hint-red">*</span>
                                            </label>
                                            <input type="number" class="main_input validInputs" valid="rental_period" name="rental_period" v-model="rentalPeriod" :placeholder="$t('Home.choose_rental_period')">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <!-- start to choose cars  -->
                        <HomeChooseCars :cars="cars" :loading="loading" @carSelected="handleCarSelected"/>
    
                        <div v-if="selectedCarId && rentalType != null" class="col-12 col-md-8 mr-auto d-flex justify-content-center">
                            <button type="submit" class="custom-btn lg bold">{{$t('Home.continuation')}}</button>
                        </div>

                        <!-- <div class="col-12 col-md-8 mr-auto d-flex justify-content-center">
                            <button type="submit" :disabled="!selectedCarId && rentalType == null" class="custom-btn lg bold disabled-btn">{{$t('Home.continuation')}}</button>
                        </div> -->
                    </form>
                </div>
            </div>
    
            <!-- start to AppStore section -->
            <homeAppStore :banner_home="banner_home" :loading="loading" />
        </main>
    </div>
</template>

<script setup>

definePageMeta({
    name: "Titles.home",
});


// response
const { response } = responseApi();
// axios
const axios = useApi();
const loading = ref(true);
const banner_home = ref('');
const rentalOption = ref(1);
const rentalPeriod = ref(null);
const selectedCarId = ref(false);
const rentalType = ref(null);
const rentals = ref([]);
const errors = ref([]);

import { useI18n } from 'vue-i18n';

// Toast
const { successToast, errorToast } = toastMsg();
const { t } = useI18n({ useScope: 'global' }); 
const sliderHome = ref([]);

const cars = ref([]);

const handleCarSelected = (id) => {
    selectedCarId.value = id;
};

// validation Function
const validate = () => {
    let allInputs = document.querySelectorAll('.validInputs');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
            errors.value.push(t(`validation.${allInputs[i].getAttribute('valid')}`));
        }
    }
}

const submitData = () => {

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {
        // Create an object to hold all form data
        const formData = {
            rentalOption: rentalOption.value,
            rentalPeriod: rentalPeriod.value,
            rentalType: rentalType.value,
            selectedCarId: selectedCarId.value
        
        };
        
        // Convert the object to a JSON string
        const formDataString = JSON.stringify(formData);
        
        // Save the JSON string into localStorage
        localStorage.setItem('formData', formDataString);
        
        console.log(formDataString, "formDataString");
        
        useRouter().push('/cars');

    }


};

// get home Data 

const getData = async () => {
    loading.value = true;
  await axios.get('home').then(res => {
    if (response(res) == "success") {
       sliderHome.value = res.data.data.slider;
       cars.value = res.data.data.car_categories;
       banner_home.value = res.data.data.website_banner;
    }
    loading.value = false;
  }).catch(err => console.log(err));
};

// get rental type

const getrental = async () => {
    loading.value = true;
  await axios.get('rental-types').then(res => {
    if (response(res) == "success") {
        rentals.value = res.data.data;
    }
    loading.value = false;
  }).catch(err => console.log(err));
};

onMounted(() => {
  getData();
  getrental();
});

</script>



<!-- optional -->

<!-- <script>

// image for test slider
import image_1 from '@/assets/images/1.png';

// image for test cars section
import car_1 from '@/assets/images/car_1.png';
import car_2 from '@/assets/images/car_2.png';
import car_3 from '@/assets/images/car_3.png';
import car_4 from '@/assets/images/car_4.png';
import car_5 from '@/assets/images/car_5.png';

export default {

    data() {
        return {
            rentalOption: 'without_driver',
            rentalPeriod: null,
            selectedCarId: false,
            rentalType: null,
            rentals: [
                { name: 'item 1', code: 'NY' },
                { name: 'Rome', code: 'RM' },
                { name: 'London', code: 'LDN' },
            ],
            products: [
                {
                    image: image_1,
                },
                {
                    image: image_1,
                },
                {
                    image: image_1,
                },
            ],
            cars: [
                {
                    image: car_1,
                    name: "car 1",
                    id: "1",
                },
                {
                    image: car_2,
                    name: "car 2",
                    id: "2",
                },
                {
                    image: car_3,
                    name: "car 3",
                    id: "3",
                },
                {
                    image: car_4,
                    name: "car 4",
                    id: "4",
                },
                {
                    image: car_5,
                    name: "car 5",
                    id: "5"
                },
            ],
        }
    },

    methods: {
        handleCarSelected(selectedCarId) {
            this.selectedCarId = selectedCarId;
            console.log(this.selectedCarId, "selectedCarId");
        },

        submitData() {
        // Create an object to hold all form data
        const formData = {
            rentalOption: this.rentalOption,
            rentalPeriod: this.rentalPeriod,
            rentalType: this.rentalType,
            selectedCarId: this.selectedCarId
        };

        // Convert the object to a JSON string
        const formDataString = JSON.stringify(formData);

        // Save the JSON string into localStorage
        localStorage.setItem('formData', formDataString);
        console.log(formDataString, "formDataString");

        this.$router.push('/cars');
        },

    }
}
</script> -->


<style lang="scss">
    .custom-radio-2 {
        input:checked ~ .radio-content {
            background-color: var(--main);
            color: #fff;
        }
    }
    .low-padding {
        padding: 10px;
    }

    .disabled-btn {
        &:disabled {
            cursor: not-allowed;
            background-color: rgba(229, 229, 229) !important;
            border-color: rgba(229, 229, 229) !important;
            box-shadow: none;
            color: #000;
        }
    }

</style>