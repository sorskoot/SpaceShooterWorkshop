AFRAME.registerComponent('keyboardcontrols', {
    init: function () {
        // setting reload to true on keydown and to false on keyup prevents the key from being held down
        let reload = false;

        document.body.addEventListener('keydown', e => {
            if (e.code === 'Space' && !reload) {
                reload = true;
                // sending the button down event mimics the trigger being pressed
                this.el.emit('fire', { id: 0, position: this.el.object3D.getWorldPosition() ,direction: this.getDirection() });
            }
        });

        document.body.addEventListener('keyup', e => {
            if (e.code === 'Space') {
                reload = false;
                // sending the button down event mimics the trigger being released
                this.el.emit('buttonup', { id: 0, direction: this.getDirection() });
            }
        });
    },

    /**
     * Gets the direction the player is looking
     * @returns {THREE.Vector3} The vector in which the player is looking
     */
    getDirection() {
        let camera = document.querySelector('a-entity[camera]').object3D;
        let v = new THREE.Vector3(0, 0, 1);
        v.applyQuaternion(camera.quaternion);
        return v;
    }
});