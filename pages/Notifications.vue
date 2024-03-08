<template>
    <div class="custom-height">
      <div class="container">
          <div class="layout-form custom-width lg">
              <h1 class="main-title bold lg mb-5 position-relative">
                {{ $t("Global.notifications") }}
                
                <button type="button" class="deleteAll-btn" @click="deleteAll" v-if="notifications.length">
                    <i class="far fa-trash-alt trash-icon"></i>
                    <div class="resp-text">
                        {{ $t("Global.delete_all") }}
                    </div>
                </button>
            </h1>

            <transition-group name="fade">

                <div v-for="(result, index) in notifications" :key="result.index">
                  <div class="layout-form sm">
                    <div class="notificatin-card">
                        <div class="d-flex">
                            <img :src="result.image" alt="notificatin-img" class="notificatin-img">
                            <div class="text text-start">
                                <h1 class="main-title normal"> {{ result.name }}</h1>
                                <div class="d-flex align-items-center gap-2">
                                    <i class="far fa-clock main-disc"></i>
                                    <div>
                                        <span class="main-disc normal">منذ :</span>
                                        &nbsp;
                                        <span class="main-disc normal">{{ result.time }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <i class="far fa-trash-alt trash-icon" @click="removenotifation(index)"></i>
                    </div>
                  </div>
                </div>
    
                <div v-if="notifications.length == 0">
                  {{ $t("Global.no_notifications") }}
                </div>
                
            </transition-group>

          </div>
      </div>
    </div>
  </template>
  
  <script>
  import dropdown_img_1 from '@/assets/images/messi.gif';
      definePageMeta({
          name: "Global.notifications",
      })

      export default {
          data() {
              return {
                notifications : [
                    {
                        id: 1,
                        image : dropdown_img_1,
                        name : "عمرو عميل",
                        time : "10:00",
                    },
                    {
                        id: 2,
                        image : dropdown_img_1,
                        name : "عمرو عميل",
                        time : "5:00",
                    }
                ],
              };
          },

          methods: {
            removenotifation(index){
                this.notifications.splice(index, 1);
            },

            deleteAll(){
                this.notifications = [];
            }
          }
      }
  </script>

<style lang="scss">
    .notificatin-card {
        display: flex;
        flex-grow: 1;
        justify-content: space-between;
        .notificatin-img {
            width: 65px;
            height: 45px;
            object-fit: cover;
            margin-inline-end: 15px;
            border-radius: 3px;
        }

        .trash-icon {
            font-size: 17px;
            color: #EC2F2F;
            cursor: pointer;
        }

    }
    .custom-height {
        min-height: 310px;
        @media (max-width: 1024px) {
            min-height: 100%;
        }
    }
</style>
  
