#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import {
  detectHosts,
  installClaudeHost,
  installCodexHost,
  parseArgs,
} from "../lib/installer.js";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function printHelp() {
  console.log(`Research Application Toolkit installer

Usage:
  ratk install
  ratk install --claude
  ratk install --codex
  ratk install --all

Behavior:
  - Without flags, install to detected hosts on this machine.
  - --claude installs only for Claude Code.
  - --codex installs only for Codex.
  - --all installs to every detected host and skips hosts that are not installed.
`);
}

async function readPackageVersion() {
  const packageJson = await readFile(path.join(packageRoot, "package.json"), "utf8");
  return JSON.parse(packageJson).version;
}

function resolveTargets(options, detected) {
  if (options.all) {
    return ["claude", "codex"];
  }

  const explicit = [];
  if (options.claude) {
    explicit.push("claude");
  }
  if (options.codex) {
    explicit.push("codex");
  }

  if (explicit.length > 0) {
    return explicit;
  }

  return Object.entries(detected)
    .filter(([, present]) => present)
    .map(([host]) => host);
}

async function main() {
  const { command, options } = parseArgs(process.argv.slice(2));

  if (options.help || command === "help") {
    printHelp();
    return;
  }

  if (command !== "install") {
    throw new Error(`Unsupported command: ${command}`);
  }

  const detected = detectHosts();
  const targets = resolveTargets(options, detected);
  const explicitSingleTarget = (options.claude || options.codex) && !options.all;

  if (targets.length === 0) {
    throw new Error("No supported host was detected. Install Claude Code or Codex first, or rerun with an explicit host after the client is installed.");
  }

  const version = await readPackageVersion();
  const results = [];
  const skipped = [];

  for (const target of targets) {
    if (!detected[target]) {
      if (explicitSingleTarget) {
        throw new Error(`Requested host is not installed: ${target}`);
      }
      skipped.push(target);
      continue;
    }

    if (target === "claude") {
      results.push(await installClaudeHost({ sourceDir: packageRoot, version }));
      continue;
    }

    if (target === "codex") {
      results.push(await installCodexHost({ sourceDir: packageRoot, version }));
    }
  }

  if (results.length === 0) {
    throw new Error("No installation was completed. The requested hosts were not detected on this machine.");
  }

  console.log("Installed Research Application Toolkit:");
  for (const result of results) {
    console.log(`- ${result.host}: ${result.pluginDir}`);
  }

  if (skipped.length > 0) {
    console.log(`Skipped hosts not detected on this machine: ${skipped.join(", ")}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
