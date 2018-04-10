
class BackgroundAlbum extends HTMLElement {
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

    this.componentId = componentIdGenerator.next().value;;
    history.state[this.componentId] = {componentName: this.nodeName};

    const interval = this.interval;
    let imageInstance;
    if (this.src){
      fetch(this.src)
      .then(function(response) {
        return response.json().then( (json) => {
          for (let i=0; i <json.urls.length; i = i+1){
            imageInstance = new BackgroundImage(json.urls[i], interval, json.urls.length, i);
            shadowRoot.querySelector('div').appendChild(imageInstance);
          }
         });
      });
    }
  }
}

customElements.define('background-album', BackgroundAlbum);