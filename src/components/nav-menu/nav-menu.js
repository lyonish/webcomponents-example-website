
class NavMenu extends HTMLElement {
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

  get src() {
    if (this.hasAttribute('src')){
      return this.attributes.src.value;
    }
    return null;
  }

  // Can define constructor arguments if you wish.
  constructor() {
    // If you define a ctor, always call super() first!
    // This is specific to CE and required by the spec.
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    const template = document.querySelector('#nav-menu');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    this.componentId = window.document.nextComponentSerial;
    history.state[this.componentId] = {componentName: this.nodeName};
    window.document.nextComponentSerial = this.componentId + 1;

    // this.addEventListener('click', e => {
    //   if (this.disabled) {
    //     return false;
    //   }
    // });
  }

  connectedCallback() {
    const _shadowRoot = this.shadowRoot;
    let instance;
    fetch(this.src)
    .then(function(response) {
      return response.json().then(function(json) {
        for (let i=0; i <json.name.length; i = i+1){
          instance = new MenuPiece(json.name[i], json.route[i]);
          _shadowRoot.querySelector('ul').appendChild(instance);
      }
    });
  });
}

  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'src') {
      console.log('nav-menu  -  attributeChangedCallback')
    }
  }

  // toggleDrawer() {
  //   alert('mycompo!');
  // }
}
customElements.define('nav-menu', NavMenu);