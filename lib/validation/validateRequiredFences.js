"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reportError_1 = require("../core/reportError");
const glob = require("glob");
const path = require("path");
const getAllConfigs_1 = require("../utils/getAllConfigs");
const dedupe_1 = require("../utils/dedupe");
function validateRequiredFences() {
    const configPathMap = getAllConfigs_1.default();
    const requiredFenceGlobs = getRequiredFenceGlobs(configPathMap);
    // get a deduped list of required paths
    const requiredPaths = dedupe_1.default(requiredFenceGlobs.map(f => glob.sync(f)));
    // get the required paths that aren't in our map of all configs
    const missingRequiredPaths = requiredPaths.filter(p => !configPathMap[p]);
    if (missingRequiredPaths.length > 0) {
        missingRequiredPaths.forEach(p => reportError_1.default(`Missing fence.json at ${p}`));
    }
    return missingRequiredPaths.length === 0;
}
exports.default = validateRequiredFences;
/**
 * @summary Create a set of globs that define directories that must have fences
 * @param configSet The set of configs to build our globs from
 */
function getRequiredFenceGlobs(configSet) {
    const configPathPairs = Object.keys(configSet).map(key => ({
        path: key,
        config: configSet[key],
    }));
    const configPathPairsWithFences = configPathPairs.filter(pair => pair.config.requiredFences);
    const requiredFenceGlobs = configPathPairsWithFences
        .map(absolutifyGlobs)
        .map(directorizeGlobs)
        .reduce((acc, e) => acc.concat(e), []);
    return requiredFenceGlobs;
}
/**
 * @summary Create globs with absolute paths
 * @param pair A pair of base path and config
 */
function absolutifyGlobs(pair) {
    const pathParts = pair.path.split(/[\///]/);
    const requiredFences = pair.config.requiredFences;
    const absoluteGlobs = requiredFences.map(rf => pathParts.concat(rf.split(/[\///]/)).join(path.sep));
    return absoluteGlobs;
}
/**
 * @summary ensure we only match directories by appending a path separator (e.g.  '/')
 * @param globs The globs to directorize
 */
function directorizeGlobs(globs) {
    const dirPaths = globs.map(g => g.replace(/[\///]*$/, path.sep));
    return dirPaths;
}
