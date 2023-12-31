import { writeFileSync } from "fs";

const createFile = (name: string) => {
    try {
        if (!name) {
            console.error('File name not provided');
            return;
        }
        writeFileSync(name, '');
    } catch (error) {
        console.error(error);
    }
}

export default createFile;