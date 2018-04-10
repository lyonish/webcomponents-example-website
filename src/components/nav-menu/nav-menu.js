
class NavMenu extends HTMLElement {
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
  }

  get src() {
    if (this.hasAttribute('src')){
      return this.attributes.src.value;
    }
    return null;
  }

  constructor() {
    super();
    
    let shadowRoot = this.attachShadow({mode: 'open'});
    const template = document.querySelector('#nav-menu');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    this.componentId = componentIdGenerator.next().value;;
    history.state[this.componentId] = {componentName: this.nodeName};
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

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'src') {
      console.log('nav-menu  -  attributeChangedCallback')
    }
  }
}

customElements.define('nav-menu', NavMenu);