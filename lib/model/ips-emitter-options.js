"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_mode_1 = require("./render-mode");
var IpsEmitterOptions = /** @class */ (function () {
    function IpsEmitterOptions(start, velocity, particlesSec) {
        this.start = start;
        this.velocity = velocity;
        this.particlesSec = particlesSec;
        this.lifeTime = { min: 1000, max: 1000 };
        this.size = { min: 10, max: 10 };
        this.growth = 0;
        this.color = "ffffff";
        this.alpha = 1;
        this.renderMode = render_mode_1.RenderMode.Dynamic;
    }
    return IpsEmitterOptions;
}());
exports.IpsEmitterOptions = IpsEmitterOptions;