
// import { defineComponent, ref } from 'vue'
//
// export default defineComponent({
//   setup() {
//     const count = ref(0)
//
//     const increment = () => {
//       count.value++
//     }
//
//     return () => (
//       <div>
//         <p>Count: {count.value}</p>
//         <button onClick={increment}>Increment</button>
//       </div>
//     )
//   }
// })


import { ref } from 'vue'

export default function MyTest() {
  const count = ref(0)

  const increment = () => {
    count.value++
  }

  return () => (
    <div>
      <p>Count: {count.value}</p>
      <button onClick={increment}>11</button>
    </div>
  )
}
