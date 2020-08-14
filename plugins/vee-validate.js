import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'
import * as originalRules from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'
import * as CustomRules from '~/utils/validation-custom-rules.js'

let rule
for (rule in originalRules) {
  extend(rule, {
    ...originalRules[rule] // eslint-disable-line
  })
}

for (const rule in CustomRules) {
  extend(rule, CustomRules[rule])
}

localize('ja', ja)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)