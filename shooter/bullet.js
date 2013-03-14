(function() {

    /**
     * The bullet object.
     *
     * @method Bullet
     * @param game
     * @constructor
     */
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
        /**
         * The render function for the game loop.
         * Moving the bullet happens here.
         *
         * @method render
         */
        render: function(ΔTime) {
            if(this.positionY <= 0) {
                this.remove = true;
                return;
            }

            this.positionY -= this.velocityY * ΔTime;

            this.$el.css({
                left: this.positionX,
                top: this.positionY
            });
        }
    };

    /**
     * Introducing the Bullet object to the Shooter Namespace.
     *
     * @type {*}
     */
    window.Shooter.Bullet = Bullet;
})();