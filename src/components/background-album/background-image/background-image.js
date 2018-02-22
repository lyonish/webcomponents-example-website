
class BackgroundImage extends HTMLElement {
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
      this.setAttribute('src', val);
    } 
  }
  

  get interval() {
    if (this.hasAttribute('interval')){
      return this.attributes.interval.value;
    }
    return null;
  }

  constructor(url, interval, total, order) {
    super();
    
    let shadowRoot = this.attachShadow({mode: 'open'});
    const template = document.querySelector('#background-image');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    this.componentId = window.document.nextComponentSerial;
    history.state[this.componentId] = {componentName: this.nodeName};
    window.document.nextComponentSerial = this.componentId + 1;
    this.src = url;
    shadowRoot.querySelector('span').style.backgroundImage= 'url("' + this.src + '")';
    shadowRoot.querySelector('span').style.animationDelay = interval * order + 's';
    shadowRoot.querySelector('span').style.animationDuration = interval * total + 's';

    // generate keyframe stylesheet strings based on total number of pictures
    // https://stackoverflow.com/questions/18481550/how-to-dynamically-create-keyframe-css-animations
    var styletag = document.createElement('style');
    styletag.type = 'text/css';
    var keyframes = `\
    @keyframes imageAnimation {\
      0% { opacity: 0; animation-timing-function: ease-in; }\
      `+ 50/total +`% { opacity: 1; animation-timing-function: ease-out; }\
      `+ 100/total +`% { opacity: 1 }\
      `+ 150/total +`% { opacity: 0 }\
      100% { opacity: 0 }\
     }`
    styletag.innerHTML = keyframes;
    shadowRoot.appendChild(styletag)

    // Setup a click listener on <app-drawer> itself.
    this.addEventListener('click', e => {
      console.log('8282828');
      // Don't toggle the drawer if it's disabled.
      
      if (this.disabled) {
        return false;
      }
      // this.toggleDrawer();
    });
  }

  connectedCallback() {
    const  _shadowRoot = this.shadowRoot;
    // fetch(this.src)
    // .then(function(response) {
    //   return response.json().then(function(json) {
    //     debugger;
        
        // _shadowRoot.querySelector('img').src = ;
    // });
  // });
}

  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'src') {
      console.log('background-image  -  attributeChangedCallback')
    }
  }

}
customElements.define('background-image', BackgroundImage);