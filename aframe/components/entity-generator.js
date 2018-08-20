/* entity-generator aframe component by diekus */
/* ATTENTION:
The 'attributes' attribute of the entity-genertator uses a different type of delimiters since it is an CSS-like string notation inside CSS-like string notation. In order to be able to set attributes it uses '&' and '='. An 'attributes' subattribute looks like attributes:attribute1=value1&attribute2=value2
*/

AFRAME.registerComponent('entity-generator', {
    schema: {
        entity_name:{type: 'string', default: 'a-entity'}, 
        attributes:{type:'string', default:''}, 
        number_items:{type:'int', default:2},
        id_generation:{type:'bool', default:false},
        id_prefix:{type:'string', default:'gen_ent_'}
    },
    init: function(){
        for (i = 0; i < this.data.number_items; i++){
            let ne = document.createElement(this.data.entity_name);
            atts = this.data.attributes.split('&');
             for(a = 0; a < atts.length; a++){
                 att = atts[a].split('=');
                 att[1] != null?ne.setAttribute(att[0], att[1]):ne.setAttribute(att[0], '');
              }
              if(this.data.id_generation){
                ne.setAttribute('id',  this.data.id_prefix + i);
              }
            this.el.appendChild(ne);
            
        }
    }
});