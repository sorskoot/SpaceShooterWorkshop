AFRAME.registerSystem('enemy-spawner', {
    schema: {},
    init() {
      
        
    },
    startSpawning(){
        const root = document.getElementById('enemies');
        
        this.timer = setInterval(()=>{
            let enemy = document.createElement('a-entity');
            enemy.setAttribute('mixin', 'enemy');            
            enemy.classList.add('enemy');
            root.appendChild(enemy);
        },6666);
    },
    stopSpawning(){       
        clearInterval(this.timer);
    } 
 });