import { OfflineCompiler } from 'mind-ar/src/image-target/offline-compiler.js';

import { writeFile } from 'fs/promises'
import { loadImage } from 'canvas';
import path from "path"

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//canvas.loadImage treats path as relative from where nodejs was executed, not relative to the script's location
const imagePaths = [path.join(__dirname, 'card.png')];

async function run() {
    //load all images
    const images = await Promise.all(imagePaths.map(value => loadImage(value)));
    const compiler = new OfflineCompiler();
    await compiler.compileImageTargets(images, console.log);
    const buffer = compiler.exportData();
    await writeFile('targets.mind', buffer);
}




run();