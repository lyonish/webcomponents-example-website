
class MenuPiece extends HTMLElement {
  get open() {
    return this.hasAttribute('open');
  }

  set open(val) {
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
  get title() {
    if (this.hasAttribute('title')){
      return this.attributes.title.value;
    }
    return null;
  }

  set title(val) {
    if (val) {
      this.setAttribute('title', val);
    } 
  }
  // get value() {
  //   if (this.hasAttribute('value')){
  //     return this.attributes.value.value;
  //   }
  //   return null;
  // }
  // set value(val) {
  //   if (val) {
  //     this.setAttribute('value', val);
  //   } 
  // }
  get route() {
    if (this.hasAttribute('route')){
      return this.attributes.route.value;
    }
    return null;
  }
  set route(val) {
    if (val) {
      this.setAttribute('route', val);
    } 
  }
  static get observedAttributes() {
    return ['disabled', 'open', 'value'];
  }

  constructor(title, route) {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    const template = document.querySelector('#menu-piece');
    const instance = template.content.cloneNode(true);

    shadowRoot.appendChild(instance);
    this.title = title;
    this.route = route;
    shadowRoot.querySelector("a").textContent = this.title;
    // shadowRoot.querySelector('span').textContent = value;
    // debugger;
    // shadowRoot.querySelector('a').route = route;

    this.componentId = window.document.nextComponentSerial;
    history.state[this.componentId] = {componentName: this.nodeName};
    window.document.nextComponentSerial = this.componentId + 1;

    // history.state[this.componentId].count = value;
    window.addEventListener('popstate', e => {
      // this.value = history.state[this.componentId].count;
    });
    this.addEventListener('click', e => {
      // history.state[this.componentId].count = history.state[this.componentId].count + 1;
      // this.value = history.state[this.componentId].count;
      // history.pushState(history.state, 'countUp', window.location.pathname);
      // if (this.disabled) {
      //   return true;
      // }
    });
    shadowRoot.querySelector('li').addEventListener('click', (e)=> {
      window.updateState(this.route);
    })
  }
  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    // if (attr == 'value') {
    // this.shadowRoot.querySelector('span').textContent = newValue;
    // }
  }
}
customElements.define('menu-piece', MenuPiece);
