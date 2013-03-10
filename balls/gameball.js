(function() {

    var defaults = {
        bgcolor:      "000000000",
        velocityX:    1,
        maxVelocityX: 6,
        velocityY:    1,
        maxVelocityY: 6,
        positionX:    0,
        positionY:    0
    };


    function GameBall(options) {
        options = options || {};
        $.extend(this, defaults, options);

        this.$el = $('<div id="ball"></div>');

        this.$el.css({
            position: 'absolute',
            top: this.positionX,
            left: this.positionY
        });
    }

    GameBall.prototype = {
        render: function(field) {
            this.renderLogic(field);
            this.capVelocity();

            this.positionX += this.velocityX;
            this.positionY += this.velocityY;

            this.$el.css({
                left: this.positionX,
                top: this.positionY
            });
        },
        capVelocity: function() {
            this.velocityX = (this.velocityX >= this.maxVelocityX) ? this.maxVelocityX : this.velocityX;
            this.velocityY = (this.velocityY >= this.maxVelocityY) ? this.maxVelocityY : this.velocityY;
        },
        renderLogic: function(field) {
            if (this.positionX >= field.width) {
                this.velocityX = -1.2 * this.velocityX;
            }
            if (this.positionX < 0) {
                this.velocityX = -1.2 * this.velocityX;
            }
            if (this.positionY >= field.height) {
                this.velocityY = -1.2 * this.velocityY;
            }
            if (this.positionY < 0) {
                this.velocityY = -1.2 * this.velocityY;
            }
        }
    }

    window.GameBall = GameBall;
})();
