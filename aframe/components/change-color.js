/* change-color aframe component by diekus */

AFRAME.registerComponent('change-color', {
  schema:{
    color1: {type:'color', default:'#0096FF'},
    color2: {type:'color', default:'#FFC800'},
    steps: {type:'int', default:0},
    index: {type:'int', default:0},
    range: {type:'array', default:[]}

  },
  init:function(){
    this.generateColorRange();
  },
  update:function(){
    this.generateColorRange();
    if(this.el.object3D != null && this.data.index < this.data.range.length){
      let newMaterial = new THREE.MeshLambertMaterial({color:this.data.range[this.data.index]});
      this.el.object3D.children[0].material = newMaterial;
    }
  },
  rotateColor:function(){
    let newMaterial = new THREE.MeshLambertMaterial({color:this.data.range[this.data.index++ % this.data.range.length]});
    this.el.object3D.children[0].material = newMaterial;
  },
  generateColorRange:function(){
    let c1 = this.data.color1;
    let c2 = this.data.color2;
    if(this.data.steps == 0){
      this.data.range = [c1, c2];
    }
    else{
      //we get each color in decimal
      let c1_r = parseInt(c1.substring(1,3), 16);
      let c1_g = parseInt(c1.substring(3,5), 16);
      let c1_b = parseInt(c1.substring(5,7), 16);
      let c2_r = parseInt(c2.substring(1,3), 16);
      let c2_g = parseInt(c2.substring(3,5), 16);
      let c2_b = parseInt(c2.substring(5,7), 16);
      //calculate the delta for change in r b and g
      let delta_r = (c1_r - c2_r)/this.data.steps;
      let delta_g = (c1_g - c2_g)/this.data.steps;
      let delta_b = (c1_b - c2_b)/this.data.steps;
      //create each intermediate step based on deltas
      for(step = 1; step < this.data.steps+1; step++){
        let step_r = c1_r > c2_r? c1_r - delta_r*step: c1_r + delta_r*step;
        let step_g = c1_g > c2_g? c1_g - delta_g*step: c1_g + delta_g*step;
        let step_b = c1_b > c2_b? c1_b - delta_b*step: c1_b + delta_b*step;
        //generate hex string
        let hex_r = Math.abs(Math.floor(step_r)).toString(16);
        let hex_g = Math.abs(Math.floor(step_g)).toString(16);
        let hex_b = Math.abs(Math.floor(step_b)).toString(16);
        //check hex string length
        if(hex_r.length < 2) {
          hex_r = '0' + hex_r;
        }
        if(hex_g.length < 2) {
          hex_g = '0' + hex_g;
        }
        if(hex_b.length < 2) {
          hex_b = '0' + hex_b;
        }
        this.data.range[step] = `#${hex_r}${hex_g}${hex_b}`;
      }
      this.data.range[0] = c1;
      this.data.range[this.data.steps+1] = c2;
    }
  }
});