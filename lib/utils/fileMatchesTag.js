"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTagsForFile_1 = require("./getTagsForFile");
// Returns true if the given file matches any of the given tags
function fileMatchesTag(filePath, tags) {
    // '*' matches all files
    if (tags == '*') {
        return true;
    }
    // Normalize the tags to an array
    if (!Array.isArray(tags)) {
        tags = [tags];
    }
    // See if any of the file's tags are in the tags list
    let fileTags = getTagsForFile_1.default(filePath);
    for (let i = 0; i < fileTags.length; i++) {
        if (tags.indexOf(fileTags[i]) != -1) {
            return true;
        }
    }
    return false;
}
exports.default = fileMatchesTag;
