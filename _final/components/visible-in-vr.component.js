AFRAME.registerComponent('visible-in-vr', {
    schema: {
        visible: { default: true }
    },
    init: function () {
        this.el.setAttribute('visible', !this.data.visible);
        this.el.sceneEl.addEventListener('enter-vr', () => {
            this.el.setAttribute('visible', this.data.visible);
        });
        this.el.sceneEl.addEventListener('exit-vr', () => {
            this.el.setAttribute('visible', !this.data.visible);
        });
    },
});