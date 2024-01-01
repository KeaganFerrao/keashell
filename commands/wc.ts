import { createReadStream, existsSync } from "fs";

const countCharsInFile = (path: string) => {
    try {
        if (!path) {
            console.error('File path not provided');
            return;
        }

        if (!existsSync(path)) {
            console.error(`${path} does not exist`);
            return;
        }

        return new Promise<void>((resolve, reject) => {
            const readStream = createReadStream(path, { encoding: 'utf-8' });
            const count = {
                lines: 0,
                words: 0,
                chars: 0
            };
            readStream.on('data', (data: string) => {
                const lines = data.split('\n');
                const words = data.split(/\s+/);
                const charLength = words.reduce((acc, word) => acc + word.length, 0);
                count.lines += lines.length;
                count.words += words.length;
                count.chars += charLength;
            });
            readStream.on('end', () => {
                console.table(count);
                resolve();
            });
            readStream.on('error', error => {
                reject(error);
            });
        })
    } catch (error: any) {
        console.error(error?.message);
    }
}

export default countCharsInFile;