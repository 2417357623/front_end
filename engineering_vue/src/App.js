export default {
    data() {
      return {
        message: "Welcome to your Vue 3 app!"
      }
    },
    methods: {
      handleClick() {
        this.message = "You clicked the button!";
      }
    },
    template:`
        <div>
      <h1>Hello, Vue 3!</h1>
      <p>{{ message }}</p>
      <button @click="handleClick">Click me</button>
    </div>
    `
  }