<template>
  <div class="input-autocomplete">
    <InputMaterial
      :value="currentItemTitle"
      :label="label"
      :placeholder="placeholder"
      :disabled="disabled"
      :icon-src="iconSrc"
      @dblclick="$emit('dblclick', $event)"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
    />
    <div class="input-autocomplete__item-list" :class="{active: showItems}">
      <div class="input-autocomplete__item-list-container">
        <VirtualList
          :visible-rows="3"
          :row-height="26"
          :items="filteredItems"
        >
          <template #default="{list}">
            <div
              v-for="item in list"
              :key="item.value"
              @click="select(item)"
              class="input-autocomplete__item"
            >
              {{ item.title }}
            </div>
          </template>
        </VirtualList>
      </div>
    </div>
  </div>
</template>

<script>
import InputMaterial from "components/form/InputMaterial";
import VirtualList from "components/VirtualList";
import InputMixin from "mixins/InputMixin";
import {registerOutElementClick, removeOutElementClick} from "helpers/Document";

export default {
  name: "InputAutocomplete",
  mixins: [InputMixin],
  components: {
    InputMaterial,
    VirtualList,
  },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {
    this.outClickEventHandler = registerOutElementClick(this.$el, this.hide.bind(this));
  },
  destroyed() {
    if (this.outClickEventHandler) {
      removeOutElementClick(this.outClickEventHandler);
    }
  },
  data() {
    return {
      inputValue: '',
      showItems: false,
      valueChanged: false,
      outClickEventHandler: null,
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => item.title.indexOf(this.inputValue) !== -1);
    },
    currentItemTitle() {
      const currentItem = this.items.find(item => item.value === this.value);
      return currentItem ? currentItem.title : '';
    },
  },
  methods: {
    onFocus() {
      this.$emit('focus');
      this.show();
    },
    onBlur() {
      this.$emit('blur');
      if (this.valueChanged) {
        this.$emit('update', null);
      }
    },
    onInput($e) {
      this.inputValue = $e.target.value;
      this.valueChanged = true;
    },
    show() {
      this.showItems = true;
    },
    hide() {
      this.valueChanged = false;
      this.showItems = false;
      this.inputValue = '';
    },
    select(item) {
      this.$emit('update', item.value);
      this.hide();
    },
  },
}
</script>
