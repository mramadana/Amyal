export default defineNuxtRouteMiddleware((to, from) => {
      console.log("hello form middle ware")

      // if (!localStorage.getItem('token')) {
      //   return navigateTo('/login')
      // }
      
      if (to.path === '/myorders') {
        return '/myorders/pending';
      } 
  })