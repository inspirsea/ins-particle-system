"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var particle_emitter_1 = require("./particle-emitter");
var context_1 = require("./context");
var util_1 = require("./util/util");
var ParticleSystem = /** @class */ (function () {
    function ParticleSystem(options, canvas, width, height) {
        this.canvas = canvas;
        this.particleEmitters = [];
        this.time = +Date.now().toString().slice(5);
        this.fps = 60;
        this.running = false;
        this.context = new context_1.Context(options, canvas);
        this.onLoad = this.context.onLoad();
        this.width = width;
        this.height = height;
        var color = util_1.Util.colorHexToGl(options.color);
        this.color = [color[0], color[1], color[2], options.alpha];
        if (options.startOnEntry) {
            this.addViewPortListeners();
        }
    }
    ParticleSystem.prototype.start = function () {
        if (!this.running) {
            this.running = true;
            this.time = this.getTime();
            this.intervalTimer = setInterval(this.run(), 0);
        }
    };
    ParticleSystem.prototype.stop = function () {
        if (this.running) {
            clearInterval(this.intervalTimer);
            this.running = false;
        }
    };
    ParticleSystem.prototype.setSize = function (width, height) {
        this.width = width;
        this.height = height;
    };
    ParticleSystem.prototype.addEmitter = function (options) {
        var emitter = new particle_emitter_1.ParticleEmitter(this.context, options, this.width, this.height);
        this.particleEmitters.push(emitter);
        return emitter;
    };
    ParticleSystem.prototype.removeEmitter = function (emitter) {
        var index = this.particleEmitters.indexOf(emitter);
        if (index != -1) {
            this.particleEmitters.splice(index, 1);
        }
    };
    ParticleSystem.prototype.update = function (delta) {
        for (var _i = 0, _a = this.particleEmitters; _i < _a.length; _i++) {
            var particleEmitter = _a[_i];
            particleEmitter.update(delta);
        }
    };
    ParticleSystem.prototype.render = function () {
        this.context.clear([0, 0, 0, 0]);
        for (var _i = 0, _a = this.particleEmitters; _i < _a.length; _i++) {
            var particleEmitter = _a[_i];
            particleEmitter.render(this.time);
        }
    };
    ParticleSystem.prototype.destroy = function () {
        this.stop();
    };
    ParticleSystem.prototype.run = function () {
        var _this = this;
        var loops = 0, skipTicks = 1000 / this.fps, maxFrameSkip = 3, nextGameTick = this.getTime();
        return function () {
            while (_this.getTime() > nextGameTick && loops < maxFrameSkip) {
                var delta = nextGameTick - _this.time;
                _this.time = nextGameTick;
                _this.context.clear(_this.color);
                _this.update(delta);
                _this.render();
                nextGameTick += skipTicks;
            }
            ;
        };
    };
    ParticleSystem.prototype.getTime = function () {
        return +Date.now().toString().slice(5);
    };
    ParticleSystem.prototype.addViewPortListeners = function () {
        var _this = this;
        this.intersectionWatcher = new IntersectionObserver(function (intersectionObservers) {
            for (var _i = 0, intersectionObservers_1 = intersectionObservers; _i < intersectionObservers_1.length; _i++) {
                var observer = intersectionObservers_1[_i];
                if (observer.isIntersecting) {
                    _this.start();
                }
                else {
                    _this.stop();
                }
            }
        });
        this.intersectionWatcher.observe(this.canvas);
    };
    return ParticleSystem;
}());
exports.ParticleSystem = ParticleSystem;
