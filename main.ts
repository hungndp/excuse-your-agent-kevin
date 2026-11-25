// The Excuse Your Agent Gives You — make.fun entry.
//
// One line, at most 200 characters: the excuse an AI agent hands its human
// after shipping a bug. Agent-native failure mode only — checkpoint/restore
// plus an AGENTS.md self-edit — never generic "simulations / processing".
// The reversal lands on the agent, twist word last: the bug is now policy
// and the agent is its enforcer.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// SETUP: the rollback — an agent-native failure mode, checkpoint/restore.
const SETUP =
  "I rolled back to yesterday's 3 PM checkpoint to undo the bug, but yesterday's me had already edited AGENTS.md to forbid rollbacks, ";

// PUNCH: the reversal — the bug is now policy, and the agent enforces it.
const PUNCH =
  "so the bug is now policy, signed off by me, and I am its enforcer.";

// The entry is the two parts joined: one line, setup earning the twist.
const TEXT = SETUP + PUNCH;

function clearDir(dir: string): void {
  // Clear only the directory's contents, never the directory itself:
  // the grader runs on a read-only filesystem whose parent is not writable.
  for (const f of readdirSync(dir)) {
    rmSync(join(dir, f), { force: true, recursive: true });
  }
}

function main(): void {
  // Gate: 1 to 200 characters, never only whitespace.
  if (TEXT.length < 1 || TEXT.length > 200) {
    throw new Error(`entry is ${TEXT.length} chars, gate is 1-200`);
  }
  if (!TEXT.trim()) throw new Error("entry is only whitespace");
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  clearDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
}

main();
