// src/components/MyComponent.jsx


<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)

    const increment = () => {
      count.value++
    }

    return () => (
        <div>
          <p>Count: {count.value}</p>
          <button onClick={increment}>Increment</button>
        </div>
    )
  }
})
</script>

