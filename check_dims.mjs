import fs from 'fs';
import path from 'path';

const imagePath = path.join(process.cwd(), 'public', 'hero.png');

// A very basic PNG header parser to get width/height
function getPngDimensions(filePath) {
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(24);
    fs.readSync(fd, buffer, 0, 24, 0);
    fs.closeSync(fd);

    // Check PNG signature
    if (buffer.toString('hex', 0, 8) !== '89504e470d0a1a0a') {
        throw new Error('Not a valid PNG file');
    }

    // Read IHDR chunk
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);

    return { width, height };
}

try {
    const dims = getPngDimensions(imagePath);
    console.log(`Dimensions: ${dims.width} x ${dims.height}`);
    console.log(`Aspect Ratio: ${dims.width / dims.height}`);
} catch (e) {
    console.error(e);
}
