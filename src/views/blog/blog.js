class BlogView extends HTMLElement {
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

  static get observedAttributes() {
    return [''];
  }

  constructor(data) {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    const template = document.querySelector('#blog-view');
    const instance = template.content.cloneNode(true);

    shadowRoot.appendChild(instance);
    this.componentId = window.document.nextComponentSerial;
    history.state[this.componentId] = {componentName: this.nodeName};
    window.document.nextComponentSerial = this.componentId + 1;

    // history.state[this.componentId].count = value;
    window.addEventListener('popstate', e => {
      // this.value = history.state[this.componentId].count;
    });
    this.addEventListener('click', e => {

    });
    // shadowRoot.querySelector('li').addEventListener('click', (e)=> {
    // })
  }
  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    // if (attr == 'value') {
    // this.shadowRoot.querySelector('span').textContent = newValue;
    // }
  }
}
customElements.define('blog-view', BlogView);
