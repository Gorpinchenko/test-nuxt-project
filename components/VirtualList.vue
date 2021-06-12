<template>
  <div
      :style="`height: ${listHeight}px;`"
      @scroll="onScroll"
      class="virtual-list"
  >
    <div :style="`height: ${topHeight}px;`"></div>
    <slot :list="list"></slot>
    <div :style="`height: ${bottomHeight}px;`"></div>
  </div>
</template>

<script>
export default {
  name: "VirtualList",
  props: {
    rowHeight: {
      type: Number,
      required: true,
    },
    visibleRows: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      start: 0,
    }
  },
  computed: {
    list() {
      return this.items.slice(this.start, this.start + this.visibleRows + 1);
    },
    listHeight() {
      return (this.visibleRows < this.list.length ? this.visibleRows : this.list.length) * this.rowHeight;
    },
    topHeight() {
      return this.rowHeight * this.start;
    },
    bottomHeight() {
      return this.rowHeight * (this.items.length - (this.start + this.visibleRows));
    },
  },
  methods: {
    onScroll($e) {
      const start = Math.floor($e.target.scrollTop / this.rowHeight);
      const maxStart = this.items.length - this.visibleRows;
      this.start = start > maxStart ? maxStart : start;
    },
  },
  watch: {
    'items.length'(length) {
      if (length > this.visibleRows && length < this.start - this.visibleRows) {
        this.start = length - this.visibleRows;
      }
    },
  },
}
</script>
