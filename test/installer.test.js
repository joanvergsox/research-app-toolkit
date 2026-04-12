import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  CLAUDE_MARKETPLACE_NAME,
  CODEX_MARKETPLACE_NAME,
  ensureCodexPluginEnabled,
  installClaudeHost,
  installCodexHost,
  parseArgs,
  upsertClaudeMarketplace,
  upsertCodexMarketplace,
} from "../lib/installer.js";

const testFilePath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(testFilePath), "..");

test("parseArgs supports install target flags", () => {
  const result = parseArgs(["install", "--codex"]);
  assert.equal(result.command, "install");
  assert.equal(result.options.codex, true);
  assert.equal(result.options.claude, false);
});

test("parseArgs rejects unsupported flags", () => {
  assert.throws(() => parseArgs(["install", "--unknown"]), /Unsupported flag/);
});

test("upsertClaudeMarketplace creates a valid local marketplace entry", () => {
  const output = upsertClaudeMarketplace(null, "0.2.0");
  const marketplace = JSON.parse(output);

  assert.equal(marketplace.name, CLAUDE_MARKETPLACE_NAME);
  assert.equal(marketplace.plugins.length, 1);
  assert.equal(marketplace.plugins[0].name, "research-app-toolkit");
  assert.equal(marketplace.plugins[0].version, "0.2.0");
});

test("upsertCodexMarketplace preserves unrelated plugins", () => {
  const initial = JSON.stringify({
    name: CODEX_MARKETPLACE_NAME,
    interface: { displayName: "Test" },
    plugins: [{ name: "existing-plugin" }],
  });
  const output = upsertCodexMarketplace(initial);
  const marketplace = JSON.parse(output);

  assert.equal(marketplace.plugins.length, 2);
  assert.equal(
    marketplace.plugins.some((plugin) => plugin.name === "existing-plugin"),
    true,
  );
  assert.equal(
    marketplace.plugins.some((plugin) => plugin.name === "research-app-toolkit"),
    true,
  );
});

test("ensureCodexPluginEnabled appends a missing plugin section", () => {
  const output = ensureCodexPluginEnabled('model = "gpt-5.4"\n');
  assert.match(output, /\[plugins\."research-app-toolkit@xujingchen1996-local"\]/);
  assert.match(output, /enabled = true/);
});

test("ensureCodexPluginEnabled updates an existing disabled section", () => {
  const initial = `
[plugins."research-app-toolkit@xujingchen1996-local"]
enabled = false
`;
  const output = ensureCodexPluginEnabled(initial);
  assert.doesNotMatch(output, /enabled = false/);
  assert.match(output, /enabled = true/);
});

test("installers create Claude and Codex host files inside a temporary home", async () => {
  const tempHome = await mkdtemp(path.join(tmpdir(), "ratk-test-"));

  try {
    await installClaudeHost({
      sourceDir: repoRoot,
      version: "0.2.0",
      homeDir: tempHome,
    });
    await installCodexHost({
      sourceDir: repoRoot,
      version: "0.2.0",
      homeDir: tempHome,
    });

    const claudePluginDir = path.join(
      tempHome,
      ".claude",
      "plugins",
      "local",
      "research-app-toolkit",
    );
    const codexPluginDir = path.join(
      tempHome,
      ".agents",
      "plugins",
      "plugins",
      "research-app-toolkit",
    );
    const claudeMarketplacePath = path.join(
      tempHome,
      ".claude",
      "plugins",
      "local",
      ".claude-plugin",
      "marketplace.json",
    );
    const codexMarketplacePath = path.join(tempHome, ".agents", "plugins", "marketplace.json");
    const codexConfigPath = path.join(tempHome, ".codex", "config.toml");
    const codexCachePath = path.join(
      tempHome,
      ".codex",
      "plugins",
      "cache",
      "xujingchen1996-local",
      "research-app-toolkit",
    );

    assert.equal(existsSync(path.join(claudePluginDir, ".claude-plugin", "plugin.json")), true);
    assert.equal(existsSync(path.join(codexPluginDir, ".codex-plugin", "plugin.json")), true);

    const claudeMarketplace = JSON.parse(await readFile(claudeMarketplacePath, "utf8"));
    const codexMarketplace = JSON.parse(await readFile(codexMarketplacePath, "utf8"));
    const codexConfig = await readFile(codexConfigPath, "utf8");

    assert.equal(
      claudeMarketplace.plugins.some((plugin) => plugin.name === "research-app-toolkit"),
      true,
    );
    assert.equal(
      codexMarketplace.plugins.some((plugin) => plugin.name === "research-app-toolkit"),
      true,
    );
    assert.match(codexConfig, /\[plugins\."research-app-toolkit@xujingchen1996-local"\]/);
    assert.equal(existsSync(codexCachePath), true);
  } finally {
    await rm(tempHome, { recursive: true, force: true });
  }
});
