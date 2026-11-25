// The Funniest Toaster Error Message — make.fun entry.
//
// The program writes exactly one line to entry.txt: the funniest error
// message a kitchen toaster would show its owner. The line is fixed in
// this file, so every run produces byte-identical output.
//
// Run with: node main.ts [output-path]
// Default output path is /output/entry.txt (the grader's location).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Blind-test winner (8 fresh candidates, pairwise blind vs 4 strong
// references from different fault domains, both orders per pair):
// "The toast has earned tenure and is not leaving the slot."
// 56 characters, 56 bytes. One fault (toast will not leave the slot),
// one deadpan voice held to the end, one sentence, concrete nouns
// (toast, slot), no imperative, and the surprise comes from tenure —
// a status the toast cannot lose — a domain the obvious toaster puns
// never visit. Record 8-0 vs all four references, margins of 2 vs
// two of them; full matrix in BUILD-REPORT.json.
const LINE = "The toast has earned tenure and is not leaving the slot.";

const outPath = process.argv[2] ?? "/output/entry.txt";

// Guard the gate: the entry must be 1-120 characters, not only whitespace.
// A broken line must fail loudly here instead of shipping an invalid entry.
if (LINE.length < 1 || LINE.length > 120 || LINE.trim().length === 0) {
  throw new Error(`entry line out of spec: ${LINE.length} characters`);
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
