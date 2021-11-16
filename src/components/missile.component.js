AFRAME.registerComponent('missile', {
    schema: {
        speed: {
            default: 133 // m/s (roughly the speed of a Tomahawk)
        },
        lifetime: {
            default: 250
        },
        collisionDistance: {
            default: 5
        },
        direction: {
            type: 'vec3'
        },
        position: {
            type: 'vec3'
        },
        yCorrection:{
            default:-.1
        }
    },
    init: function () {
        this.el.object3D.lookAt(this.data.direction.x, this.data.direction.y,this.data.direction.z);
        this.el.setAttribute("position", this.data.position);
        
    },
    tick: function (time, timeDelta) {
        if (this.collision) return;
        let pos = this.el.object3D.position;
        pos.x -= this.data.direction.x * this.data.speed * (timeDelta / 1000);
        pos.y -= (this.data.direction.y + this.data.yCorrection) * this.data.speed * (timeDelta / 1000);
        pos.z -= this.data.direction.z * this.data.speed * (timeDelta / 1000);
        if (pos.z < -this.data.lifetime) {
            this.el.parentEl.removeChild(this.el);
        }

        // let invaders = document.querySelectorAll('[invader]');
        // let missilePos = new THREE.Vector3(pos.x, pos.y, pos.z);

        // for (let i = 0; i < invaders.length; i++) {
        //     let ipos = invaders[i].object3D.position;
        //     let invaderPos = new THREE.Vector3(ipos.x, ipos.y, ipos.z);
        //     let distVector = new THREE.Vector3();
        //     distVector.subVectors(missilePos, invaderPos);
        //     let dist = Math.sqrt(distVector.x * distVector.x + distVector.y * distVector.y + distVector.z * distVector.z);

        //     if (dist < this.data.collisionDistance && !this.collision) {
        //         this.collision = true;
        //         document.querySelector('[game]').emit('collision', { missile: this.el, invader: invaders[i] });
        //     }
        // }
    }
});