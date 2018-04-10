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

  get label() {
    if (this.hasAttribute('label')){
      return this.attributes.label.value;
    }
    return null;
  }

  set label(val) {
    if (val) {
      this.setAttribute('label', val);
    } 
  }

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

  constructor(label, route) {
    super();
    
    let shadowRoot = this.attachShadow({mode: 'open'});
    const template = document.querySelector('#menu-piece');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    this.componentId = componentIdGenerator.next().value;;
    history.state[this.componentId] = {componentName: this.nodeName};

    this.label = label;
    this.route = route;
    shadowRoot.querySelector("a").textContent = this.label;

    shadowRoot.querySelector('li').addEventListener('click', (e)=> {
      window.updateState(this.route);
    })
  }
}

customElements.define('menu-piece', MenuPiece);
