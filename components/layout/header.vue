<template>
    <div class="defaultLayout">
        <header class="header" :class="headerClass">
            <div class="container">
                <div class="inner-header">
                    <span class="hint-header"
                        >{{ $t("Home.Welcome_Amial_website") }}
                    </span>
                    <div class="dropdown drop-lang">
                        <a
                            class="dropdown-toggle hint-lang"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <i class="fas fa-globe icon"></i>
                            <div v-if="htmlLang == ''">
                                <p>العربية</p>
                            </div>
                            <div v-else>
                                <p>
                                    {{
                                        htmlLang === "ar"
                                            ? "العربية"
                                            : "english"
                                    }}
                                </p>
                            </div>
                        </a>

                        <ul class="dropdown-menu">
                            <button
                                class="dropdown-item"
                                @click="switchLang('ar')"
                            >
                                العربيه
                            </button>
                            <button
                                class="dropdown-item"
                                @click="switchLang('en')"
                            >
                                English
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="nav-header">
                <div class="container">
                    <div class="inner">
                        <div class="logo">
                            <img
                                src="@/assets/images/logo.png"
                                alt="logo"
                                @click="emitEvent"
                            />
                        </div>
                        <ul
                            class="nav-links"
                            :class="{ active: navLinksActive }"
                        >
                            <li>
                                <NuxtLink to="/" class="link">
                                    {{ $t("Home.home") }}
                                </NuxtLink>
                            </li>

                            <li>
                                <NuxtLink to="/aboutSite" class="link">
                                    {{ $t("Home.about_site") }}
                                </NuxtLink>
                            </li>

                            <li>
                                <NuxtLink to="/connectUs" class="link">
                                    {{ $t("Home.connect_us") }}
                                </NuxtLink>
                            </li>
                        </ul>

                        <div class="left">
                            <button
                                class="dropdown dropdown-profile"
                                v-if="showLogo === 'false'"
                            >
                                <div
                                    class="profile-hint"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src="@/assets/images/profile_img.jpg"
                                        alt="user-image"
                                        class="user-image"
                                    />
                                    <p class="user-name">أحمد محمد</p>
                                </div>
                                <ul
                                    class="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    <nuxt-link
                                        class="dropdown-item"
                                        to="/profile"
                                        >{{
                                            $t("Home.profile_personly")
                                        }}</nuxt-link
                                    >
                                    <nuxt-link
                                        class="dropdown-item"
                                        to="/settings"
                                        >{{ $t("Home.settings") }}</nuxt-link
                                    >
                                    <nuxt-link
                                        class="dropdown-item"
                                        to="/Wallet"
                                        >{{ $t("Home.portfolio") }}</nuxt-link
                                    >
                                    <nuxt-link
                                        class="dropdown-item"
                                        to="/myorders"
                                        >{{ $t("Home.myrequests") }}</nuxt-link
                                    >
                                    <button
                                        type="button"
                                        @click="logoutDialog = true"
                                        class="dropdown-item"
                                    >
                                        {{ $t("Home.logout") }}
                                    </button>
                                    <!-- <nuxt-link class="dropdown-item" to="/Auth/login">{{ $t("Home.logout") }}</nuxt-link> -->
                                </ul>
                            </button>

                            <Nuxt-link
                                to="/notifications"
                                class="notification"
                                v-if="showLogo === 'false'"
                            >
                                <div class="notif-icon" :data-number="4">
                                    <i class="fas fa-bell"></i>
                                </div>
                            </Nuxt-link>

                            <nuxt-link class="btn-login" to="/Auth/login">
                                <i class="fas fa-sign-in-alt sign-icon"></i>
                                <span class="login-text">{{
                                    $t("Auth.login")
                                }}</span>
                            </nuxt-link>
                            <button
                                class="nav-btn"
                                @click="handleClick"
                                :class="{ active: navBtnActive }"
                            >
                                <span></span><span></span><span></span>
                            </button>
                            <div
                                class="nav-overlay"
                                @click="handleOverlayClick"
                                :class="{ show: navOverlayShow }"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- logout Dialog -->
        <Dialog
            v-model:visible="logoutDialog"
            modal
            class="custum_dialog_width"
            :draggable="false"
        >
            <div class="text-center">
                <img
                    src="@/assets/images/noun_warning.png"
                    alt="check-img"
                    class="check-img"
                />
                <h1 class="main-title bold mb-4">
                    {{ $t("Global.congratulations_request") }}
                </h1>
                <div class="section-btns mt-5">
                    <button
                        type="button"
                        class="custom-btn sm d-inline-flex"
                        @click="logoutDialog = false"
                    >
                        {{ $t("Home.retreat") }}
                    </button>
                    <button
                        type="button"
                        class="custom-btn logout sm d-inline-flex"
                        @click="logout"
                    >
                        {{ $t("Home.logout") }}
                    </button>
                </div>
            </div>
        </Dialog>
    </div>
