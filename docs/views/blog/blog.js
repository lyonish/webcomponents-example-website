class BlogView extends HTMLElement{constructor(e){super();let o=this.attachShadow({mode:"open"});const t=document.querySelector("#blog-view").content.cloneNode(!0);o.appendChild(t),this.componentId=componentIdGenerator.next().value,history.state[this.componentId]={componentName:this.nodeName}}}customElements.define("blog-view",BlogView);