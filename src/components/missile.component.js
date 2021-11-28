AFRAME.registerComponent('missile', {
    schema: {
        speed: {
            default: 133 // m/s (roughly the speed of a Tomahawk)
        },
        lifetime: {
            default: 5000
        },
        collisionDistance: {
            default: 3
        },
        direction: {
            type: 'vec3'
        },
        position: {
            type: 'vec3'
        },
        target: {
            type: 'string'
        }
    },
    init: function () {
        this.el.object3D.lookAt(this.data.direction.x, this.data.direction.y, this.data.direction.z);
        this.el.setAttribute("position", this.data.position);

    },
    tick: function (time, timeDelta) {
        if (this.collision) return;
        let pos = this.el.object3D.position;

        pos.x -= this.data.direction.x * this.data.speed * (timeDelta / 1000);
        pos.y -= this.data.direction.y * this.data.speed * (timeDelta / 1000);
        pos.z -= this.data.direction.z * this.data.speed * (timeDelta / 1000);

        if (this.data.lifetime < 0) {
            this.el.parentEl.removeChild(this.el);
        } this.data.lifetime -= timeDelta;


        document.querySelectorAll(this.data.target).forEach((target) => {
            if (target.object3D.position.distanceTo(pos) < this.data.collisionDistance) {
                this.collision = true;
                this.el.sceneEl.systems['game'].collision(this.el, target);
                return;
            }
        });

        // this.el.setAttribute("raycaster", {
        //     far: 5, 
        //     objects: this.data.target, 
        //     direction: new THREE.Vector3(0, 0, -1),
        //     showLine: false
        // }
        // );
        // this.el.addEventListener('raycaster-intersection', (e) => {
        //     // Hit an enemy
        //     let elm = e.detail.els[0];
        //     elm.setAttribute("selfdestruct", { timer: 1 });
        //     this.el.setAttribute("selfdestruct", { timer: 1 });
        // });
    }
});