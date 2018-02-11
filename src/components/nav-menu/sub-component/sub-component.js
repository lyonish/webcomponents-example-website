
class SubComponent extends HTMLElement {
  // A getter/setter for an open property.
  get open() {
    return this.hasAttribute('open');
  }

  set open(val) {
    // Reflect the value of the open property as an HTML attribute.
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
    // this.toggleDrawer();
  }

  // A getter/setter for a disabled property.
  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    // Reflect the value of the disabled property as an HTML attribute.
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
    // Reflect the value of the open property as an HTML attribute.
    if (val) {
      this.setAttribute('title', val);
    } 
    // else {
    //   this.removeAttribute('message');
    // }
  }
  get value() {
    if (this.hasAttribute('value')){
      return this.attributes.value.value;
    }
    return null;
  }
  set value(val) {
    // Reflect the value of the open property as an HTML attribute.
    if (val) {
      this.setAttribute('value', val);
    } 
    // else {
    //   this.removeAttribute('message');
    // }
  }
  static get observedAttributes() {
    return ['disabled', 'open', 'value'];
  }

  // Can define constructor arguments if you wish.
  constructor(title, value) {
    // If you define a ctor, always call super() first!
    // This is specific to CE and required by the spec.
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    const template = document.querySelector('#sub-component');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);
    shadowRoot.querySelector("li").textContent = title;
    shadowRoot.querySelector('span').textContent = value;

    this.componentId = window.document.nextComponentSerial;
    history.state[this.componentId] = {componentName: this.nodeName};
    window.document.nextComponentSerial = this.componentId + 1;
    console.log(this.componentId);
    console.log(window.document.nextComponentSerial);
    history.state[this.componentId].count = value;
    window.addEventListener('popstate', e => {
      this.value = history.state[this.componentId].count;
    });
    this.addEventListener('click', e => {
      history.state[this.componentId].count = history.state[this.componentId].count + 1;
      this.value = history.state[this.componentId].count;
      history.pushState(history.state, 'countUp', '/' );
      if (this.disabled) {
        return true;
      }
      // this.toggleDrawer();
    });
  }
  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'value') {
    this.shadowRoot.querySelector('span').textContent = newValue;
    }
  }
  // update(serial){
  //   this.shadowRoot.querySelector('span').textContent = history.state[serial].count;
  // }
  // toggleDrawer() {
  //   alert('mycompo!');
  // }
}
customElements.define('sub-component', SubComponent);
