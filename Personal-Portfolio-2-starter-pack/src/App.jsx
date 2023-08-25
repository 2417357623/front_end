import Header from "./components/Header/Header.jsx";
import styles from './App.module.scss'
import Hero from "./components/Hero/Hero.jsx";

const App = () => {
  //don't forget to add font link in index.html
  return <div className={`${styles.container} bg-primary`}>
    <Header></Header>
    <Hero></Hero>
  </div>
};

export default App;
