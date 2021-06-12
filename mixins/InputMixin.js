const mixin = {
  props: {
    value: {},
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconSrc: {
      type: String,
      default: '',
    },
  },
};

export default mixin;
