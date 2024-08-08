<script lang='jsx' setup>

import { defineComponent, ref } from 'vue'
import { nextTick } from 'vue'

const count = ref(0)

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}

const MyTest = () => {
  return (
      <div>
        <p>Count: {count.value}</p>
        <button onClick={increment}>11</button>
      </div>
  )
}

</script>

<template>
  <MyTest/>
</template>