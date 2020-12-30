import { spawn } from 'cross-spawn';

export function execute(cmd, args, { showCommand = false } = {}) {
  return new Promise((resolve, reject) => {
    const spawnOptions = {
      cwd: process.cwd(),
      stdio: 'pipe',
    };

    if (showCommand) {
      // eslint-disable-next-line no-console
      console.log(`$ ${cmd} ${args.join(' ')}`);
    }

    const child = spawn(cmd, args, spawnOptions);
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', data => {
      stdout += data;
    });

    child.stderr.on('data', data => {
      stderr += data;
    });

    child.on('close', code => {
      if (code !== 0) {
        // Remove last '\n'
        reject(stderr.slice(0, stdout.length - 1));

        return;
      }

      // Remove last '\n'
      resolve(stdout.slice(0, stdout.length - 1));
    });
  });
}

export default execute;
