
class BackgroundImage extends HTMLElement {
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

    this.componentId = componentIdGenerator.next().value;;
    history.state[this.componentId] = {componentName: this.nodeName};

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
    shadowRoot.appendChild(styletag);
  }
}

customElements.define('background-image', BackgroundImage);