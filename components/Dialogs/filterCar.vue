<template>

    <!-- rating dialog -->

    <Dialog v-model:visible="filtering_dialog" modal class="custum_dialog_width" :draggable="false">
            <div class="main-text text-center">
              <p class="main-title"> {{$t('Global.filter')}} </p>
            </div>
            <p class="main-title mb-4"> test </p>

            <form @submit.prevent="submitData">
                <div class="row with-br-bottom mb-4">
                    <div class="col-12 col-md-6" v-for="item in categories" :key="item">
                        <div class="radios form-group">
                            <div class="d-flex gap-3">
                            <label class="custom-radio custom-check">
                                <input type="checkbox" name="opinion" :value="item.id" v-model="checkedIds" class="d-none">
                                <span class="mark">
                                    <i class="fas fa-check icon"></i>
                                </span>
                                <p class="hint">{{item.name}}</p>
                            </label>

                            </div>
                        </div>
                    </div>
                </div>
                <MultiRangeSlider
                    baseClassName="multi-range-slider-bar-only mb-2"
                    :minValue="oBarMinValue"
                    :maxValue="oBarMaxValue"
                    :max="1000"
                    :min="0"
                    :rangeMargin="0"
                    @input="update_oBarValues"
                />

                <p class="text-center range-text mb-4"> {{oBarMinValue}}  {{ $t('Global.Rs') }} - {{oBarMaxValue}} {{ $t('Global.Rs') }}</p>

                <div class="section-btns d-flex justify-content-center">
                    <button type="submit" class="custom-btn sm"> {{$t('Auth.confirmation')}} </button>
                </div>
            </form>

    </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import Slider from 'primevue/slider';
import MultiRangeSlider from "multi-range-slider-vue";
import "../node_modules/multi-range-slider-vue/MultiRangeSliderBlack.css";
import "../node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css";
export default {
  components: {
    Dialog,
    Slider,
    MultiRangeSlider
  },
    data() {
        return {
            filtering_dialog: false,
            checkedIds: [],
            categories: [
                {
                    id: 1,
                    name: 'هوندا'
                    
                },
                {
                    id: 2,
                    name: 'رولز رويس'
                },
                {
                    id: 3,
                    name: 'بي إم دبليو'

                },
                {
                    id: 4,
                    name: 'نيسان'
                }
            ],

            oBarMinValue: 150,
            oBarMaxValue: 350,
        }
  },

  methods: {

    update_oBarValues(e) {
      this.oBarMinValue = e.minValue;
      this.oBarMaxValue = e.maxValue;
    },
    submitData() {
        this.filtering_dialog = false
        this.$emit('filterData')
    },
    cancellation() {
        this.filtering_dialog = false
    }
  },

  computed: {
    minValue() {
      return 0; // Minimum value of the slider
    },
    maxValue() {
      return this.totalRange; // Maximum value of the slider
    },
  },


};
</script>

<style lang="scss">

.multi-range-slider-bar-only .bar {
    direction: ltr;
}

.multi-range-slider-bar-only .bar-left, .multi-range-slider-bar-only .bar-right {
    background-color: #E9E9E9;
    box-shadow: inset 0px 0px 5px #E9E9E9;
}

.bar-inner-left, .bar-inner-right, .multi-range-slider-bar-only .thumb::before {
    background-color: var(--main);
    box-shadow: none;
    border: 1px solid var(--main);
}

.multi-range-slider-bar-only .bar-inner {
    background-color: var(--main);
    border: 1px solid var(--main);
    box-shadow: inset 0px 0px 5px var(--main);
}

.multi-range-slider-bar-only .thumb .caption * {
    color: var(--wh);
    background-color: var(--main);
}

</style>