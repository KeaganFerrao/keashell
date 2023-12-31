import { createReadStream, createWriteStream, existsSync, mkdirSync, readdirSync, statSync } from "fs";

const copyDirectory = (src: string, dest: string) => {
    try {
        if (!src || !dest) {
            console.error('Source/Destination not provided');
            return;
        }

        if (!existsSync(src)) {
            console.error(`${src} does not exist`);
            return;
        }

        const srcStat = statSync(src);
        if (!srcStat.isDirectory()) {
            console.error(`${src} is not a directory`);
            return;
        }

        if (!existsSync(dest)) {
            console.error(`${dest} does not exist`);
            return;
        }

        const destStat = statSync(dest);
        if (!destStat.isDirectory()) {
            console.error('Destination is not a directory');
            return;
        }

        const destDir = `${dest}/${src}`;
        if (existsSync(destDir)) {
            console.error(`${destDir} already exists`);
            return;
        }

        mkdirSync(destDir);

        const files = readdirSync(src);
        for (const file of files) {
            copyFilesFromDir(`${src}/${file}`, `${destDir}/${file}`);
        }

    } catch (error: any) {
        console.error(error?.message);
    }
}

const copyFilesFromDir = (src: string, dest: string) => {
    const srcStats = statSync(src);

    if (srcStats.isDirectory()) {
        if (!existsSync(dest)) {
            mkdirSync(dest);
        }

        const files = readdirSync(src);
        for (const file of files) {
            copyFilesFromDir(`${src}/${file}`, `${dest}/${file}`);
        }
        return;
    }

    const srcStream = createReadStream(src);
    const destStream = createWriteStream(dest);

    srcStream.pipe(destStream);
}

export default copyDirectory;