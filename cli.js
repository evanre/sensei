#!/usr/bin/env node

const globby = require("globby");
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

async function getFromMaster() {
  const execP = promisify(exec);
  const { stdout } = await execP("git diff --name-status master..HEAD");
  return stdout
    .split("\n")
    .filter(Boolean)
    .map(t => t.split("\t")[1]);
}

async function run() {
  const [, , isCi] = process.argv;
  const protectedConfig = path.resolve(process.cwd(), "./.jsninja/protected");
  if (!fs.existsSync(protectedConfig)) {
    console.log("No config found, exiting");
    process.exit(0);
  }
  const patterns = fs.readFileSync(protectedConfig, "utf-8").split("\n");
  const protectedFiles = await globby(patterns);

  const changedFiles = isCi
    ? await getFromMaster()
    : (await promisify(sgf)()).map(f => f.filename);

  const badFiles = changedFiles.filter(f => protectedFiles.includes(f));
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
