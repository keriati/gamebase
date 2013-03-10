(function () {

    var defaults = {
        width: 500,
        height: 300
    };

    function Field(options) {
        options = options || {};

        $.extend(this, defaults, options);

        this.$el = $('<div id="field"></div>');

        this.objects = [];

        this.$el.css({
            width:  this.width,
            height: this.height
        });

        var that = this;

        this.$el.on('click', function (e) {
            that.addObject(new GameBall({positionX: e.offsetX, positionY: e.offsetY}));
        });
    }

    Field.prototype = {
        addObject: function (object) {
            this.objects.push(object);
            this.$el.append(object.$el);
        },

        renderAll: function () {
            var that = this;
            $.each(this.objects, function (index, object) {
                object.render(that);
            });
        }
    }

    window.Field = Field;
})();
