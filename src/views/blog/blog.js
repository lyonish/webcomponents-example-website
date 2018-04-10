class BlogView extends HTMLElement {
  constructor(data) {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    const template = document.querySelector('#blog-view');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    this.componentId = componentIdGenerator.next().value;;
    history.state[this.componentId] = {componentName: this.nodeName};
  }
}

customElements.define('blog-view', BlogView);
