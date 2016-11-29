var playState = function (game) {
    let map,layer1;
    let girl,cursors;
    this.create = function () {
        game.stage.backgroundColor = '#2d2d2d';
        map = game.add.tilemap();
        map.addTilesetImage('m','gridtiles',32,32);
        layer1 = map.create('level1',50,38,32,32);
        layer1.scrollFactorX = 0.5;
        layer1.scrollFactorY = 0.5;
        layer1.resizeWorld();
        map.putTile(1,0,0,layer1);

        girl  = game.add.sprite(320,320,'girl');
        girl.animations.add('up',[0,1,2,3]);
        girl.animation.play('up',12,true);
        //girl.anchor.setTo(0.5);
        map.putTile(1,Math.floor(girl.x/32),Math.floor(girl.y/32),layer1);
        cursors = this.input.keyboard.createCursorKeys();
        game.input.onDown.add(function () {
            map.removeTile(0,0,layer1);
        });


    }
    this.update = function () {
        if (cursors.up.isDown) {
            girl.y--;
            let hasTile = map.hasTile(Math.floor((girl.x+16)/32),Math.floor((girl.y+16)/32),layer1);
            if (!hasTile){
                createTile(1,Math.floor(girl.x/32),Math.floor(girl.y/32),layer1);
            }
        }else if(cursors.down.isDown){
            girl.y++;
            let  hasTile = map.hasTile(Math.floor((girl.x+16)/32),Math.floor((girl.y+16)/32),layer1);
            if (!hasTile){
                createTile(1,Math.floor(girl.x/32),Math.floor(girl.y/32),layer1);
            }
        }else if(cursors.right.isDown){
            girl.x++;
            let  hasTile = map.hasTile(Math.floor((girl.x+16)/32),Math.floor((girl.y+16)/32),layer1);
            if (!hasTile){
                createTile(1,Math.floor(girl.x/32),Math.floor(girl.y/32),layer1);
            }
        }else if(cursors.left.isDown){
            girl.x--;
            let  hasTile = map.hasTile(Math.floor((girl.x+16)/32),Math.floor((girl.y+16)/32),layer1);
            if (!hasTile){
                createTile(1,Math.floor(girl.x/32),Math.floor(girl.y/32),layer1);
            }
        }
    }

    function createTile(i,x,y,layer){
        map.putTile(i,x,y,layer);
    }
}