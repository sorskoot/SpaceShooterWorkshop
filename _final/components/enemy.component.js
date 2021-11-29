AFRAME.registerComponent('enemy', {
    schema: {},
    init: function () {
        this.el.object3D.position.set(0, 10, -100);
        this.t = 0;
        this.looptime = 12000;

        this.path = [
            new THREE.Vector3(-100, -50, -200),
            new THREE.Vector3(50, 0, -150),
            new THREE.Vector3(-20, 10, -100),
            new THREE.Vector3(0, 20, 0),
            new THREE.Vector3(-80, 30, 40)
        ];
        this.curve = new THREE.CatmullRomCurve3(this.path, true);        
        this.hasFired = false;
        this.bombgroup = document.getElementById("bomb-group");
        this.shoot = Math.random() * 5000;
    },

    tick(time, timeDelta) {
        this.t += timeDelta;
        if (this.t > this.looptime) {
            this.t = 0;
            this.hasFired = false;
        };
        if(this.t > this.shoot && !this.hasFired) {
            this.hasFired = true;
            this.spawnMissile();
        }

        this.el.object3D.position.copy(this.curve.getPointAt(this.t / this.looptime));;
        this.el.object3D.lookAt(this.curve.getPointAt(Math.min(this.t / this.looptime + .001, 1)));        
    },

    spawnMissile() {
        let position = this.el.object3D.position;
        let direction = new THREE.Vector3(0,1,0);
        direction = direction.sub(this.el.object3D.position).normalize().multiplyScalar(-1);

        let box = document.createElement("a-entity");
        box.classList.add("bomb");        
        box.setAttribute("missile", {
            direction: direction, position: position,speed:75,target:'.player'
        });
        let bomb = document.createElement("a-entity");
       
        bomb.setAttribute('mixin', 'bomb');
        box.appendChild(bomb);
        this.bombgroup.appendChild(box);
    }

});