// const isPalindrome = word => word.toLowerCase().split("").reverse().join("") === word.toLowerCase()
// console.log(isPalindrome("Deleveled"))
// console.log(isPalindrome("adam"))
import Unsplash, { toJson } from "unsplash-js"

console.log(json.links.html);
const up_acc_key = process.env.REACT_APP_UP_ACC_KEY;
const up_sec_key = process.env.REACT_APP_UP_SEC_KEY;
const unsplash = new Unsplash({
  accesKey: up_acc_key,
  secret: up_sec_key
})
unsplash.search.getRandomPhoto({ query: "Guadalajara landscape"})
.then(toJson)
 .then(json => {
   console.log(json.links.html);
 });