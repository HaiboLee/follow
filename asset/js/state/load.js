var loadState = function (game) {
    this.preload = function () {
        let preload = game.add.sprite(game.width/2,game.height/2,'preloader');
        preload.anchor.setTo(0.5);
        game.load.setPreloadSprite(preload);
        game.load.image('muddy','asset/img/muddy-ground.png');
        game.load.image('gridtiles','asset/img/gridtiles.png');
        game.load.image('car','asset/img/car.png');
        game.load.spritesheet('girl','asset/img/girl.png',32,32,32);
    }
    
    this.create = function () {
        game.state.start('menu');
    }
}