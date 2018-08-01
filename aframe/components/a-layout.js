/* a-layout aframe component by diekus */

AFRAME.registerComponent('a-layout', {
    schema: {
        shape:{type: 'string', default: 'circle'}, //grid, circle, spiral
        modifier:{type:'int', default:4}, // modifier will be radius if circle, and columns if grid
        items:{type:'array', default:[]},
        spacer_h:{type:'int', default:3},
        spacer_v:{type:'int', default:1},
        spiral_spins:{type:'float', default:3.0},
        spiral_delta_v:{type:'float', default:.5},
        animation:{type:'bool', default:false},
        dur_anim:{type: 'int', default:500},

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
            case 'spiral':
              this.setSpiralLayout();
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
                let tween_pos = new AFRAME.TWEEN.Tween(this.data.items[i].object3D.position).to({x:(this.data.modifier * Math.cos(toRadians(delta * i))), y: 0, z:(this.data.modifier * Math.sin(toRadians(delta * i)))}, this.data.dur_anim);
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
        let item_w = this.data.spacer_h; 
        let item_h = this.data.spacer_v;
        let f =0, c = 0;
        for(i = 0; i < this.data.items.length; i++){
          this.data.items[i].object3D.rotation.set(0, 0, 0);
          if(this.data.animation){
            let tween_pos = new AFRAME.TWEEN.Tween(this.data.items[i].object3D.position).to({x:(c * item_w + this.data.spacer), y: (f * item_h), z:0}, this.data.dur_anim);
            tween_pos.easing(TWEEN.Easing.Cubic.Out);
            tween_pos.start();
          }
          else{
            this.data.items[i].object3D.position.set(c * item_w, f * item_h, 0);
          }
          //move on columns and rows
            c++;
            if (c == cols){
                c=0;
                f++;
            }
        }
    },
    setSpiralLayout : function(){
      let radius = this.data.modifier;
      let current_v = 0.0;
        let delta = (this.data.spiral_spins*360.0)/ this.data.items.length;
        for(i = 0; i < this.data.items.length; i++){
            if(this.data.animation){
                let tween_rot = new AFRAME.TWEEN.Tween(this.data.items[i].object3D.rotation).to({y:toRadians(-(90-delta * -i))}, this.data.dur_anim*2);
                tween_rot.easing(TWEEN.Easing.Cubic.Out);
                tween_rot.start();
      let current_v = 0.0;
                let tween_pos = new AFRAME.TWEEN.Tween(this.data.items[i].object3D.position).to({x:(this.data.modifier * Math.cos(toRadians(delta * i))), y: current_v, z:(this.data.modifier * Math.sin(toRadians(delta * i)))}, this.data.dur_anim);
                tween_pos.easing(TWEEN.Easing.Cubic.Out);
                tween_pos.start();
            }
            else{
                this.data.items[i].object3D.rotateY(toRadians(180-(90-delta * -i)));
                this.data.items[i].object3D.position.set(radius * Math.cos(toRadians(delta * i)), current_v, radius * Math.sin(toRadians(delta * i)));
            }
            current_v = current_v + this.data.spiral_delta_v;
            //this.data.items[i].addEventListener('click', layout_item_click);
        }
    },
    //for the time being refresh is set as a way to force layout after insertion of entity in runtime if needed
    refreshLayout : function(){
        this.data.items = this.el.children;
        switch(this.data.shape){
            case 'circle':
                this.setCircleLayout();
                break;
            case 'grid':
                this.setGridLayout();
                break;
            case 'spiral':
              this.setSpiralLayout();
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