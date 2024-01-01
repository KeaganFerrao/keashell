import { existsSync, renameSync } from "fs";
import { parse } from "path";

const moveOrRenameFile = async (oldPath: string, newPath: string) => {
    try {
        if (!oldPath || !newPath) {
            console.error('File names not provided');
            return;
        }

        if (!existsSync(oldPath)) {
            console.error(`${oldPath} does not exist`);
            return;
        }

        const parsed = parse(newPath);
        if (!parsed.dir) {
            renameSync(oldPath, newPath);
            return;
        }

        const destDir = parsed.dir;
        if (!existsSync(destDir)) {
            console.error(`${destDir} does not exist`);
            return;
        }

        renameSync(oldPath, newPath);
    } catch (error: any) {
        console.error(error?.message);
    }
}

export default moveOrRenameFile;