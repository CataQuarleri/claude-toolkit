#!/usr/bin/env node
'use strict';

// Installs the skills and commands in this package into a Claude Code folder.
// No dependencies, so it runs anywhere Node 18+ is available.

const fs = require('fs');
const os = require('os');
const path = require('path');

const pkgRoot = path.join(__dirname, '..');
const skillsSrc = path.join(pkgRoot, 'skills');
const commandsSrc = path.join(pkgRoot, 'commands');
const { version } = require(path.join(pkgRoot, 'package.json'));

const HELP = `
claude-toolkit ${version}

Usage:
  claude-toolkit list                      Show what's in the toolkit
  claude-toolkit install <name...>         Install skills by name, or "commands"
  claude-toolkit install --all             Install every skill and the commands

Options:
  --project   Install into ./.claude in the current folder (shared with the team)
              instead of your personal ~/.claude folder
  --force     Replace items that are already installed
  --help      Show this help

Examples:
  npx <package> install a11y-release-audit
  npx <package> install a11y-release-audit --project
  npx <package> install --all
`;

function listDir(dir, filter) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).filter(filter).map((d) => d.name).sort();
}

const skills = () => listDir(skillsSrc, (d) => d.isDirectory());
const commands = () => listDir(commandsSrc, (d) => d.isFile() && d.name.endsWith('.md'));

function description(skill) {
  const file = path.join(skillsSrc, skill, 'SKILL.md');
  const match = fs.readFileSync(file, 'utf8').match(/^description:\s*(.+)$/m);
  return match ? match[1].trim() : '';
}

function list() {
  console.log('\nSkills:');
  for (const s of skills()) console.log(`  ${s}\n    ${description(s)}`);
  console.log('\nCommands (install with "commands"):');
  console.log('  ' + commands().map((c) => '/' + c.replace(/\.md$/, '')).join('  '));
  console.log('');
}

function install(names, { project, force, all }) {
  const base = project ? path.join(process.cwd(), '.claude') : path.join(os.homedir(), '.claude');
  const available = skills();
  const wanted = all ? [...available, 'commands'] : names;

  if (wanted.length === 0) {
    console.error('Name at least one skill (or "commands"), or use --all. Run "list" to see options.');
    process.exit(1);
  }

  const unknown = wanted.filter((n) => n !== 'commands' && !available.includes(n));
  if (unknown.length) {
    console.error(`Not found: ${unknown.join(', ')}. Available: ${available.join(', ')}, commands`);
    process.exit(1);
  }

  let skipped = 0;

  for (const name of wanted) {
    if (name === 'commands') {
      const dest = path.join(base, 'commands');
      fs.mkdirSync(dest, { recursive: true });
      for (const file of commands()) {
        const target = path.join(dest, file);
        if (fs.existsSync(target) && !force) {
          console.log(`  skipped  /${file.replace(/\.md$/, '')} (already installed)`);
          skipped++;
          continue;
        }
        fs.copyFileSync(path.join(commandsSrc, file), target);
        console.log(`  added    /${file.replace(/\.md$/, '')}`);
      }
      if (!project) {
        // The learning-log commands save their notes here.
        const log = path.join(os.homedir(), 'learning-log');
        for (const sub of ['sessions', 'decisions', 'til', 'talks']) {
          fs.mkdirSync(path.join(log, sub), { recursive: true });
        }
        console.log(`  ready    ${log}`);
      }
      continue;
    }

    const dest = path.join(base, 'skills', name);
    if (fs.existsSync(dest)) {
      if (!force) {
        console.log(`  skipped  ${name} (already installed; use --force to replace)`);
        skipped++;
        continue;
      }
      fs.rmSync(dest, { recursive: true, force: true });
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.cpSync(path.join(skillsSrc, name), dest, { recursive: true });
    console.log(`  added    ${name}`);
  }

  console.log(`\nInstalled to ${base}`);
  if (skipped) console.log('Some items were skipped because they already exist. Add --force to replace them.');
  console.log('Restart Claude Code to pick up the changes.\n');
}

function main() {
  const args = process.argv.slice(2);
  const flags = new Set(args.filter((a) => a.startsWith('--')));
  const positional = args.filter((a) => !a.startsWith('--'));
  const [cmd, ...names] = positional;

  if (!cmd || flags.has('--help') || cmd === 'help') return console.log(HELP);
  if (cmd === 'list') return list();
  if (cmd === 'install') {
    return install(names, {
      project: flags.has('--project'),
      force: flags.has('--force'),
      all: flags.has('--all'),
    });
  }

  console.error(`Unknown command "${cmd}".`);
  console.log(HELP);
  process.exit(1);
}

main();
