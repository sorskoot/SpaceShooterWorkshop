AFRAME.registerComponent('enemy', {
   schema: {},
   init: function () { 
       this.el.object3D.position.set(0, 10, -100);
       this.z = -100;
   },

   tick: function (time, timeDelta) { 
       this.z+=timeDelta/50;
       this.el.object3D.position.set(0, 10, this.z);
       if(this.z > 20){
           this.z=-100;
       }
   },

});