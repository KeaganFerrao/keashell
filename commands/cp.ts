import { createReadStream, createWriteStream, existsSync, statSync } from "fs";
import { parse } from "path";

const copyFile = (src: string, dest: string) => {
    try {
        if (!src || !dest) {
            console.error('Source/Destination not provided');
            return;
        }

        if (!existsSync(src)) {
            console.error(`${src} does not exist`);
            return;
        }

        const srcStats = statSync(src);
        if (!srcStats.isFile()) {
            console.error(`${src} is not a file`);
            return;
        }

        if (existsSync(dest)) {
            const destStats = statSync(dest);
            if (destStats.isDirectory()) {
                const srcStream = createReadStream(src);
                const destStream = createWriteStream(`${dest}/${src}`);

                srcStream.pipe(destStream);
                return;
            } else {
                console.error(`${dest} invalid or already exists`);
                return;
            }
        }

        const parsed = parse(dest);
        if (parsed.dir) {
            if (!existsSync(parsed.dir)) {
                console.error(`${parsed.dir} does not exist`);
                return;
            }

            const parsedStats = statSync(parsed.dir);
            if (!parsedStats.isDirectory()) {
                console.error(`${parsed.dir} is not a directory`);
                return;
            }
        }

        const srcStream = createReadStream(src);
        const destStream = createWriteStream(dest);

        srcStream.pipe(destStream);
    } catch (error: any) {
        console.error(error?.message);
    }
}

export default copyFile;