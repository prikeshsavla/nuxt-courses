import Vue from 'vue'
import { text } from 'body-parser'
import { maxLength } from 'vuelidate/lib/validators'

Vue.filter('shortenText', (text, maxLength =300) =>{
  if (text && typeof text === "string") {
    const finalChar = text.length > maxLength ? "..." : "";
    return text.substr(0, maxLength) + finalChar;
  }
  return ''
})