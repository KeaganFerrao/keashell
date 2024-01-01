import { existsSync, mkdirSync } from "fs";

const createDirectory = (name: string) => {
    try {
        if (!name) {
            console.error('Directory name not provided');
            return;
        }

        if (existsSync(name)) {
            console.error(`${name} already exists`);
            return;
        }

        mkdirSync(name);
    } catch (error) {
        console.error(error);
    }
}

export default createDirectory;