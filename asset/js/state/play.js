var map;
var playState = function (game) {
    let layer1;
    let girl,cursors;
    let xfoot = new Array();
    let yfoot = new Array();
    let c1,c2,graphics,g;
    let stats;
    this.init = function () {
        stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    this.create = function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '0x000000';
        map = game.add.tilemap();
        map.addTilesetImage('m','gridtiles',5,5);
        layer1 = map.create('level1',240,120,5,5);
        layer1.scrollFactorX = 0.5;
        layer1.scrollFactorY = 0.5;
        layer1.resizeWorld();

        girl  = game.add.sprite(320,320,'girl');
        game.physics.enable(girl,Phaser.Physics.ARCADE);
        girl.animations.add('up',[0,1,2,3]);
        girl.animations.add('down',[20,21,22,23]);
        girl.animations.add('left',[28,29,30,31]);
        girl.animations.add('right',[12,13,14,15]);
        girl.anchor.setTo(0.5,1);
        girl.body.gravity.y = 100;
        girl.body.collideWorldBounds = true;
        cursors = this.input.keyboard.createCursorKeys();
        game.input.onDown.add(function () {
            console.log(c2.width);
            //c2.fillAlpha = 0.9;
            //g.clear();
            //g.beginFill('0xffff00',0.1);
            //c2 = g.drawCircle(girl.x,girl.y,200);
        });


        setInterval(function () {
            if (xfoot.length!=0){
                let x = xfoot.pop();
                let y = yfoot.pop();
                map.removeTile(x,y,layer1);
            }
        },300);

        let camera = game.camera;

        graphics = game.add.graphics(0,0);
        graphics.beginFill('0xffffff');
        c1 = graphics.drawCircle(girl.x,girl.y,100);
        game.world.mask = c1;

        g = game.add.graphics(0,0);
        g.beginFill('0xff0000',0.2);
        c2 = g.drawCircle(girl.x,girl.y,100);
        //g.endFill();

        //camera.follow(girl);

    }
    this.update = function () {
        stats.update();
        if (cursors.up.isDown) {
            girl.y--;
            girl.animations.play('up',12);
            let x = Math.floor((girl.x)/5);
            let y = Math.floor((girl.y-5)/5);
            let hasTile = map.hasTile(x,y,layer1);
            if (!hasTile){
                xfoot.unshift(x);
                yfoot.unshift(y);
                createTile(1,x,y,layer1);
            }

        }else if(cursors.down.isDown){
            girl.y++;
            girl.animations.play('down',12);
            let x = Math.floor(girl.x/5);
            let y = Math.floor((girl.y-5)/5);
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
            let y = Math.floor((girl.y-5)/5);
            console.log(x)
            console.log(girl.x)
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
            let y = Math.floor((girl.y-5)/5);
            let hasTile = map.hasTile(x,y,layer1);
            if (!hasTile){
                xfoot.unshift(x);
                yfoot.unshift(y);
                createTile(1,x,y,layer1);
            }
        }
        c1.x = c2.x = girl.x-320;
        c1.y = c2.y = girl.y-320;
    }

    function createTile(i,x,y,layer){
        map.putTile(i,x,y,layer);
    }
}