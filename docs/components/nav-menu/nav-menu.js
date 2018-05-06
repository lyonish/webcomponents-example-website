class NavMenu extends HTMLElement{get open(){return this.hasAttribute("open")}set open(e){e?this.setAttribute("open",""):this.removeAttribute("open")}get src(){return this.hasAttribute("src")?this.attributes.src.value:null}constructor(){super();let e=this.attachShadow({mode:"open"});const t=document.querySelector("#nav-menu").content.cloneNode(!0);e.appendChild(t),this.componentId=componentIdGenerator.next().value,history.state[this.componentId]={componentName:this.nodeName}}connectedCallback(){const e=this.shadowRoot;let t;fetch(this.src).then(function(n){return n.json().then(function(n){for(let o=0;o<n.name.length;o+=1)t=new MenuPiece(n.name[o],n.route[o]),e.querySelector("ul").appendChild(t)})})}}customElements.define("nav-menu",NavMenu);