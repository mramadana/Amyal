<template>
    <div class="container">
        <div class="layout-form custom-width">
            <h1 class="main-title bold lg mb-5">{{ $t("Global.wallet") }}</h1>
            <form action="">
                <div class="row">
                    <div class="col-12 col-md-8 mr-auto">
                        <div class="text-center mb-5">
                            <img src="@/assets/images/walletillustration.png" alt="restore-image" class="restore-image mb-4">
                            <div class="mb-3">
                                <h4 class="main-disc mb-3">{{ $t("Global.current_balance") }}</h4>
                                <h2 class="main-title">500.00</h2>
                                <h4 class="main-title normal">{{ $t("Global.SR") }}</h4>
                            </div>
                        </div>
                        <button type="submit" class="custom-btn w-100 mr-auto"> {{ $t('Global.charge_balance') }} </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    definePageMeta({
        name: "Global.wallet",
    })
</script>