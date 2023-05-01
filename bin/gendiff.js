#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .version('0.1.0')
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.');

program
  .option('-f, --format <type>', 'output format' )

program.parse();