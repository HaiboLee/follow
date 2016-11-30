var playState = function (game) {
    let map,layer1;
    let girl,cursors;
    let xfoot = new Array();
    let yfoot = new Array();
    this.create = function () {
        game.stage.backgroundColor = '#2d2d2d';
        map = game.add.tilemap();
        map.addTilesetImage('m','gridtiles',5,5);
        layer1 = map.create('level1',160,120,5,5);
        layer1.scrollFactorX = 0.5;
        layer1.scrollFactorY = 0.5;
        layer1.resizeWorld();
        map.putTile(1,0,0,layer1);

        girl  = game.add.sprite(320,320,'girl');
        girl.animations.add('up',[0,1,2,3]);
        girl.animations.add('down',[20,21,22,23]);
        girl.animations.add('left',[28,29,30,31]);
        girl.animations.add('right',[12,13,14,15]);
        girl.anchor.setTo(0.5,1);
        map.putTile(1,Math.floor(girl.x/5),Math.floor(girl.y/5),layer1);
        cursors = this.input.keyboard.createCursorKeys();
        game.input.onDown.add(function () {
            map.removeTile(0,0,layer1);
        });

        setInterval(function () {
            if (xfoot.length!=0){
                let x = xfoot.pop();
                let y = yfoot.pop();
                map.removeTile(x,y,layer1);
            }
        },300);

        let camera = game.camera;

        camera.follow(girl);

    }
    this.update = function () {
        if (cursors.up.isDown) {
            girl.y--;
            girl.animations.play('up',12);
            let x = Math.floor((girl.x)/5);
            let y = Math.floor((girl.y)/5);
            let hasTile = map.hasTile(x,y,layer1);
            if (!hasTile){
                xfoot.unshift(x);
                yfoot.unshift(y);
                createTile(1,x,y,layer1);
            }
        }else if(cursors.down.isDown){
            girl.y++;
            girl.animations.play('down',12);
            let x = Math.floor((girl.x)/5);
            let y = Math.floor((girl.y)/5);
            let hasTile = map.hasTile(x,y,layer1);
            if (!hasTile){
                xfoot.unshift(x);
                yfoot.unshift(y);
                createTile(1,x,y,layer1);
            }
        }else if(cursors.right.isDown){
            girl.x++;
            girl.animations.play('right',12);
            let x = Math.floor((girl.x)/5);
            let y = Math.floor((girl.y)/5);
            let hasTile = map.hasTile(x,y,layer1);
            if (!hasTile){
                xfoot.unshift(x);
                yfoot.unshift(y);
                createTile(1,x,y,layer1);
            }
        }else if(cursors.left.isDown){
            girl.x--;
            girl.animations.play('left',12);
            let x = Math.floor((girl.x)/5);
            let y = Math.floor((girl.y)/5);
            let hasTile = map.hasTile(x,y,layer1);
            if (!hasTile){
                xfoot.unshift(x);
                yfoot.unshift(y);
                createTile(1,x,y,layer1);
            }
        }
    }

    function createTile(i,x,y,layer){
        map.putTile(i,x,y,layer);
    }
}