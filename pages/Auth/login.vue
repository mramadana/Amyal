<template>
    <div class="container">
        <div class="layout-form custom-width">
            <h1 class="main-title bold lg mb-4">{{ $t("Auth.login") }}</h1>
            <form @submit.prevent="submitData">
                <div class="row">
                    <div class="col-12 col-md-8 mr-auto">

                        <ul class="nav nav-pills mb-5 tab-btns-login" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active login-shape" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"><span class="login-text">{{ $t('Auth.mobile_number') }}</span></button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link login-shape" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"><span class="login-text">{{ $t('Auth.email') }}</span></button>
                            </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div class="form-group">
                                    <label class="label">
                                        {{ $t('Auth.mobile_number') }}
                                        <span class="hint-red">*</span>
                                    </label>
                                    <div class="with_cun_select">
                                        <input type="number" class="main_input" name="name" v-model="name" :placeholder="$t('Auth.please_mobile_number')">
                                        <div class="card d-flex justify-content-center dropdown_card">
                                        <Dropdown
                                        v-model="selectedCountry"
                                        :options="countries"
                                        optionLabel="name"
                                        >
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex-group-me">
                                            <img
                                                :alt="slotProps.value.label"
                                                :src="slotProps.value.image"
                                                :class="`mr-2 flag flag-${slotProps.value.key.toLowerCase()}`"
                                                style="width: 24px"
                                            />
                                            <div>{{ slotProps.value.key }}</div>
                                            </div>
                                            <span v-else>
                                            {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="flex-group-me">
                                            <img
                                                :alt="slotProps.option.label"
                                                :src="slotProps.option.image"
                                                :class="`mr-2 flag flag-${slotProps.option.key.toLowerCase()}`"
                                                style="width: 24px"
                                            />
                                            <div>{{ slotProps.option.key }}</div>
                                            </div>
                                        </template>
                                        </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <div class="form-group">
                                    <label class="label">
                                        {{ $t('Auth.email') }}
                                        <span class="hint-red">*</span>
                                    </label>
                                    <input type="text" class="main_input" name="name" v-model="name" :placeholder="$t('Auth.email')">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="label">
                                {{ $t('Auth.password') }} 
                                <span class="hint-red">*</span>
                            </label>
                            <div class="main_input with_icon">
                                <input :type="inputType" class="custum-input-icon" name="password" v-model="password"
                                    :placeholder="$t('Auth.please_enter_password')">
                                <button class="static-btn" type="button" @click="togglePasswordVisibility"
                                    :class="{ 'active_class': passwordVisible }">
                                    <i class="far fa-eye icon"></i>
                                </button>
                            </div>
                        </div>

                        <nuxt-link to="restorePassword">
                            <p class="f-password">{{ $t('Auth.forget_password') }}</p>
                        </nuxt-link>

                        <button type="submit" class="custom-btn w-100 mr-auto"> {{ $t('Auth.login') }} </button>

                        <div class="new-sign mt-4">
                            {{ $t('Auth.dont_have_account') }}
                            <nuxt-link to="/Auth/register" >{{ $t('Auth.create_account') }}</nuxt-link>
                        </div>
                        
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

definePageMeta({
    name: "Auth.login",
    middleware: "auth",
});
import dropdown_img from '@/assets/images/Flag.webp';
import dropdown_img_1 from '@/assets/images/messi.gif';

export default {
    data() {
        return {
            name: '',
            password: '',
            passwordVisible: false,
            selectedCountry: {
                    key: "+966",
                    code: "SA",
                    image: dropdown_img,
            },
            countries: [
                {
                key: "+966",
                code: "SA",
                image: dropdown_img_1,
                },
                {
                key: "+20",
                code: "Eg",
                image: dropdown_img_1,
                },
            ],
        };
    },

    methods: {
        handellAddress(event) {
            this.location = event.address;
            this.lat = event.info.geometry.location.lat();
            this.lng = event.info.geometry.location.lng();
            console.log(this.location, "location");
            console.log(this.lat, "lat");
            console.log(this.lng, "lng");
            console.log("event");
        },

        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible;
        },

        submitData() {
            this.$router.push('/');
        }
    },

    computed: {
        inputType() {
            return this.passwordVisible ? 'text' : 'password';
        },
    },
    

};
</script>



<style lang="scss">
    .login-text {
        position: relative;
        z-index: 1;
    }
    .login-shape {
        width: 200px;
        padding: 6px 10px;
        text-align: center;
        border: 1px solid var(--main);
        color: var(--main);
        border-radius: 10px;
        transition: all 0.5s ease-in-out;
        overflow: hidden;
        position: relative;
        &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            transition: all 0.5s linear;
            background-color: var(--main) !important;
            color: #fff !important;
            top: 0px;
            left: 0;
            z-index: -1;
            transform: scaleX(0);
        }
        &:hover {
            color: #fff !important;
            &::before {
                transform: scaleX(1);
                z-index: 1;
            }
        }
        &.active {
            color: #fff;
            &::before {
                transform: scale(1);
                z-index: 1;
            }
        }
    }

    .tab-btns-login {
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
        .nav-link {
        line-height: 20px;
        padding: 10px;
        width: auto;
        min-width: 130px;
        font-size: 14px;
        &.active {
            background-color: unset;
            color: #fff;
            &::before {
            transform: scale(1);
            color: #fff;
            }
        }
        }
    }
</style>
