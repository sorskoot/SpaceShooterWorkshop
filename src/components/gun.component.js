AFRAME.registerComponent('gun', {
    schema: {},
    init: function () {
        this.missilegroup = document.getElementById("missile-group");
        this.el.addEventListener('fire', evt => {
            this.spawnMissile(evt.detail.direction, evt.detail.position);
        })
    },
    update (oldData) { },
    spawnMissile (direction, position) {
        let box = document.createElement("a-entity");
        box.setAttribute("missile", { 
            direction: direction, position: position });
        box.setAttribute('mixin', 'bullet');
        this.missilegroup.appendChild(box);
    }

});