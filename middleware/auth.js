
import nuxtStorage from 'nuxt-storage'
export default defineNuxtRouteMiddleware((to, from) => {
console.log("hello form middle ware")

// if (!localStorage.getItem('token')) {
// return navigateTo('/login')
// }

if (to.path === '/myorders') {
return '/myorders/pending';
};
  // if (to.path.includes("/Auth")) {
  // nuxtStorage.localStorage.setData('token', 'true')
  // } else {
  // nuxtStorage.localStorage.setData('token', 'false')
  // };

  // add your middleware code here

    // Store
    const store = useAuthStore();
    const { isLoggedIn } = storeToRefs(store);
  
    // Toast
    const { errorToast } = toastMsg();
  
    // get i18n t
    const nuxtApp = useNuxtApp();
    const t = nuxtApp.vueApp.config.globalProperties.$t;
  
    if (isLoggedIn.value === false && to.meta.middleware == "auth") {
      errorToast(t("validation.requiresAuth"));
      // return false;
    }
})