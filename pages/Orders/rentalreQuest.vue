<template>
    <div>
        <div class="container">
            <div class="layout-form custom-width lg">
                <h1 class="main-title bold lg mb-4">{{ $t("Global.rental_request") }}</h1>
                <form @submit.prevent="submitData">
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
                                    />
                                    <button class="static-btn" type="button"><i class="far fa-calendar-alt icon"></i></button>
                                </div>
                            </div>
    
                            <div class="form-group" @click="time_receipt_dialog = true">
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
                                    <Calendar id="calendar-timeonly" v-model="time" timeOnly :placeholder="$t('Global.return_time')"/>
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
                                    <input type="text" class="location_input" name="location" v-model="location_3" label="Show" icon="pi pi-external-link" @click="place_of_deliveryDialog_3 = true" readonly>
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
                                    <img src="@/assets/images/noun_upload.png" alt="default-img" :class="{'hidden-default' : uploadedImage.length > 0, 'default-class': true}">
                                    <span>{{ $t('Global.attach_photo') }}</span>
                                    <GlobalImgUploader acceptedFiles="image/*" :newImages="logo" name="logo" @uploaded-images-updated="updateUploadedImages_1" />
                                </div>
                            </div>
    
                            <div class="form-group" v-if="rentalOptionCheck">
                                <label class="label">
                                    {{ $t('Global.driver_license') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="input_auth without-edit">
                                    <img src="@/assets/images/noun_upload.png" alt="default-img" :class="{'hidden-default' : uploadedImage.length > 0, 'default-class': true}">
                                    <span>{{ $t('Global.attach_photo') }}</span>
                                    <GlobalImgUploader acceptedFiles="image/*" :newImages="logo" name="logo" @uploaded-images-updated="updateUploadedImages_2" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Global.notes') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <textarea class="main_input main_area" :placeholder="$t('Global.notes')"></textarea>
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
                                                <input type="radio" name="insurance" v-model="insurance" value="true" class="d-none new-mark" checked>
                                                <span class="mark new-mark"></span>
                                                <p class="hint">{{$t('Global.yes')}}</p>
                                            </label>
                                            <label class="custom-radio">
                                                <input type="radio" name="insurance" v-model="insurance" value="false" class="d-none new-mark">
                                                <span class="mark new-mark"></span>
                                                <p class="hint">{{$t('Global.no')}}</p>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="layout-info first" v-if="insurance === 'true'">
                                        
                                        <div class="info">
                                            <span class="name">{{ $t('Global.the_monthly_rent') }}</span>
                                            <span class="value">150.00 رس</span>
                                        </div>
                                        <div class="info">
                                            <span class="name">{{ $t("Global.number_rental_months") }}</span>
                                            <span class="value">2 شهر</span>
                                        </div>
                                        <div class="info">
                                            <span class="name">{{ $t("Global.total_rental_price") }}</span>
                                            <span class="value">300 رس</span>
                                        </div>
                                        <div class="info">
                                            <span class="name">{{ $t("Global.total_insurance_price") }}</span>
                                            <span class="value">160.00 رس</span>
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

                                    <div class="layout-info second" v-else>
                                        
                                        <div class="info">
                                            <span class="name">{{ $t('Global.the_monthly_rent') }}</span>
                                            <span class="value">150.00 رس</span>
                                        </div>
                                        <div class="info">
                                            <span class="name">{{ $t("Global.number_rental_months") }}</span>
                                            <span class="value">2 شهر</span>
                                        </div>
                                        <div class="info">
                                            <span class="name">{{ $t("Global.total_rental_price") }}</span>
                                            <span class="value">300 رس</span>
                                        </div>
                                        <div class="info">
                                            <span class="name">{{ $t("Global.total_insurance_price") }}</span>
                                            <span class="value">160.00 رس</span>
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

                            <button type="submit" class="custom-btn w-100"> {{ $t('Global.send_request') }} </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>

        <!-- map dialogs -->

        <!-- location 3 -->
        <ClientOnly v-if="!rentalOptionCheck">
            <Dialog v-model:visible="place_of_deliveryDialog_3" modal class="custum_dialog_width" :draggable="false">
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

        
        <!-- place_of_deliveryDialog map -->
        <ClientOnly v-if="rentalOptionCheck">
            <Dialog v-model:visible="place_of_deliveryDialog" modal class="custum_dialog_width" :draggable="false">
                <div class="text-center">
                    <p class="main-title mb-4">{{ $t('Global.place_of_delivery') }}</p>
                        <Googlemap
                            height="300px"
                            apiKey="AIzaSyAboccHIj2gkfRleovrCxpYdePLR6ao1EY"
                            @change-address="handellAddress($event, 'place_of_delivery')"
                            :autocomplete="false"
                            :language="language"
                            class="autocomplete-dropdown"
                            :location="first_location"
                        />
                </div>
            </Dialog>
        </ClientOnly>

        <!-- Return_locationDialog map -->
        <ClientOnly v-if="rentalOptionCheck">
            <!-- Return_locationDialog -->
            <Dialog v-model:visible="Return_locationDialog" modal class="custum_dialog_width" :draggable="false">
                <div class="text-center">
                    <p class="main-title mb-4">{{ $t('Global.return_location') }}</p>
                    <Googlemap
                        height="300px"
                        apiKey="AIzaSyAboccHIj2gkfRleovrCxpYdePLR6ao1EY"
                        @change-address="handellAddress($event, 'Return_locationDialog')"
                        :autocomplete="false"
                        :language="language"
                        class="autocomplete-dropdown"
                        :location="second_location"
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
        <DialogsOrdersSentSuccessfully ref="sentSuccessfully" :orderId="orderId" />

        <!-- paying dialog -->
        <DialogsOrdersRentalPaying ref="paying" :orderId="orderId" />
    </div>
</template>

<script setup>
    import Googlemap from 'vue-google-maps-ui';
    definePageMeta({
    name: "Global.rental_request",
});
</script>

<script>

export default {

    data() {
        return {
            location_3: '',
            place_of_deliveryDialog_3: false,
            third_location: {
                lat: '',
                lng: '',
            },
            orderId: null,
            today: new Date(),
            rentalOptionCheck: false,
            place_of_deliveryDialog: false,
            Return_locationDialog: false,
            location: '',
            location_2: '',
            first_location: {
                lat: '',
                lng: '',
            },

            second_location: {
                lat: '',
                lng: '',
            },

            language: 'ar',
            uploadedImage: [],
            insurance: 'true',
            time: null,
            received_date: null,
            return_date: null,
            time_receipt_dialog: false,
            selectedDayId: null,
            selectedDayName: '',
            time_receipt: [
                {
                    id: 1,
                    name: "10:00 pm",
                },
                {
                    id: 2,
                    name: "9:00 pm",
                },
                {
                    id: 3,
                    name: "5:00 pm",
                },
                {
                    id: 4,
                    name: "2:00 pm",
                },
                {
                    id: 5,
                    name: "5:00 pm",
                },
            ],
        };
    },

    methods: {

        setSelectedDay() {
            // Find the selected day object based on the selectedDayId
            const selectedDay = this.time_receipt.find(day => day.id === this.selectedDayId);
            if (selectedDay) {
                // Update selectedDayName with the name of the selected day
                this.selectedDayName = selectedDay.name;
            } else {
                // Handle if no day is selected
                this.selectedDayName = '';
            }
            // Close the dialog if needed
            this.time_receipt_dialog = false;
        },

        updateUploadedImages_1(images) {
            this.uploadedImage = images;
        },

        updateUploadedImages_2(images) {
            this.uploadedImage = images;
        },

        handellAddress(event, locationType) {
                if(locationType === 'place_of_delivery') {
                    this.first_location.lat = 31.0281208;
                    this.first_location.lng = 31.3814776;
                    if (event && event.address) {
                        this.location = event.address;
                        console.log(this.location, "location");
                        console.log(this.first_location, "first location");
                        console.log(this.second_location, "second location");
                    }
                } else if(locationType === 'Return_locationDialog') {
                    this.second_location.lat = 31.0627371;
                    this.second_location.lng = 31.4024261;
                    if (event && event.address) {
                        this.location_2 = event.address;
                        console.log(this.location_2, "location_2");
                    }
                } else if (locationType === 'place_of_delivery_3') {
                    this.location_3 = event.address;
                    this.third_location.lat = event.info.geometry.location.lat();
                    this.third_location.lng = event.info.geometry.location.lng();
                    console.log(this.third_location, "third location 33333333333");
                }
            },

        submitData() {
            this.orderId = Math.floor(Math.random() * 10);
            console.log(this.orderId, "orderId here");

            if(JSON.parse(localStorage.getItem('formData')).rentalOption === "with_driver") {
                this.$refs.sentSuccessfully.sent_Successfully = true;
                
            } else {
                this.$refs.paying.payingDialog = true;
            }


            // this.$router.push('/orders/orderDetails')
        }
    },
    
    
    mounted() {
        this.language = this.$i18n.locale;

        // Retrieve data from localStorage
        const formDataString = localStorage.getItem('formData');

        // Check if formDataString exists in localStorage
        if (formDataString) {
            // Parse the JSON string back into an object
            const formData = JSON.parse(formDataString);

            // Check if rentalOption is equal to "with_driver"
            if (formData.rentalOption === "without_driver") {
                this.rentalOptionCheck = true;
            }
        };

            // start to handling map locations

            // set location of place of delivery and return location
            const deliveryAddress = { address: '' };
            const returnAddress = { address: '' };

            // Call handellAddress for place of delivery
            this.handellAddress(deliveryAddress, 'place_of_delivery');

            // Call handellAddress for return location
            this.handellAddress(returnAddress, 'Return_locationDialog');
    },
    
}
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