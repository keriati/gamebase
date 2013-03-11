(function() {

    /**
     * The Shooter Game
     *
     * @method Game
     * @constructor
     */
    function Game() {
        this.$el = $('<div id="game"></div>');
        this.$el.insertAfter('#score');

        this.hits = 0;
        this.fails = 0;

        this.$hits = $('<div id="hits">0</div>');
        this.$fails = $('<div id="fails">0</div>');

        this.$hits.appendTo('#score');
        this.$fails.appendTo('#score');

        this.width = 500;
        this.height = 300;

        this.$el.css({
            width: this.width,
            height: this.height
        });

        this.player = new Shooter.Player(this);

        this.objects = [];
        this.objects.push(this.player);
        this.pause = false;
    }

    Game.prototype = {
        /**
         * The main loop that triggers the render()
         * functions of all moving objects of the game
         *
         * @method loop
         * @param timer
         */
        loop: function(timer) {
            if(this.pause) {
                return;
            }
            var that = this;

            window.requestAnimationFrame(function(timer) {that.loop(timer);});

            if(this.rand(1)) {
                this.objects.push(new Shooter.Enemy(this));
            }

            this.checkCollision();

            $.each(this.objects, function(index, object) {
                if(object.remove) {
                    that.remove(object);
                } else {
                    object.render();
                }
            });
        },

        /**
         * Generate random Boolean by chance
         *
         * @method rand
         * @param chance
         * @return Boolean
         */
        rand: function(chance) {
            return (chance >= Math.random() * 100|0);
        },

        /**
         * Removes one object from the Game.
         *
         * @method remove
         * @param object
         */
        remove: function(object) {
            var myNumber = this.objects.indexOf(object);

            this.objects = $.grep(this.objects, function(n, i) {
                return i != myNumber;
            });
            object.$el.remove();
            delete object;
        },

        /**
         * Checks for object collision (bullet with enemy).
         * On hit we remove both objects and increase the score.
         *
         * @method checkCollision
         */
        checkCollision: function() {
            var that = this;

            $.each(this.objects, function(i, bullet) {

                if(bullet instanceof Shooter.Bullet) {
                    $.each(that.objects, function(i, enemy) {
                        if(enemy instanceof Shooter.Enemy) {
                            var distanceX = Math.abs(bullet.positionX - enemy.positionX),
                                distanceY = Math.abs(bullet.positionY - enemy.positionY);

                            if(distanceX < 15 && distanceY < 5) {
//                            console.log('hit');
                                bullet.remove = true;
                                enemy.remove = true;
                                that.addHit();
                            }
                        }
                    });
                }
            });
        },

        /**
         * Increase the hit score and display it.
         *
         * @method addHit
         */
        addHit: function() {
            this.hits++;
            this.$hits.html(this.hits);
        },

        /**
         * Increases the fail score and displays it.
         *
         * @method addFail
         */
        addFail: function() {
            this.fails++;
            this.$fails.html(this.fails);
        }

    };

    /**
     * Introducing the Shooter Namespace and the Game Object to Global.
     *
     * @type {Object}
     */
    window.Shooter = {};
    window.Shooter.Game = Game;
})();