</template>


<script setup>
    import nuxtStorage from "nuxt-storage";
    const route = useRoute();
    const showLogo = ref("");
    onMounted(() => {
    if (route.path.includes("/Auth") == false) {
    showLogo.value = "false";
    }
    });

    watch(
    () => route.path,
    () => {
    showLogo.value = nuxtStorage.localStorage.getData("token");
    console.log(showLogo.value);
    }
    );
</script>

<script>
export default {
    data() {
        return {
            logoutDialog: false,
            htmlLang: "",
            checked: false,
            navBtnActive: false,
            navLinksActive: false,
            navOverlayShow: false,
            isActive: false,
            // showLogo: true,
        };
    },

    methods: {
        logout() {
            localStorage.clear();
            this.logoutDialog = false;
            this.$router.push("/Auth/login");
        },
        chageDir(dir) {
            let element = document.querySelector(".html_direction");
            element.setAttribute("lang", dir);
            if (dir === "ar") {
                element.setAttribute("dir", "rtl");
                this.htmlLang = dir;
            }
            if (dir === "en") {
                element.setAttribute("dir", "ltr");
                this.htmlLang = dir;
            }
        },
        switchLang(newLang) {
            if (newLang !== localStorage.getItem("locale")) {
                localStorage.setItem("locale", newLang);
                location.reload();
            }
        },

        handleClick() {
            this.navBtnActive = true;
            this.navLinksActive = true;
            this.navOverlayShow = true;
        },

        handleOverlayClick() {
            this.navBtnActive = false;
            this.navLinksActive = false;
            this.navOverlayShow = false;
        },
    },

    async mounted() {
        let sessionKey = localStorage.getItem("locale");

        window.sessionKey = localStorage.getItem("locale");
        if (sessionKey) {
            this.chageDir(localStorage.getItem("locale"));
        }
    },

    // created() {
    //     // Check if the current route is within the Auth section
    //     if (this.$route.path.startsWith("/Auth")) {
    //         // If yes, hide it
    //         this.showLogo = false;
    //     }
    // },

    // watch: {
    //     $route(to) {
    //         // Watch for when the route changes close the side menu
    //         this.handleOverlayClick();

    //         if (to.path.includes("/Auth")) {
    //             // If yes, hide the logo
    //             this.showLogo = false;
    //         } else {
    //             // // Otherwise, show the logo
    //             this.showLogo = true;
                
    //         }
    //     },
    // },

    computed: {
        headerClass() {
            return {
                "add-margin": this.shouldAddMarginBottom,
            };
        },
        shouldAddMarginBottom() {
            // Check if the current route is not the home page
            return this.$route.path !== "/";
        },
    },
};
</script>

<style lang="scss">
.add-margin {
    margin-bottom: 40px;
}
.defaultLayout {
    position: sticky;
    top: 0;
    z-index: 1000;
}
</style>
