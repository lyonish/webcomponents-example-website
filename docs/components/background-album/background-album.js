class BackgroundAlbum extends HTMLElement{get src(){return this.hasAttribute("src")?this.attributes.src.value:null}get interval(){return this.hasAttribute("interval")?this.attributes.interval.value:null}constructor(){super();let t=this.attachShadow({mode:"open"});const e=document.querySelector("#background-album").content.cloneNode(!0);t.appendChild(e),this.componentId=componentIdGenerator.next().value,history.state[this.componentId]={componentName:this.nodeName};const n=this.interval;let r;this.src&&fetch(this.src).then(function(e){return e.json().then(e=>{for(let s=0;s<e.urls.length;s+=1)r=new BackgroundImage(e.urls[s],n,e.urls.length,s),t.querySelector("div").appendChild(r)})})}}customElements.define("background-album",BackgroundAlbum);