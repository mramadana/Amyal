<template>
    <div>
        <LayoutHeader />

        <div>
            <slot />
        </div>

        <LayoutFooter />

    </div>
</template>

<script>
  import { useI18n } from "vue-i18n";
import { useRoute } from "#vue-router";
export default {
  setup() {
    const { t, locale } = useI18n();
    const route = useRoute();
    watchEffect(() => {
      useHead({
        title: `${t(route.name)}`,
      });
    });
  },
};
</script>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>



