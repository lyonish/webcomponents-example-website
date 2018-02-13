
class BackgroundAlbum extends HTMLElement {
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

  get interval() {
    if (this.hasAttribute('interval')){
      return this.attributes.interval.value;
    }
    return null;
  }

  constructor() {
    super();
    
    let shadowRoot = this.attachShadow({mode: 'open'});
    const template = document.querySelector('#background-album');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    this.componentId = window.document.nextComponentSerial;
    history.state[this.componentId] = {componentName: this.nodeName};
    window.document.nextComponentSerial = this.componentId + 1;

    // Setup a click listener on <app-drawer> itself.
    this.addEventListener('click', e => {
      console.log('8282828');
      // Don't toggle the drawer if it's disabled.
      
      if (this.disabled) {
        return false;
      }
    });
  }

  connectedCallback() {
    const _shadowRoot = this.shadowRoot;
    const interval = this.interval;
    let instance;
    fetch(this.src)
    .then(function(response) {
      return response.json().then( (json) => {
        for (let i=0; i <json.urls.length; i = i+1){
          instance = new BackgroundImage(json.urls[i], interval, json.urls.length, i);
          _shadowRoot.querySelector('div').appendChild(instance);
        }
    });
  });
}

  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'src') {
      console.log('background-album  -  attributeChangedCallback')
    }
  }

}
customElements.define('background-album', BackgroundAlbum);