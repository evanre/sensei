"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
function writeFixtureFiles(basedir) {
    for (let i = 0; i < 5; i++) {
        const extension = i % 2 === 0 ? 'txt' : 'md';
        fs.writeFileSync(`${basedir}/file-${i}.${extension}`, '');
    }
}
function makeFixtures(basedir, depth) {
    let currentLevelDir = basedir;
    fs.mkdirSync(currentLevelDir);
    for (let level = 0; level < depth; level++) {
        currentLevelDir = path.join(currentLevelDir, level.toString());
        fs.mkdirSync(currentLevelDir);
        fs.mkdirSync(currentLevelDir + '-a');
        fs.mkdirSync(currentLevelDir + '-b');
        writeFixtureFiles(currentLevelDir + '-a');
        writeFixtureFiles(currentLevelDir + '-b');
    }
}
exports.makeFixtures = makeFixtures;
