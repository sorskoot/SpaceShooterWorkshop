AFRAME.registerSystem('enemy-spawner', {
    schema: {},
    init: function () {
        const root = document.getElementById('enemies');
        setInterval(()=>{
            let enemy = document.createElement('a-entity');
            enemy.setAttribute('mixin', 'enemy');            
            enemy.classList.add('enemy');
            root.appendChild(enemy);
        },6666);
    },
 
 });