import { createReadStream, existsSync, statSync } from "fs";

const catFile = (name: string) => {
    try {
        if (!name) {
            console.error('File name not provided');
            return;
        }

        if (!existsSync(name)) {
            console.error(`${name} does not exist`);
            return;
        }

        const fileStats = statSync(name);
        if (!fileStats.isFile()) {
            console.error(`${name} is not a file`);
            return;
        }

        return new Promise<void>((resolve, reject) => {
            const readStream = createReadStream(name, { encoding: 'utf-8' });

            readStream.on('data', data => {
                console.log(data);
            });
            readStream.on('end', () => {
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

export default catFile;