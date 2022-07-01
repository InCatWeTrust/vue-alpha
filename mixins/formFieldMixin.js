export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      focused: false
    }
  },
  computed: {
    dataValue: {
      get () {
        return this.currentValue ? this.currentValue : this.value
      },
      set (value) {
        if (this.template) {
          this.validate(value)
          this.$emit('input', this.currentValue)
        } else if (this.valid) {
          this.validateType(value)
          this.$emit('input', this.currentValue)
        } else {
          this.$emit('input', value)
        }

        this.$forceUpdate()
      }
    },
    placeholderData () {
      return this.focused ? this.placeholder : ''
    },
    maxLength () {
      if (this.template.length > 0) return this.template.length
      else if (this.length) return this.length
      else return null
    }
  }
}
