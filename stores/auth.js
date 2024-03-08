import { defineStore } from "pinia";

// Axios
// const axios = useApi();

// success response
// const { response } = responseApi();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      phone: "",
      country_code: "",
    },
    token: null,
    isLoggedIn: false,
    newPhone: null,
    notificationToken: null,
  }),
  actions: {

  },
//   persist: {
//     storage: persistedState.cookiesWithOptions({
//       sameSite: "strict",
//     }),
//   },
});
