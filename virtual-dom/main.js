import { render ,reactive } from "./reactive/index.js";

const app = document.querySelector("#app");

const template = `
<h1>{{ title }}</h1>
<p>{{ content }}</p>
 `;

let data = reactive({
  title: "this is title",
  content: "this is Content",
});

render(app, template, data);

setTimeout(()=>{
    data.title = 'pinaShooter'
   
    setTimeout(()=>{
         data.content = 'fffff'
    },1000)
},3000)