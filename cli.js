#!/usr/bin/env node
const micromatch = require("micromatch");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const { promisify } = require("util");
const sgf = require("staged-git-files");

const fgRed = "\x1b[31m";
const reset = "\x1b[0m";

function log(message) {
  console.log(`${fgRed}${message}${reset}`);
}

async function getFrom(hash) {
  const execP = promisify(exec);
  const { stdout } = await execP(`git diff --name-status ${hash}..HEAD`);
  return stdout
    .split("\n")
    .filter(Boolean)
    .map(t => t.split("\t")[1]);
}

function invertPattern(p) {
  return p.startsWith("!") ? p.substring(1) : `!${p}`;
}

async function run() {
  const [, , hash] = process.argv;
  const protectedConfig = path.resolve(process.cwd(), "./.jsninja/protected");
  const allowedConfig = path.resolve(process.cwd(), "./.jsninja/allowed");

  if (!fs.existsSync(protectedConfig) && !fs.existsSync(allowedConfig)) {
    console.log("No config found, exiting");
    process.exit(0);
  }

  let patterns = [];
  if (fs.existsSync(allowedConfig)) {
    patterns.push(
      ...fs
        .readFileSync(allowedConfig, "utf-8")
        .split("\n")
        .map(invertPattern)
    );
  }

  if (fs.existsSync(protectedConfig)) {
    patterns.push(...fs.readFileSync(protectedConfig, "utf-8").split("\n"));
  }

  const changedFiles = hash
    ? await getFrom(hash)
    : (await promisify(sgf)()).map(f => f.filename);

  const badFiles = micromatch(changedFiles, patterns, {
    dot: true
  });

  if (badFiles.length) {
    log("These files are protected. You can't change them:");
    badFiles.forEach(f => {
      log(`  - ${f}`);
    });
    process.exit(1);
  }
  process.exit(0);
}

run();
