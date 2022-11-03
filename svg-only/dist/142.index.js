"use strict";
exports.id = 142;
exports.ids = [142];
exports.modules = {

/***/ 7142:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "createGif": () => (/* binding */ createGif)
});

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(2081);
// EXTERNAL MODULE: external "canvas"
var external_canvas_ = __webpack_require__(1576);
// EXTERNAL MODULE: ../types/grid.ts
var types_grid = __webpack_require__(2881);
;// CONCATENATED MODULE: ../draw/pathRoundedRect.ts
const pathRoundedRect_pathRoundedRect = (ctx, width, height, borderRadius) => {
    ctx.moveTo(borderRadius, 0);
    ctx.arcTo(width, 0, width, height, borderRadius);
    ctx.arcTo(width, height, 0, height, borderRadius);
    ctx.arcTo(0, height, 0, 0, borderRadius);
    ctx.arcTo(0, 0, width, 0, borderRadius);
};

;// CONCATENATED MODULE: ../draw/drawGrid.ts


const drawGrid_drawGrid = (ctx, grid, cells, o) => {
    for (let x = grid.width; x--;)
        for (let y = grid.height; y--;) {
            if (!cells || cells.some((c) => c.x === x && c.y === y)) {
                const c = (0,types_grid/* getColor */.Lq)(grid, x, y);
                // @ts-ignore
                const color = !c ? o.colorEmpty : o.colorDots[c];
                ctx.save();
                ctx.translate(x * o.sizeCell + (o.sizeCell - o.sizeDot) / 2, y * o.sizeCell + (o.sizeCell - o.sizeDot) / 2);
                ctx.fillStyle = color;
                ctx.strokeStyle = o.colorDotBorder;
                ctx.lineWidth = 1;
                ctx.beginPath();
                pathRoundedRect_pathRoundedRect(ctx, o.sizeDot, o.sizeDot, o.sizeDotBorderRadius);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
        }
};

;// CONCATENATED MODULE: ../draw/drawSnake.ts


const drawSnake_drawSnake = (ctx, snake, o) => {
    const cells = snakeToCells(snake);
    for (let i = 0; i < cells.length; i++) {
        const u = (i + 1) * 0.6;
        ctx.save();
        ctx.fillStyle = o.colorSnake;
        ctx.translate(cells[i].x * o.sizeCell + u, cells[i].y * o.sizeCell + u);
        ctx.beginPath();
        pathRoundedRect(ctx, o.sizeCell - u * 2, o.sizeCell - u * 2, (o.sizeCell - u * 2) * 0.25);
        ctx.fill();
        ctx.restore();
    }
};
const lerp = (k, a, b) => (1 - k) * a + k * b;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const drawSnakeLerp = (ctx, snake0, snake1, k, o) => {
    const m = 0.8;
    const n = snake0.length / 2;
    for (let i = 0; i < n; i++) {
        const u = (i + 1) * 0.6 * (o.sizeCell / 16);
        const a = (1 - m) * (i / Math.max(n - 1, 1));
        const ki = clamp((k - a) / m, 0, 1);
        const x = lerp(ki, snake0[i * 2 + 0], snake1[i * 2 + 0]) - 2;
        const y = lerp(ki, snake0[i * 2 + 1], snake1[i * 2 + 1]) - 2;
        ctx.save();
        ctx.fillStyle = o.colorSnake;
        ctx.translate(x * o.sizeCell + u, y * o.sizeCell + u);
        ctx.beginPath();
        pathRoundedRect_pathRoundedRect(ctx, o.sizeCell - u * 2, o.sizeCell - u * 2, (o.sizeCell - u * 2) * 0.25);
        ctx.fill();
        ctx.restore();
    }
};

;// CONCATENATED MODULE: ../draw/drawWorld.ts


const drawStack = (ctx, stack, max, width, o) => {
    ctx.save();
    const m = width / max;
    for (let i = 0; i < stack.length; i++) {
        // @ts-ignore
        ctx.fillStyle = o.colorDots[stack[i]];
        ctx.fillRect(i * m, 0, m + width * 0.005, 10);
    }
    ctx.restore();
};
const drawWorld = (ctx, grid, cells, snake, stack, o) => {
    ctx.save();
    ctx.translate(1 * o.sizeCell, 2 * o.sizeCell);
    drawGrid(ctx, grid, cells, o);
    drawSnake(ctx, snake, o);
    ctx.restore();
    ctx.save();
    ctx.translate(o.sizeCell, (grid.height + 4) * o.sizeCell);
    const max = grid.data.reduce((sum, x) => sum + +!!x, stack.length);
    drawStack(ctx, stack, max, grid.width * o.sizeCell, o);
    ctx.restore();
    // ctx.save();
    // ctx.translate(o.sizeCell + 100, (grid.height + 4) * o.sizeCell + 100);
    // ctx.scale(0.6, 0.6);
    // drawCircleStack(ctx, stack, o);
    // ctx.restore();
};
const drawLerpWorld = (ctx, grid, cells, snake0, snake1, stack, k, o) => {
    ctx.save();
    ctx.translate(1 * o.sizeCell, 2 * o.sizeCell);
    drawGrid_drawGrid(ctx, grid, cells, o);
    drawSnakeLerp(ctx, snake0, snake1, k, o);
    ctx.translate(0, (grid.height + 2) * o.sizeCell);
    const max = grid.data.reduce((sum, x) => sum + +!!x, stack.length);
    drawStack(ctx, stack, max, grid.width * o.sizeCell, o);
    ctx.restore();
};
const getCanvasWorldSize = (grid, o) => {
    const width = o.sizeCell * (grid.width + 2);
    const height = o.sizeCell * (grid.height + 4) + 30;
    return { width, height };
};

// EXTERNAL MODULE: ../types/snake.ts
var types_snake = __webpack_require__(9347);
;// CONCATENATED MODULE: ../solver/step.ts


const step = (grid, stack, snake) => {
    const x = (0,types_snake/* getHeadX */.If)(snake);
    const y = (0,types_snake/* getHeadY */.IP)(snake);
    const color = (0,types_grid/* getColor */.Lq)(grid, x, y);
    if ((0,types_grid/* isInside */.V0)(grid, x, y) && !(0,types_grid/* isEmpty */.xb)(color)) {
        stack.push(color);
        (0,types_grid/* setColorEmpty */.Dy)(grid, x, y);
    }
};

// EXTERNAL MODULE: ../../node_modules/tmp/lib/tmp.js
var tmp = __webpack_require__(6382);
// EXTERNAL MODULE: external "gifsicle"
var external_gifsicle_ = __webpack_require__(542);
var external_gifsicle_default = /*#__PURE__*/__webpack_require__.n(external_gifsicle_);
// EXTERNAL MODULE: ../../node_modules/gif-encoder-2/index.js
var gif_encoder_2 = __webpack_require__(3561);
var gif_encoder_2_default = /*#__PURE__*/__webpack_require__.n(gif_encoder_2);
;// CONCATENATED MODULE: ../gif-creator/index.ts









// @ts-ignore

const withTmpDir = async (handler) => {
    const { name: dir, removeCallback: cleanUp } = tmp.dirSync({
        unsafeCleanup: true,
    });
    try {
        return await handler(dir);
    }
    finally {
        cleanUp();
    }
};
const createGif = async (grid0, cells, chain, drawOptions, animationOptions) => withTmpDir(async (dir) => {
    const { width, height } = getCanvasWorldSize(grid0, drawOptions);
    const canvas = (0,external_canvas_.createCanvas)(width, height);
    const ctx = canvas.getContext("2d");
    const grid = (0,types_grid/* copyGrid */.VJ)(grid0);
    const stack = [];
    const encoder = new (gif_encoder_2_default())(width, height, "neuquant", true);
    encoder.setRepeat(0);
    encoder.setDelay(animationOptions.frameDuration);
    encoder.start();
    for (let i = 0; i < chain.length; i += 1) {
        const snake0 = chain[i];
        const snake1 = chain[Math.min(chain.length - 1, i + 1)];
        step(grid, stack, snake0);
        for (let k = 0; k < animationOptions.step; k++) {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, width, height);
            drawLerpWorld(ctx, grid, cells, snake0, snake1, stack, k / animationOptions.step, drawOptions);
            encoder.addFrame(ctx);
        }
    }
    const outFileName = external_path_default().join(dir, "out.gif");
    const optimizedFileName = external_path_default().join(dir, "out.optimized.gif");
    encoder.finish();
    external_fs_default().writeFileSync(outFileName, encoder.out.getData());
    (0,external_child_process_.execFileSync)((external_gifsicle_default()), [
        //
        "--optimize=3",
        "--color-method=diversity",
        "--colors=18",
        outFileName,
        ["--output", optimizedFileName],
    ].flat());
    return external_fs_default().readFileSync(optimizedFileName);
});


/***/ })

};
;