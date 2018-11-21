"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dedupe(...arrays) {
    return Array.from(new Set([].concat(...arrays)));
}
exports.default = dedupe;
