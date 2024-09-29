import { render ,reactive } from "./reactive/index.js";
import App from './App.vue'

console.log(App)

const app = document.querySelector("#app");
app.innerHTML = ''; 
//解构出被loader处理过的
const {template,data: generate } = App

let data  = reactive(generate())

render(app, template, data);

setTimeout(()=>{
    data.title = 'pinaShooter'
   
    setTimeout(()=>{
         data.content = 'fffff'
    },1000)
},3000)

console.log("over")