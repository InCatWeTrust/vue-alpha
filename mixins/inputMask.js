export default {
  props: {
    template: {
      type: String,
      default: ''
    },
    valid: {
      type: String,
      default: ''
    },
    length: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentValue: '',
      x: 1,
      symbol: Array.from(this.template.replace(/#/g, ''))[0],
      startSymbols: '',
      symbols: '',
      format: '',
      regex: '^',

      validRegExp: '',
      validArr: Array.from(this.valid)
    }
  },
  mounted () {
    if (this.template) {
      this.template.match(/#+/g).forEach((char, key) => {
        this.regex += `(\\d{${char.length}})?`
      })
    }
    if (this.symbol) {
      this.startSymbols = `^\\${this.symbol}+`
      this.symbols = `\\${this.symbol}{1,}`
      this.format = this.template.replace(/#+/g, () => '$' + this.x++)
    }
    if (this.valid) {
      for (let i in this.validArr) {
        if (+i === 0) {
          this.validRegExp += '[^'
        }
      
        if (this.validArr[i] === 'a') {
          this.validRegExp += 'A-Za-z'
        } else if (this.validArr[i] === 'A') {
          this.validRegExp += 'A-Za-z'
        } else if (this.validArr[i] === '9') {
          this.validRegExp += '0-9'
        }
      
        if (+i === this.validArr.length - 1) this.validRegExp +=']+'
      }

      this.validRegExp = new RegExp(this.validRegExp, 'g')
    }
  },
  methods: {
    validate (value) {
      if (this.currentValue < value) {
        this.currentValue = value.replace(/[^0-9]/g, '')
          .replace(new RegExp(this.regex, 'g'), this.format)
          .replace(new RegExp(this.startSymbols), '')
          .replace(new RegExp(this.symbols, 'g'), this.symbol)
          .substring(0, this.template.length)
      } else {
        this.currentValue = value
      }
    },
    validateType (value) {
      if (this.currentValue < value) {
        this.currentValue = value.replace(this.validRegExp, '')
          .substring(0, this.length || undefined)

        if (this.valid === 'A9' || this.valid === '9A' || this.valid === 'A') {
          this.currentValue = this.currentValue.toUpperCase()
        } else if (this.valid === 'a9' || this.valid === '9a' || this.valid === 'a') {
          this.currentValue = this.currentValue.toLowerCase()
        }
      } else {
        this.currentValue = value
      }
    }
  }
}
