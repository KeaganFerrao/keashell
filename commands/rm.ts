import { existsSync, rmSync } from "fs";

const deleteFileOrDirectory = (name: string) => {
    try {
        if (!name) {
            console.error('File name not provided');
            return;
        }

        if (!existsSync(name)) {
            console.error(`${name} does not exist`);
            return;
        }

        rmSync(name, { recursive: true, force: true });
    } catch (error: any) {
        console.error(error?.message);
    }
}

export default deleteFileOrDirectory;