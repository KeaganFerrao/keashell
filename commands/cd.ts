const changeDir = (path: string) => {
    try {
        if (!path) {
            console.error('Directory path not specified');
            return;
        }
        process.chdir(path);
    } catch (error) {
        console.error(`${path} is not a valid directory`);
    }
}

export default changeDir;