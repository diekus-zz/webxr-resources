/* entity-generator aframe component by diekus */

AFRAME.registerComponent('entity-generator', {
    schema: {
        entity_name:{type: 'string', default: 'a-entity'}, 
        attributes:{type:'array', default:[]}, 
        number_items:{type:'int', default:2},
    },
    init: function(){
        for (i = 0; i < number_items; i++){
            let ne = document.createElement(this.data.entity_name);
            for(a = 0; a < attributes.length; a++){
                let att = attributes[a].split(':');
                ne.setAttribute(att[0]. att[1]);
            }
            this.appendChild(ne);
        }
    }
});
