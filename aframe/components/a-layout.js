/* a-layout aframe component by diekus */

AFRAME.registerComponent('a-layout', {
    schema: {
        shape:{type: 'string', default: 'circle'}, //grid, circle, line
        modifier:{type:'int', default:4}, // modifier will be radius if circle, and columns if grid
        items:{type:'array', default:[]},
        spacer:{type:'int', default:3},
        animation:{type:'bool', default:false},
        dur_anim:{type: 'int', default:500}
    },
    init: function(){
        this.data.items = this.el.children;
        let curComp = this.el.components['a-layout'];
        //set mutationObserver to the current element
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
            for (var i = 0; i < mutation.addedNodes.length; i++)
                curComp.refreshLayout(); // to ensure new elements are positioned and updated during runtime
                
            });
        });
        observer.observe(this.el, { childList: true });
        document.querySelector('a-scene').addEventListener('loaded', function(){
            curComp.refreshLayout(); // to make sure all elemets are loaded and positioned when the scene is laoded
        });
    },
    update : function(){
        this.data.items = this.el.children;
        switch(this.data.shape){
            case 'circle':
                this.setCircleLayout();
                break;
            case 'grid':
                this.setGridLayout();
                break;
        }
    },
    setCircleLayout : function(){
        let radius = this.data.modifier;
        let delta = 360/ this.data.items.length;
        for(i = 0; i < this.data.items.length; i++){
            if(this.data.animation){
                let tween_rot = new AFRAME.TWEEN.Tween(this.data.items[i].object3D.rotation).to({y:toRadians(-(90-delta * -i))}, this.data.dur_anim*2);
                tween_rot.easing(TWEEN.Easing.Cubic.Out);
                tween_rot.start();
                let tween_pos = new AFRAME.TWEEN.Tween(this.data.items[i].object3D.position).to({x:(this.data.modifier * Math.cos(toRadians(delta * i))), y: 1, z:(this.data.modifier * Math.sin(toRadians(delta * i)))}, this.data.dur_anim);
                tween_pos.easing(TWEEN.Easing.Cubic.Out);
                tween_pos.start();
            }
            else{
                this.data.items[i].object3D.rotateY(toRadians(180-(90-delta * -i)));
                this.data.items[i].object3D.position.set(radius * Math.cos(toRadians(delta * i)), 0, radius * Math.sin(toRadians(delta * i)));
            }
            //this.data.items[i].addEventListener('click', layout_item_click);
        }
    },
    setGridLayout : function(){
        let cols = this.data.modifier;
        let item_w = this.data.spacer; 
        let item_h = this.data.spacer;
        let f =0, c = 0;
        for(i = 0; i < this.data.items.length; i++){
            this.data.items[i].object3D.position.set(c * item_w, f * item_h, 0);
            let tween_pos = new AFRAME.TWEEN.Tween(this.data.items[i].object3D.position).to({x:(c * item_w + this.data.spacer), y: (f * item_h), z:-6}, this.data.dur_anim);
            tween_pos.easing(TWEEN.Easing.Cubic.Out);
            tween_pos.start();
            this.data.items[i].object3D.rotation.set(0, 0, 0);
            c++;
            if (c == cols){
                c=0;
                f++;
            }
        }
    },
    refreshLayout : function(){
        this.data.items = this.el.children;
        switch(this.data.shape){
            case 'circle':
                this.setCircleLayout();
                break;
            case 'grid':
                this.setGridLayout();
                break;
        }
    }
});

/* utils */
function toRadians(degree) {
    return degree * (Math.PI / 180);
}

function toDegrees(radians) {
    return radians * (180 / Math.PI);
}