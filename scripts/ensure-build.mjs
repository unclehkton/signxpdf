#!/usr/bin/env node
/**
 * Rebuild shared build/ before Vitest build-artefact tests.
 *
 * Build-dependent tests use SVELTEKIT_ADAPTER_OUT for their isolated builds,
 * so rebuilding here cannot race those tests and prevents stale build output
 * from satisfying the artefact assertions.
 */
import { execFileSync } from 'node:child_process';

console.log('ensure-build: rebuilding shared build for current source');
const env = { ...process.env };
// Never inherit a temp out dir from a parent test process
delete env.SVELTEKIT_ADAPTER_OUT;
execFileSync('npm', ['run', 'build'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env,
});
