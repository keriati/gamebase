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

    this.player = new Player(this);

    this.objects = [];
    this.objects.push(this.player);
    this.pause = false;
}

Game.prototype = {
    loop: function(timer) {
        if(this.pause) {
            return;
        }
        var that = this;

        window.requestAnimationFrame(function(timer) {that.loop(timer);});

        if(this.rand(1)) {
            this.objects.push(new Enemy(this));
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

    rand: function(chance) {
        return (chance >= Math.random() * 100|0);
    },

    remove: function(object) {
        var myNumber = this.objects.indexOf(object);

        this.objects = $.grep(this.objects, function(n, i) {
            return i != myNumber;
        });
        object.$el.remove();
        delete object;
    },

    checkCollision: function() {
        var that = this;

        $.each(this.objects, function(i, bullet) {

            if(bullet instanceof Bullet) {
                $.each(that.objects, function(i, enemy) {
                    if(enemy instanceof Enemy) {
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

    addHit: function() {
        this.hits++;
        this.$hits.html(this.hits);
    },

    addFail: function() {
        this.fails++;
        this.$fails.html(this.fails);
    }

};