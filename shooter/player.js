function Player(game) {
    var that = this;
    this.game = game;

    this.positionX = this.game.width / 2;
    this.positionY = this.game.height - 10;

    this.$el = $('<div id="player"></div>');

    this.$el.appendTo(this.game.$el);

    this.velocityX = 0;
    this.velocityXMax = 3;
    this.velocityXMin = -this.velocityXMax;
    this.velocityIncrease = 0;

    this.render();

    $(document).on('keydown', function(e) {
        switch(e.keyCode) {
            case 37:
                that.velocityIncrease = -0.2;
                break;
            case 39:
                that.velocityIncrease = 0.2;
                break;
            case 32:
                that.fire();
                break;
            default:
//                console.log(e);
        }
    });

    $(document).on('keyup', function(e) {
        switch(e.keyCode) {
            case 37:
                that.velocityIncrease = 0;
                that.velocityX = 0;
                break;
            case 39:
                that.velocityIncrease = 0;
                that.velocityX = 0;
                break;
            default:
//                console.log(e);
        }
    });
}

Player.prototype = {
    render: function() {
        this.velocityX += this.velocityIncrease;
        this.velocityX = (this.velocityX > this.velocityXMax) ? this.velocityXMax : this.velocityX;
        this.velocityX = (this.velocityX < this.velocityXMin) ? this.velocityXMin : this.velocityX;

        this.positionX += this.velocityX;

        this.positionX = (this.positionX < 10) ? 10 : this.positionX;
        this.positionX = (this.positionX > this.game.width - 10) ? this.game.width - 10 : this.positionX;

        this.$el.css({
            left: this.positionX,
            top: this.positionY
        });
    },
    fire: function() {
        this.game.objects.push(new Bullet(this.game));
    }
};