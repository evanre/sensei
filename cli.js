#!/usr/bin/env node

const globby = require("globby");
const path = require("path");
const fs = require("fs");
const sgf = require("staged-git-files");

const fgRed = "\x1b[31m";
const reset = "\x1b[0m";

function log(message) {
  console.log(`${fgRed}${message}${reset}`);
}

const protectedConfig = path.resolve(process.cwd(), "./.jsninja/protected");
if (!fs.existsSync(protectedConfig)) {
  process.exit(0);
}
const patterns = fs.readFileSync(protectedConfig, "utf-8").split("\n");
sgf(async function r(err, results) {
  const protectedFiles = await globby(patterns);
  const changedFiles = results.map(f => f.filename);
  const badFiles = changedFiles.filter(f => protectedFiles.includes(f));
  if (badFiles.length) {
    log("These files are protected. You can't commit them:");
    badFiles.forEach(f => {
      log(`  - ${f}`);
    });
    process.exit(1);
  }
  process.exit(0);
});
