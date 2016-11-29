var bootState = function (game) {
    this.init = function () {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    }
    this.preload = function () {
        game.load.image('preloader','asset/img/preloader.gif');
    }
    this.create = function () {
        game.state.start('load');
    }
}