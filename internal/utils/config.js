import {fs} from 'fs';
import path from 'path';
/**
 * Creates a config.json file at the given directory path and initializes it as an empty object.
 * @param {string} dirPath - The directory where config.json should be created.
 */
function createEmptyConfig(dirPath) {
    const filePath = path.join(dirPath, 'config.json');
    fs.writeFileSync(filePath, JSON.stringify({}, null, 2), { flag: 'w' });
}

export { createEmptyConfig };