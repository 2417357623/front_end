import styles from './Header.module.scss.js';
import React from '../../node_modules/react/index.js';
import Switch from '../../node_modules/antd/es/switch/index.js';

const Header = () => /*#__PURE__*/React.createElement("div", {
  className: styles.nav
}, /*#__PURE__*/React.createElement("div", {
  className: `${styles.navWrapper} container`
}, /*#__PURE__*/React.createElement("div", {
  className: styles.navLogo
}, "logo"), /*#__PURE__*/React.createElement("ul", {
  className: styles.navMenu
}, /*#__PURE__*/React.createElement("li", {
  className: styles.items
}, /*#__PURE__*/React.createElement("a", {
  href: '#home'
}, "Home")), /*#__PURE__*/React.createElement("li", {
  className: styles.items
}, /*#__PURE__*/React.createElement("a", {
  href: '#services'
}, "Services")), /*#__PURE__*/React.createElement("li", {
  className: styles.items
}, /*#__PURE__*/React.createElement("a", {
  href: '#home'
}, "Home")), /*#__PURE__*/React.createElement("li", {
  className: styles.items
}, /*#__PURE__*/React.createElement("a", {
  href: '#home'
}, "Home")), /*#__PURE__*/React.createElement("li", {
  className: styles.btns
}, /*#__PURE__*/React.createElement("label", {
  htmlFor: '',
  className: styles['switch']
}, /*#__PURE__*/React.createElement(Switch, null)), /*#__PURE__*/React.createElement("a", {
  href: '',
  className: 'button'
}, "Hire mee")))), /*#__PURE__*/React.createElement("div", {
  className: styles.hamburgerMenu
}, /*#__PURE__*/React.createElement("div", {
  className: styles.bar
}), /*#__PURE__*/React.createElement("div", {
  className: styles.bar
}), /*#__PURE__*/React.createElement("div", {
  className: styles.bar
})));

export { Header as default };
