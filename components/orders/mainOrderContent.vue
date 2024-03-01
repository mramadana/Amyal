<template>
    <div>
        <OrdersCardOrder :orders="orders" />

        <!--***** Paginator *****-->
        <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-5 paginate-parent" dir="ltr" />

        <div v-if="noOrders">
            <h1 class="main-title bold lg mb-4">{{ $t('Global.no_orders') }}</h1>
        </div>
    </div>
</template>

<script>
import image_1 from '@/assets/images/2.png';
    export default {
        props: {
            pending: String,
            required: true
        },
        data() {

            return {
                noOrders: false,
                pageLimit: 5,
                totalPage: 10,
                currentPage: 1,
                orders: [
                    {
                        image: image_1,
                        order_number: '12342#',
                        time: 'منذ 1 ساعه',
                        name: "سيارة هوندا فاخرة",
                        oder_status: 'حالى',
                        id: "1",
                    },
                    {
                        image: image_1,
                        order_number: '12342#',
                        time: 'منذ 2 ساعه',
                        name: "سيارة هوندا فاخرة",
                        oder_status: 'انتظار الموافقة',
                        id: "2",
                    },
                    {
                        image: image_1,
                        order_number: '12342#',
                        time: 'منذ 3 ساعه',
                        name: "سيارة هوندا فاخرة",
                        oder_status: 'حالى',
                        id: "3",
                    },
                    {
                        image: image_1,
                        order_number: '12342#',
                        time: 'منذ 6 ساعه',
                        name: "سيارة هوندا فاخرة",
                        oder_status: 'حالى',
                        id: "4",
                    },
                ],
            };
        },

        methods: {

            // axios method get data each page

            onPaginate(event) {
                this.currentPage = event.page + 1;
                this.pageLimit = event.rows;
                window.scrollTo(0, 0);

            },
        }
    }
</script>
