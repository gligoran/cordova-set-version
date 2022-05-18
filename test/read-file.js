import fs from 'fs-extra';

export default function readFile(filePath) {
  return fs.readFileSync(filePath, { encoding: 'utf8' });
}
