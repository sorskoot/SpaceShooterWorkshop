const GAME_STATE = {
   Title: 0,
   Playing: 1,
   GameOver: 2
}

AFRAME.registerSystem('game', {
   schema: {},
   init: function () {
      this.gameState = GAME_STATE.Title;

      this.titleEl = document.querySelector('#title');
      this.gameOverEl = document.querySelector('#game-over');

      this.el.sceneEl.addEventListener('buttondown', (evt) => {
         if (this.gameState === GAME_STATE.Playing) {
            evt.detail.src.emit('fire', {
               direction: evt.detail.direction,
               position: evt.detail.position
            });
         } else {
            this.gameState = GAME_STATE.Playing;
            this.el.sceneEl.systems['enemy-spawner'].startSpawning();
            this.updateScene();
         }

      });
      this.updateScene();
   },
   collision(a, b) {
      if (a.classList.contains('bomb')) {
         a.setAttribute("selfdestruct", { timer: 1 });
         this.gameover();
      }
      else {
         a.setAttribute("selfdestruct", { timer: 1 });
         b.setAttribute("selfdestruct", { timer: 1 })
      }
   },
   gameover() {
      this.gameState = GAME_STATE.GameOver;
      this.el.sceneEl.systems['enemy-spawner'].stopSpawning();
      document.querySelectorAll('.enemy').forEach(enemy => {
         enemy.remove();
      });
      document.querySelectorAll('.bomb').forEach(bomb => {
         bomb.remove();
      });
      this.updateScene();
   },
   updateScene() {
      switch (this.gameState) {
         case GAME_STATE.Title:
            this.gameOverEl.setAttribute('visible', false);
            this.titleEl.setAttribute('visible', true);
            break;
         case GAME_STATE.Playing:
            this.titleEl.setAttribute('visible', false);
            this.gameOverEl.setAttribute('visible', false);
            break;
         case GAME_STATE.GameOver:
            this.titleEl.setAttribute('visible', false);
            this.gameOverEl.setAttribute('visible', true);
            break;
      }
   }

});