<template>
  <div class="input-material" @dblclick="$emit('dblclick', $event)">
    <div v-if="label" class="input-material__label">
      {{ label }}
    </div>
    <div class="input-material__container">
      <input
        v-model.trim="currentValue"
        :disabled="disabled"
        required=""
        :type="type"
        :placeholder="placeholder"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @input="$emit('input', $event)"
        class="input-material__input"
      >
      <div v-if="iconSrc" class="input-material__icon">
        <img :src="iconSrc" alt="">
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import InputMixin from 'mixins/InputMixin';

export default {
  name: "InputMaterial",
  mixins: [InputMixin],
  props: {
    type: {
      type: String,
      default: 'text',
    },
  },
  data() {
    const value = this.value ? this.value : '';
    return {
      currentValue: value,
    }
  },
  watch: {
    value(value) {
      this.currentValue = value;
    },
    currentValue() {
      this.$emit('update', this.currentValue);
    },
  },
}
</script>
