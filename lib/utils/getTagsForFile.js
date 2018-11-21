"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getConfigsForFile_1 = require("./getConfigsForFile");
function getTagsForFile(filePath) {
    let configs = getConfigsForFile_1.default(filePath);
    let tags = {};
    configs.forEach(config => {
        if (config.tags) {
            config.tags.forEach(tag => {
                tags[tag] = true;
            });
        }
    });
    return Object.keys(tags).sort();
}
exports.default = getTagsForFile;
