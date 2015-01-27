var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Asteroid
 * Created by raul on 1/23/15.
 */
var spacewars;
(function (spacewars) {
    var Asteroid = (function (_super) {
        __extends(Asteroid, _super);
        function Asteroid(point) {
            _super.call(this);
            this.x = point.x;
            this.y = point.y;
            this.init();
        }
        Asteroid.prototype.init = function () {
            this.graphics.setStrokeStyle(2);
            this.graphics.beginStroke("#FFFFFF");
            this.graphics.drawPolyStar(100, 100, 50, 5, 0.6, -90);
            this.graphics.endStroke();
        };
        return Asteroid;
    })(createjs.Shape);
    spacewars.Asteroid = Asteroid;
})(spacewars || (spacewars = {}));

/**
 * Created by raul on 9/23/14.
 */
/// <reference path="../../definitions/handlebars/handlebars.d.ts" />

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Spaceship
 * Created by raul on 1/23/15.
 */
var spacewars;
(function (spacewars) {
    var Spaceship = (function (_super) {
        __extends(Spaceship, _super);
        function Spaceship(point) {
            _super.call(this);
            this.x = point.x;
            this.y = point.y;
            this.init();
        }
        Spaceship.prototype.init = function () {
            this.graphics.setStrokeStyle(2);
            this.graphics.beginStroke("#FFFFFF");
            this.graphics.moveTo(13, 0);
            this.graphics.lineTo(-13, 10);
            this.graphics.moveTo(13, 0);
            this.graphics.lineTo(-13, -10);
            this.graphics.moveTo(-7, 8);
            this.graphics.lineTo(-7, -8);
            //this.graphics.drawCircle(0,0,16);
            this.graphics.endStroke();
        };
        return Spaceship;
    })(createjs.Shape);
    spacewars.Spaceship = Spaceship;
})(spacewars || (spacewars = {}));

/// <reference path="../../definitions/handlebars/handlebars.d.ts" />
/// <reference path="../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../definitions/easeljs/easeljs.d.ts" />
/// <reference path="../../definitions/js-signals/js-signals.d.ts" />
/// <reference path="./HandlebarsTemplates.ts" />
/// <reference path="Spaceship.ts" />
/// <reference path="Asteroid.ts" />
$(function () {
    var stage = new createjs.Stage("GameCanvas");
    var ship = new spacewars.Spaceship({ x: 120, y: 120 });
    var rock = new spacewars.Asteroid({ x: 400, y: 120 });
    //
    stage.addChild(ship);
    stage.addChild(rock);
    function tick() {
        rock.x -= 1;
        stage.update();
    }
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);
    stage.update();
});

//# sourceMappingURL=main.js.map