import fs from 'fs-extra';

import { execute } from '../src/utils/execute';

fs.readFile(`${process.cwd()}/.pid`).then(async pid => {
  await execute('kill', [pid], { showCommand: true });
  await execute('sleep', [1], { showCommand: true });
  await execute('yarn', ['workspace', 'mic-gateway', 'run', 'dev'], { showCommand: true });
});
