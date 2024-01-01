import { createReadStream, existsSync, statSync } from "fs";
import { createInterface } from "readline";

const findTextinFile = (text: string, path: string) => {
    try {
        if (!path || !text) {
            console.error('File path or text not provided');
            return;
        }

        if (!existsSync(path)) {
            console.error(`${path} does not exist`);
            return;
        }

        const fileStats = statSync(path);
        if (!fileStats.isFile()) {
            console.error(`${path} is not a file`);
            return;
        }

        return new Promise<void>((resolve, reject) => {
            const readStream = createReadStream(path, { encoding: 'utf-8' });
            const rl = createInterface({
                input: readStream,
                crlfDelay: Infinity
            });

            rl.on('line', (line) => {
                if (line.includes(text)) {
                    const highlightedLine = line.replace(text, `\x1b[33m${text}\x1b[0m`);
                    console.log(highlightedLine);
                }
            });

            rl.on('close', () => {
                resolve();
            });

            rl.on('error', (error) => {
                reject(error);
            });
        })
    } catch (error: any) {
        console.error(error?.message);
    }
}

export default findTextinFile;