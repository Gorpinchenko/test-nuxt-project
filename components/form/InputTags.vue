<template>
  <div class="input-tags" @dblclick="$emit('dblclick', $event)">
    <div v-if="label" class="input-material__label">
      {{ label }}
    </div>
    <div @click="show" class="input-tags__tags-active" :class="{disabled: disabled}">
      <div class="input-tags__tags-active-container">
        <div
          v-for="(tag, index) in currentTags"
          :key="tag.id"
          class="input-tags__tag"
        >
          {{ tag.name }}
          <div @click="deleteTag(index)" class="input-tags__tag-delete">
            <img class="input-tags__tag-delete-icon" src="/img/trash_container.png" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="input-tags__tags-list" :class="{active: showTags}">
      <div class="input-tags__tags-list-container">
        <div
          v-for="tag in filteredTags"
          :key="tag.id"
          @click="select(tag)"
          class="input-tags__tag"
        >
          {{ tag.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {registerOutElementClick, removeOutElementClick} from "helpers/Document";

export default {
  name: "InputTags",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      required: true,
    },
    currentTags: {
      type: Array,
      required: true,
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
      activeTags: this.currentTags,
      showTags: false,
      outClickEventHandler: null,
    }
  },
  computed: {
    filteredTags() {
      return this.tags.filter(tag => !this.currentTags.some(cTag => cTag.id === tag.id));
    },
  },
  methods: {
    show() {
      this.showTags = true;
    },
    hide() {
      this.showTags = false;
    },
    select(tag) {
      this.$emit('update', [...this.currentTags, tag]);
      this.hide();
    },
    deleteTag(index) {
      this.activeTags.splice(index, 1);
      this.$emit('update', this.activeTags);
    }
  },
  watch: {
    currentTags(value) {
      this.activeTags = value;
    },
  },
}
</script>
