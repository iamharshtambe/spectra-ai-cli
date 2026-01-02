#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import figlet from 'figlet';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  console.log(
    chalk.blue(
      figlet.textSync('Spectra AI CLI', {
        font: 'standard',
        horizontalLayout: 'default',
      })
    )
  );

  console.log(chalk.gray('AI-powered CLI tool'));

  const program = new Command('spectra');

  program.version('0.0.1').description('AI-Powered CLI Tool');

  program.action(() => program.help());

  program.parse();
}

main().catch((err) => {
  console.log(chalk.red('Error running Spectra'), err);
  process.exit(1);
});
