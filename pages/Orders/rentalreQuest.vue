<template>
    <div>
        <div class="container">
            <div class="layout-form custom-width lg">
                <h1 class="main-title bold lg mb-4">{{ $t("Global.rental_request") }}</h1>
                <form @submit.prevent="submitData" ref="createOrderForm">
                    <div class="row">
                        <div class="col-12 col-md-8 mr-auto">
                            
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Global.received_date') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="card flex justify-content-center with_icon position-relative">
                                    <Calendar
                                        v-model="received_date"
                                        :placeholder="$t('Global.enter_received_date')"
                                        dateFormat="dd/mm/yy"
                                        :minDate="today"
                                        :disabledDates="reservedDates"
                                        class="validInputs"
                                        valid="password"
                                    />
                                    <button class="static-btn" type="button"><i class="far fa-calendar-alt icon"></i></button>
                                </div>
                            </div>
    
                            <div class="form-group" @click="time_receipt_dialogFun">
                                <label class="label">
                                    {{ $t('Global.time_receipt') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="with_icon position-relative">
                                    <input type="text" class="main_input pointer" :value="selectedDayName" :placeholder=" $t('Global.enter_time_receipt')" readonly>
                                    <button class="static-btn" type="button"><i class="fa-regular fa-clock"></i></button>
                                </div>
                            </div>
    
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Global.return_date') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="card flex justify-content-center with_icon position-relative pointer">
                                    <Calendar
                                        v-model="return_date"
                                        :placeholder="$t('Global.enter_return_date')"
                                        dateFormat="dd/mm/yy"
                                        :minDate="today"
                                    />
                                    <button class="static-btn" type="button"><i class="far fa-calendar-alt icon"></i></button>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Global.return_time') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="card flex justify-content-center with_icon position-relative pointer">
                                    <Calendar id="calendar-timeonly" v-model="receive_time" timeOnly :placeholder="$t('Global.return_time')"/>
                                    <button class="static-btn" type="button"><i class="fa-regular fa-clock"></i></button>
                                </div>
                            </div>

                            <!-- maps -->

                            <!-- location 3 -->
                            <div class="form-group" v-if="!rentalOptionCheck">
                                <label class="label">
                                    {{ $t('Global.place_of_delivery') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="main_input with_icon">
                                    <input type="text" class="location_input" v-model="location_3" label="Show" icon="pi pi-external-link" @click="place_of_deliveryDialog_2 = true" readonly>
                                    <button class="static-btn" type="button"><i class="fas fa-map-marker-alt"></i></button>
                                </div>
                            </div>

                            <div class="form-group" v-if="rentalOptionCheck">
                                <label class="label">
                                    {{ $t('Global.place_of_delivery') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="main_input with_icon">
                                    <input type="text" class="location_input" name="location" v-model="location" label="Show" icon="pi pi-external-link" @click="place_of_deliveryDialog = true" readonly>
                                    <button class="static-btn" type="button"><i class="fas fa-map-marker-alt"></i></button>
                                </div>
                            </div>

                            <div class="form-group" v-if="rentalOptionCheck">
                                <label class="label">
                                    {{ $t('Global.return_location') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="main_input with_icon">
                                    <input type="text" class="location_input" name="location_2" v-model="location_2" label="Show" icon="pi pi-external-link" @click="Return_locationDialog = true" readonly>
                                    <button class="static-btn" type="button"><i class="fas fa-map-marker-alt"></i></button>
                                </div>
                            </div>
    
                            <div class="form-group" v-if="rentalOptionCheck">
                                <label class="label">
                                    {{ $t('Global.id_photo') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="input_auth without-edit">
                                    <img src="@/assets/images/noun_upload.png" loading="lazy" alt="default-img" :class="{'hidden-default' : uploadedImage.length > 0, 'default-class': true}">
                                    <span>{{ $t('Global.attach_photo') }}</span>
                                    <GlobalImgUploader acceptedFiles="image/*" name="license_image" @uploaded-images-updated="updateUploadedImages_1" />
                                </div>
                            </div>
    
                            <div class="form-group" v-if="rentalOptionCheck">
                                <label class="label">
                                    {{ $t('Global.driver_license') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="input_auth without-edit">
                                    <img src="@/assets/images/noun_upload.png" loading="lazy" alt="default-img" :class="{'hidden-default' : uploadedImage.length > 0, 'default-class': true}">
                                    <span>{{ $t('Global.attach_photo') }}</span>
                                    <GlobalImgUploader acceptedFiles="image/*" name="identity_image" @uploaded-images-updated="updateUploadedImages_2" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Global.notes') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <textarea class="main_input main_area" name="notes" :placeholder="$t('Global.notes')"></textarea>
                            </div>

                            <div class="layout-form sm-radius mb-5">
                                <div class="head-form">
                                    <h3 class="main-title mb-0" v-if="rentalOptionCheck">{{ $t("Global.full_insurance") }} :</h3>
                                    <h3 class="main-title mb-0" v-else >{{ $t("Global.total") }} :</h3>
                                </div>
                                <div class="car-info">

                                    <div class="info normal mb-3 mt-2" v-if="rentalOptionCheck">
                                        {{ $t('Global.do_you_want_comprehensive_insurance') }}
                                    </div>

                                    <div class="radios custom-pd" v-if="rentalOptionCheck">
                                        <div class="d-flex gap-3">
                                            <label class="custom-radio">
                                                <input type="radio" name="has_insurance" v-model="has_insurance" value="1" class="d-none new-mark" checked>
                                                <span class="mark new-mark"></span>
                                                <p class="hint">{{$t('Global.yes')}}</p>
                                            </label>
                                            <label class="custom-radio">
                                                <input type="radio" name="has_insurance" v-model="has_insurance" value="0" class="d-none new-mark">
                                                <span class="mark new-mark"></span>
                                                <p class="hint">{{$t('Global.no')}}</p>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="layout-info">
                                        
                                        <div class="info">
                                            <span class="name" v-if="rentalOptionCheck">{{ $t('Global.the_monthly_rent') }}</span>
                                            <span class="name" v-if="!rentalOptionCheck">{{ $t('Global.daily_rent') }}</span>
                                            <span class="value">{{ insuranceData.rental_price }} {{ $t("Global.Rs") }}</span>
                                        </div>

                                        <div class="info">
                                            <span class="name" v-if="rentalOptionCheck">{{ $t("Global.number_rental_months") }}</span>
                                            <span class="name" v-if="!rentalOptionCheck">{{ $t("Global.number_rental_days") }}</span>
                                            <div class="value d-flex gap-1">
                                                {{ insuranceData.rental_period }}
                                                <p v-if="rentalOptionCheck">{{ $t("Global.month") }}</p>
                                                <p  v-else>{{ $t("order.day") }}</p>
                                            </div>
                                        </div>

                                        <div class="info">
                                            <span class="name">{{ $t("Global.total_rental_price") }}</span>
                                            <span class="value">{{ insuranceData.total_rental_price }} {{ $t("Global.Rs") }}</span>
                                        </div>

                                        <div class="info" v-if="has_insurance !== '0' && rentalOptionCheck">
                                            <span class="name">{{ $t("Global.total_insurance_price") }}</span>
                                            <span class="value">{{ insuranceData.insurance_price }} {{ $t("Global.Rs") }}</span>
                                        </div>

                                        <div class="info" v-if="!rentalOptionCheck">
                                            <span class="name">{{ $t("Global.driver_fees") }}</span>
                                            <span class="value">{{ insuranceData.driver_price }} {{ $t("Global.Rs") }}</span>
                                        </div>

                                        <div class="info" v-if="rentalOptionCheck">
                                            <span class="name">{{ $t("Global.tamm_platform") }}</span>
                                            <span class="value">{{ insuranceData.tam_price }} {{ $t("Global.Rs") }}</span>
                                        </div>

                                        <div class="info">
                                            <span class="name">{{ $t("Global.value_added_tax") }}</span>
                                            <span class="value">{{ insuranceData.vat_ratio }} {{ $t("Global.Rs") }}</span>
                                        </div>
                                        
                                        <div class="info">
                                            <span class="name">{{ $t("Global.total_price") }}</span>
                                            <span class="value main-cl">{{ insuranceData.final_total }} {{ $t("Global.Rs") }}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="custom-btn w-100">
                                 {{ $t('Global.send_request') }} 
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>

        <!-- map dialogs -->

        <!-- if with with_driver  -->
        <ClientOnly v-if="!rentalOptionCheck">
            <Dialog v-model:visible="place_of_deliveryDialog_2" modal class="custum_dialog_width" :draggable="false">
                <div class="text-center">
                    <p class="main-title mb-4">{{ $t('Global.place_of_delivery') }}</p>
                        <Googlemap
                            height="300px"
                            apiKey="AIzaSyAboccHIj2gkfRleovrCxpYdePLR6ao1EY"
                            @change-address="handellAddress($event, 'place_of_delivery_3')"
                            :autocomplete="true"
                            :language="language"
                            class="autocomplete-dropdown"
                        />
                </div>
            </Dialog>
        </ClientOnly>

        
        <!-- place_of_deliveryDialog map if (without_driver) -->
        <ClientOnly v-if="rentalOptionCheck">
            <Dialog v-model:visible="place_of_deliveryDialog" modal class="custum_dialog_width" :draggable="false">
                <div class="text-center">
                    <p class="main-title mb-4">{{ $t('Global.place_of_delivery') }}</p>
                        <Googlemap
                            height="300px"
                            apiKey="AIzaSyAboccHIj2gkfRleovrCxpYdePLR6ao1EY"
                            :autocomplete="false"
                            :language="language"
                            class="autocomplete-dropdown"
                            :location="defaultLocation"
                        />
                </div>
            </Dialog>
        </ClientOnly>

        <!-- Return_locationDialog map if (without_driver) -->
        <ClientOnly v-if="rentalOptionCheck">
            <!-- Return_locationDialog -->
            <Dialog v-model:visible="Return_locationDialog" modal class="custum_dialog_width" :draggable="false">
                <div class="text-center">
                    <p class="main-title mb-4">{{ $t('Global.return_location') }}</p>
                    <Googlemap
                        height="300px"
                        apiKey="AIzaSyAboccHIj2gkfRleovrCxpYdePLR6ao1EY"
                        :autocomplete="false"
                        :language="language"
                        class="autocomplete-dropdown"
                        :location="defaultLocation"
                    />
                </div>
            </Dialog>
        </ClientOnly>
    
        <!-- time received dialog -->
        <Dialog v-model:visible="time_receipt_dialog" modal class="custum_dialog_width" :draggable="false">
            <div class="text-center">
                <p class="main-title mb-4">{{ $t('Global.time_receipt') }}</p>
                <div class="days-radio">
                    <label class="custom-radio" v-for="(day, curent_indix) in time_receipt" :key="day.id" :data-attr="curent_indix">
                        <input type="radio" name="opinion" :value="day.id" class="d-none" v-model="selectedDayId">
                        <div class="radio-content sm">{{day.name}}</div>
                    </label>
                </div>
                <div class="section-btns">
                    <button type="button" class="custom-btn sm" @click="setSelectedDay"> {{ $t('Auth.confirmation') }} </button>
                    <button class="custom-btn cancel sm" @click="time_receipt_dialog = false">{{ $t('Global.back') }}</button>
                </div>
            </div>
        </Dialog>

        <!-- sent successfully dialog -->
        <DialogsOrdersSentSuccessfully ref="sentSuccessfully" @sentSuccessfully="sentSuccessfullyData" :loading="loading" :orderId="orderId" />

        <!-- paying dialog -->
        <DialogsOrdersRentalPaying ref="paying" :orderId="orderId" :loading="loading" @PaySelected="PaySelected" @paymentDone="paymentsubmitData" />
    </div>
</template>

<script setup>

import Googlemap from 'vue-google-maps-ui';
    definePageMeta({
    name: "Global.rental_request",
});

const createOrderForm = ref(null);
const receive_time = ref(null);

const reservedDates = ref('');


const checkedSelected = ref('');

// response
const { response } = responseApi();
// axios
const axios = useApi();
const loading = ref(true);

// toast
const { successToast, errorToast } = toastMsg();


// pinia store
const store = useAuthStore();
const { token } = storeToRefs(store);

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

// valid variable 

const errors = ref([]);

// my variable
const formattedDate = ref(null);
const formattedDate_2 = ref(null);
const formattedtime = ref(null);
const defaultLocation = ref({
    lat: '',
    lng: '',
});
const paying = ref(false);
const sentSuccessfully = ref(false);
const rentalOptionCheck = ref(false);
const place_of_deliveryDialog_2 = ref(false);
const place_of_deliveryDialog = ref(false);
const Return_locationDialog = ref(false);
const time_receipt_dialog = ref(false);
const selectedDayId = ref(null);
const selectedDayName = ref(null);
const time_receipt = ref([
    {
        id: 1,
        name: "12:00 pm",
    },
    {
        id: 2,
        name: "1:00 pm",
    },
    {
        id: 3,
        name: "2:00 pm",
    },
    {
        id: 4,
        name: "3:00 pm",
    },
    {
        id: 5,
        name: "4:00 pm",
    },
    {
        id: 6,
        name: "5:00 pm",
    },
    {
        id: 7,
        name: "6:00 pm",
    },
    {
        id: 8,
        name: "7:00 pm",
    },
    {
        id: 9,
        name: "8:00 pm",
    },
    {
        id: 10,
        name: "9:00 pm",
    },
    {
        id: 11,
        name: "10:00 pm",
    },
    {
        id: 12,
        name: "11:00 pm",
    },
    {
        id: 13,
        name: "12:00 am",
    },
]);
const language = ref("ar");
const orderId = ref(null);
const insuranceData = ref([]);
const location = ref(null);
const location_2 = ref(null);
const location_3 = ref(null);
const lat = ref('');
const lng = ref('');
const return_date = ref(null);
const uploadedImage = ref([]);
const has_insurance = ref('true');
const received_date = ref(null);
const today = new Date();
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });


const PaySelected = (id) => {
    checkedSelected.value = id;
};


// create order if with driver
const paymentsubmitData = async () => {

    loading.value = true;
    formattedDate.value = formatDate(received_date.value);
    formattedDate_2.value = formatDate(return_date.value);
    formattedtime.value = formatDate(receive_time.value);

    const fd = new FormData(createOrderForm.value);
    const rentalData = JSON.parse(localStorage.getItem('formData'));
    fd.append('type', rentalData.rentalOption);
    fd.append('car_id', rentalData.selectedCarId);
    fd.append('rental_period', rentalData.rentalPeriod);
    fd.append('rental_type_id', rentalData.rentalType.id);
    fd.append('pay_type', checkedSelected.value);
    fd.append('receive_date', formattedDate.value.date);
    // fd.append('receive_time', formattedtime.value.time);
    fd.append('receive_time', selectedDayName.value);
    fd.append('receive_date_2', formattedDate_2.value.date);    
    await axios.post('create-order', fd, config).then(res => {
        if (response(res) == "success") {
            paying.value.payingDialog = false;
            orderId.value = res.data.data;
            navigateTo({path: '/orders/orderDetails/' + orderId.value});
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => console.log(err));
};


// create order if without driver
const sentSuccessfullyData = async () => {

loading.value = true;
formattedDate.value = formatDate(received_date.value);
formattedDate_2.value = formatDate(return_date.value);
formattedtime.value = formatDate(receive_time.value);

const fd = new FormData(createOrderForm.value);
const rentalData = JSON.parse(localStorage.getItem('formData'));
fd.append('type', rentalData.rentalOption);
fd.append('car_id', rentalData.selectedCarId);
fd.append('rental_period', rentalData.rentalPeriod);
fd.append('rental_type_id', rentalData.rentalType.id);
fd.append('receive_date', formattedDate.value.date);
// fd.append('receive_time', formattedtime.value.time);
fd.append('receive_time', selectedDayName.value);
fd.append('receive_date_2', formattedDate_2.value.date);
fd.append('map_desc', location_3.value);
fd.append('lat', lat.value);
fd.append('lng', lng.value);

await axios.post('create-order', fd, config).then(res => {
    if (response(res) == "success") {
        orderId.value = res.data.data;
        localStorage.setItem('orderId', orderId.value);
        navigateTo({path: '/orders/orderDetails/' + orderId.value});

    } else {
        errorToast(res.data.msg);

    }
    loading.value = false;
    
}).catch(err => console.log(err));
};


const time_receipt_dialogFun = () => {
    time_receipt_dialog.value = true
};

// methods

// const formatDate = (date) => {
//       if (!date || !(date instanceof Date)) {
//         // Handle the case where date is null, undefined, or not a Date instance
//         return '';
//       }

//       const year = date.getFullYear();
//       const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
//       const day = date.getDate().toString().padStart(2, '0');

//       return `${year}-${month}-${day}`;
//     };

// method convert to Date lonly, and time only

const formatDate = (dateTime) => {
  if (!dateTime || !(dateTime instanceof Date)) {
    // Handle the case where dateTime is null, undefined, or not a Date instance
    return { date: '', time: '' };
  }

  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = dateTime.getDate().toString().padStart(2, '0');
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const date = `${year}-${month}-${day}`;
  const time = `${hours}:${minutes}`;

  return { date, time };
};

const updateUploadedImages_1 = (images) => {
    uploadedImage.value = images;
};

const updateUploadedImages_2 = (images) => {
    uploadedImage.value = images;
};

const handellAddress = (event) => {
        location_3.value = event.address;
        lat.value = event.info.geometry.location.lat()
        lng.value = event.info.geometry.location.lng()
};


const setSelectedDay = () => {
    // Find the selected day object based on the selectedDayId
    const selectedDay = time_receipt.value.find(day => day.id === selectedDayId.value);
    if (selectedDay) {
        // Update selectedDayName with the name of the selected day
        const hourPart = selectedDay.name.substring(0, selectedDay.name.indexOf(':')); // Extract hour part
        selectedDayName.value = `${hourPart}:00`;
    } else {
        // Handle if no day is selected
        selectedDayName.value = '';
    }
    // Close the dialog if needed
    time_receipt_dialog.value = false;
};

// route to order details

const submitData = async () => {

    if(JSON.parse(localStorage.getItem('formData')).rentalOption == 0) {
        sentSuccessfully.value.sent_Successfully = true;
        
    } else {
        paying.value.payingDialog = true;
    }
}

// get location-data if it (without_driver)

const get_location = async () => {
    loading.value = true;
  await axios.get('location-data').then(res => {
      if (response(res) == "success") {
        defaultLocation.value.lat = Number(res.data.data.lat);
        defaultLocation.value.lng = Number(res.data.data.lng);
        location.value = res.data.data.map_desc;
        location_2.value = res.data.data.map_desc;
    }
    loading.value = false;
  }).catch(err => console.log(err));
};

// get Insurance data
const get_insurance = async () => {
    loading.value = true;
    const rentalData = JSON.parse(localStorage.getItem('formData'));
    const fd = new FormData();
    fd.append('rental_type_id', rentalData.rentalType.id);
    fd.append('car_id', rentalData.selectedCarId);
    fd.append('type', rentalData.rentalOption);
    fd.append('rental_period', rentalData.rentalPeriod);
    await axios.post('order-enquiry', fd, config).then(res => {
        if (response(res) == "success") {
            insuranceData.value = res.data.data;
        }
        loading.value = false;
    }).catch(err => console.log(err));
};

// get unavailable-dates 

const get_unavailable_dates = async () => {
    const rentalData = JSON.parse(localStorage.getItem('formData'));
    loading.value = true;
  await axios.get(`unavailable-dates?car_id=${rentalData.selectedCarId}`, config).then(res => {
      if (response(res) == "success") {
        reservedDates.value = res.data.data.map(
          (dateString) => new Date(dateString)
        );
    }
    loading.value = false;
  }).catch(err => console.log(err));
};

onMounted(() => {

    get_insurance();
    get_unavailable_dates();

    if(localStorage.getItem('locale') === "ar" || localStorage.getItem('locale') === null) {
        language.value = "ar";
    } else {
        language.value = "en";
    }

    // Retrieve data from localStorage
    const formDataString = localStorage.getItem('formData');

    // Check if formDataString exists in localStorage
    if (formDataString) {
        // Parse the JSON string back into an object
        const formData = JSON.parse(formDataString);

        // Check if rentalOption is equal to "with_driver"
        if (formData.rentalOption == 1) {
            rentalOptionCheck.value = true;
            // get location Data if it (without_driver)
            get_location();
            console.log("without_driver", rentalOptionCheck.value);
        };
    };
});

</script>

<style lang="scss">
    .p-datepicker {
        min-width: 300px !important;
        width: 400px !important;
    }

    .p-inputtext {
        padding: 10px 15px;
    }

    .radio-content {
        direction: ltr;
    }
    .GoogleMap {
      background-color: #fff !important;
      .SearchArea {
          border: 0 !important;
          input {
              background-color: #fff !important;
              border-radius: 10px;
              border: 1px solid #229edb !important;
              font-size: 12px;
              margin-bottom: 13px;
          }
      }

    }
    .pac-container {
        z-index: 6666;
    }
</style>

<style lang="scss" scoped>
    .info:nth-child(even) {
        background-color: #F8F8F8;
    }
</style>