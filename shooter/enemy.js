(function() {

    /**
     * The enemies constructor.
     *
     * @method Enemy
     * @param game
     * @constructor
     */
    function Enemy(game) {
        this.game = game;
        this.remove = false;

        this.$el = $('<div class="enemy"></div>');

        this.positionX = this.rand();
        this.originalPositionX = this.positionX;

        this.positionY = 0;

        this.$el.css({
            top: this.positionY,
            left: this.positionX
        });

        this.velocityY = 0.7;
        this.$el.appendTo(game.$el);
    }

    Enemy.prototype = {

        /**
         * The render method for the game loop.
         *
         * @method render
         */
        render: function(ΔTime) {
            this.positionY += this.velocityY * ΔTime;
            this.positionX = this.originalPositionX + (Math.sin(this.positionY / 30) * 15);

            if(this.positionY >= this.game.height) {
                this.remove = true;
                this.game.addFail();
                return;
            }

            this.$el.css({
                top: this.positionY,
                left: this.positionX
            });
        },

        /**
         * Random Integer generator.
         *
         * @return {Number}
         */
        rand: function() {
            return Math.random() * this.game.width|0;
        }
    };

    /**
     * Introducing the Enemy object to the Shooter Namespace.
     * @type {*}
     */
    window.Shooter.Enemy = Enemy;
})();