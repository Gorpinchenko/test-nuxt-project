<template>
  <div class="avatar" :class="{'avatar_large': isLarge}">
    {{ firstLetters }}
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    fullName: {
      type: String,
      default: '',
    },
    isLarge: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    firstLetters() {
      return this.fullName.split(' ').map(name => name.slice(0, 1)).join('');
    },
  },
}
</script>
