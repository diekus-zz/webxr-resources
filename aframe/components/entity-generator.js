/* entity-generator aframe component by diekus */

AFRAME.registerComponent('entity-generator', {
    schema: {
        entity_name:{type: 'string', default: 'a-entity'}, 
        attributes:{type:'string', default:''}, 
        number_items:{type:'int', default:2},
    },
    init: function(){
        for (i = 0; i < this.data.number_items; i++){
            let ne = document.createElement(this.data.entity_name);
            ne.setAttribute('class', this.data.attributes);
            this.el.appendChild(ne);
            
        }
    }
});
