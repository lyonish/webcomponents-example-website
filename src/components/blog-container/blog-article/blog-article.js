
class BlogArticle extends HTMLElement {
  get open() {
    if (this.hasAttribute('open')){
      return this.attributes.open.value;
    }
    return null;
  }

  set open(val) {
    if (typeof val == "boolean") {
      this.setAttribute('open', val);
      return 0;
    }
    console.log('"open" must be a boolean value. got val: ' + val);
  }

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
    return ['open'];
  }

  constructor(data) {
    super();
    // console.log('blog article constructor');
    let shadowRoot = this.attachShadow({mode: 'open'});
    const template = document.querySelector('#blog-article');
    const instance = template.content.cloneNode(true);

    shadowRoot.appendChild(instance);
    this.title = data.title;
    this.postDate = data.postDate;
    this.author = data.author;
    this.content = data.content;
    this.open = false;
    shadowRoot.querySelector("h3").textContent = this.title;
    shadowRoot.querySelector(".postdate").textContent = this.postDate;
    shadowRoot.querySelector(".author").textContent = this.author;
    shadowRoot.querySelector(".content").textContent = this.content;

    this.componentId = window.document.nextComponentSerial;
    history.state[this.componentId] = {componentName: this.nodeName, open: this.open};
    window.document.nextComponentSerial = this.componentId + 1;

    // history.state[this.componentId].count = value;
    window.addEventListener('popstate', e => {
      if(history.state[this.componentId]){
        if(history.state[this.componentId].open == 'true'){ history.state[this.componentId].open = true; }
        if(history.state[this.componentId].open == 'false'){ history.state[this.componentId].open = false; }
        this.open = history.state[this.componentId].open;
      }
    });
    this.shadowRoot.querySelector('.expander').addEventListener('click', e => {
      this.toggleOpen();
    });
    // shadowRoot.querySelector('li').addEventListener('click', (e)=> {
    // })
  }
  
  toggleOpen(){
    if(this.open == 'true'){
      this.open = false;
      this.shadowRoot.querySelector('.expander > a').textContent = 'expand';
    }else {
    this.open = true;
    this.shadowRoot.querySelector('.expander > a').textContent = 'fold';
  }
    history.state[this.componentId].open = this.open;
  }
  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'open') {
      if(newValue == 'true') {
        this.shadowRoot.querySelector('.content').classList.remove('closed');
      }else {
        this.shadowRoot.querySelector('.content').classList.add('closed');
      }
    }
  }
}

customElements.define('blog-article', BlogArticle);
