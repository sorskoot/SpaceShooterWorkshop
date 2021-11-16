AFRAME.registerComponent('shoot', {
    schema: {
        hand: { default: 'left' }
    },

    init() {
        var el = this.el;
        el.addEventListener('buttondown', e => this.onButtonEvent(e.detail.id, 'down'));
        el.addEventListener('buttonup', e => this.onButtonEvent(e.detail.id, 'up'));
    },

    mapping: {
        0: 'trigger',
        1: 'grip',
        3: 'stick',
        4: 'B/X',
        5: 'A/Y'
    },

    onButtonEvent(id, evtName) {
        var buttonName = this.mapping[id];

        if (evtName === 'down' && buttonName === 'trigger') {
            let rot = new THREE.Euler(
                this.el.object3D.rotation.x,
                this.el.object3D.rotation.y,
                this.el.object3D.rotation.z, 'XYZ');
            let v = new THREE.Vector3(0, 0, 1);
            v.applyEuler(rot);
            this.el.emit('fire', {
                direction: {
                    x: v.x,
                    y: v.y,
                    z: v.z
                }, position: {
                    x: this.el.object3D.position.x,
                    y: this.el.object3D.position.y - 0.5,
                    z: this.el.object3D.position.z
                }
            });
        }

    },

    update() {
        var data = this.data;
        var el = this.el;
      //  el.setAttribute('keyboardcontrols', {});
        el.setAttribute('vive-controls', { hand: data.hand, model: false });
        el.setAttribute('oculus-touch-controls', { hand: data.hand, model: false });
        el.setAttribute('windows-motion-controls', { hand: data.hand, model: false });
    }
});
