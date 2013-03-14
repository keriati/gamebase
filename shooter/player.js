(function() {

    /**
     * The Player object.
     *
     * @method Player
     * @param game
     * @constructor
     */
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

        // ΔTime mocked for render -> 1 -> no adjustment;
        this.render(1);

        /**
         * Assigning events for keyboard.
         */
        $(document).on('keydown', function(e) {
            switch(e.keyCode) {
                case 37: //Left arrow
                    that.velocityIncrease = -0.2;
                    break;
                case 39: //Right arrow
                    that.velocityIncrease = 0.2;
                    break;
                case 32: //Space for fire
                    that.fire();
                    break;
                default:
    //                console.log(e);
            }
        });

        /**
         * Assigning more events for keyboard.
         */
        $(document).on('keyup', function(e) {
            switch(e.keyCode) {
                case 37: //Left arrow
                    that.velocityIncrease = 0;
                    that.velocityX = 0;
                    break;
                case 39: //Right arrow
                    that.velocityIncrease = 0;
                    that.velocityX = 0;
                    break;
                default:
    //                console.log(e);
            }
        });
    }

    Player.prototype = {
        /**
         * The render method for the game loop.
         *
         * @method render
         */
        render: function(ΔTime) {

            this.velocityX += (this.velocityIncrease);
            this.velocityX *= ΔTime;  // The best place for this?

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

        /**
         * Shooting action of the player -> creates new bullet at player's position.
         *
         * @method fire
         */
        fire: function() {
            this.game.objects.push(new Shooter.Bullet(this.game));
        }
    };

    /**
     * Introducing the Player object to the Shooter Namespace.
     * @type {*}
     */
    window.Shooter.Player = Player;
})();