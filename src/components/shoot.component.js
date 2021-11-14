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
        console.log(id, buttonName,evtName);
    },

    update() {
        var data = this.data;
        var el = this.el;
        el.setAttribute('keyboardcontrols', {});
        el.setAttribute('vive-controls', { hand: data.hand, model: false });
        el.setAttribute('oculus-touch-controls', { hand: data.hand, model: false });
        el.setAttribute('windows-motion-controls', { hand: data.hand, model: false });
    }
});
