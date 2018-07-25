/* a-layout aframe component by diekus */

AFRAME.registerComponent('a-layout', {
    schema: {
        shape:{type: 'string', default: 'circle'}, //grid, circle, line
        modifier:{type:'int', default:4}, // modifier will be radius if circle, and columns if grid
        items:{type:'array', default:[]},
        spacer:{type:'int', default:3},
        dur_lap:{type: 'int', default:240000}
    },
    init: function(){
        this.data.items = this.el.children;
        this.setCircleLayout();
    },
    setCircleLayout : function(){
        let radius = this.data.modifier;
        let delta = 360/ this.data.items.length;
        for(i = 0; i < this.data.items.length; i++){
            this.data.items[i].object3D.rotateY(toRadians(180-(90-delta * -i)));
            //let tween_rot = new AFRAME.TWEEN.Tween(imgs[i].object3D.rotation).to({y:toRadians(-(90-ang * -i))}, trans_lapse*2);
            //tween_rot.easing(TWEEN.Easing.Cubic.Out);
            //tween_rot.start();
            this.data.items[i].object3D.position.set(radius * Math.cos(toRadians(delta * i)), 0, radius * Math.sin(toRadians(delta * i)));
            //imgs[i].addEventListener('click', layout_item_click);
            //let tween_pos = new AFRAME.TWEEN.Tween(imgs[i].object3D.position).to({x:(circ_rad * Math.cos(toRadians(ang * i))), y: 1, z:(circ_rad * Math.sin(toRadians(ang * i)))}, trans_lapse);
            //tween_pos.easing(TWEEN.Easing.Cubic.Out);
            //tween_pos.start();
        }
    },
    setGridLayout : function(){
        let cols = this.data.modifier;
        let item_w = this.data.spacer; 
        let item_h = this.data.spacer;
        let f =0, c = 0;
        for(i = 0; i < this.data.items.length; i++){
            this.data.items[i].object3D.position.set(c * item_w, f * item_h, 0);
            //let tween_pos = new AFRAME.TWEEN.Tween(imgs[i].object3D.position).to({x:(c * img_w + spacer), y: (f * img_h), z:-6}, trans_lapse);
            //tween_pos.easing(TWEEN.Easing.Cubic.Out);
            //tween_pos.start();
            this.data.items[i].object3D.rotation.set(0, 0, 0);
            c++;
            if (c == cols){
                c=0;
                f++;
            }
        }
    },
    rotate : function(){

    }
});

/* utils */
function toRadians(degree) {
    return degree * (Math.PI / 180);
}

function toDegrees(radians) {
    return radians * (180 / Math.PI);
}