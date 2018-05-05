class MenuPiece extends HTMLElement{get open(){return this.hasAttribute("open")}set open(e){e?this.setAttribute("open",""):this.removeAttribute("open")}get label(){return this.hasAttribute("label")?this.attributes.label.value:null}set label(e){e&&this.setAttribute("label",e)}get route(){return this.hasAttribute("route")?this.attributes.route.value:null}set route(e){e&&this.setAttribute("route",e)}static get observedAttributes(){return["disabled","open","value"]}constructor(e,t){super();let n=this.attachShadow({mode:"open"});const s=document.querySelector("#menu-piece").content.cloneNode(!0);n.appendChild(s),this.componentId=componentIdGenerator.next().value,history.state[this.componentId]={componentName:this.nodeName},this.label=e,this.route=t,n.querySelector("a").textContent=this.label,n.querySelector("li").addEventListener("click",e=>{window.updateState(this.route)})}}customElements.define("menu-piece",MenuPiece);