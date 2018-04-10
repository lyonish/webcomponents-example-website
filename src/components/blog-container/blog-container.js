
class BlogContainer extends HTMLElement {
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

  set src(val) {
    if (val) {
      this.setAttribute('src', '');
    } else {
      this.removeAttribute('src');
    }
  }
  
  static get observedAttributes() {
    return ['src'];
  }

  // Can define constructor arguments if you wish.
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    const template = document.querySelector('#blog-container');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    this.componentId = componentIdGenerator.next().value;;
    history.state[this.componentId] = {componentName: this.nodeName};
    ;

    // this.addEventListener('click', e => {
    //   if (this.disabled) {
    //     return false;
    //   }
    // });
  }

  connectedCallback() {
    // console.log('blog container connected');

}

  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'src') {
      // console.log('blog-container  -  attributeChangedCallback')
      const _shadowRoot = this.shadowRoot;
      let instance;
      fetch(this.src)
      .then(function(response) {
        return response.json().then(function(json) {
          for (let i=0; i <json.length; i = i+1){
            instance = new BlogArticle(json[i]);
            _shadowRoot.querySelector('section').appendChild(instance);
        }
      });
    });
    }
  }

}
customElements.define('blog-container', BlogContainer);