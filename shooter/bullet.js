function Bullet(game) {
    this.game = game;
    this.remove = false;

    this.$el = $('<div class="bullet"></div>');

    this.positionY = this.game.player.positionY;
    this.positionX = this.game.player.positionX;

    this.velocityY = 1.2;

    this.$el.appendTo(game.$el);
}

Bullet.prototype = {
    render: function() {
        if(this.positionY <= 0) {
            this.remove = true;
            return;
        }

        this.positionY -= this.velocityY;

        this.$el.css({
            left: this.positionX,
            top: this.positionY
        });
    }
};