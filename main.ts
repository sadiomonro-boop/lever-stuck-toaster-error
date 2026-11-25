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

// Blind-test winner (8 candidates, pairwise vs 2 strong references):
// "Lever stuck. I am holding your breakfast hostage. Press me."
// 59 characters, 59 bytes. A stuck lever is a real toaster fault, the
// hostage joke is fresh (no burnt-toast / 404 / bread-not-found trope),
// and the voice stays deadpan to the end.
const LINE = "Lever stuck. I am holding your breakfast hostage. Press me.";

const outPath = process.argv[2] ?? "/output/entry.txt";

// Guard the gate: the entry must be 1-120 characters, not only whitespace.
// A broken line must fail loudly here instead of shipping an invalid entry.
if (LINE.length < 1 || LINE.length > 120 || LINE.trim().length === 0) {
  throw new Error(`entry line out of spec: ${LINE.length} characters`);
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
