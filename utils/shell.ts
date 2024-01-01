import { createInterface } from "readline";
import { displaySupportedCommands, parseInputFlags } from ".";
import listContentsOfDir from "../commands/ls";
import changeDir from "../commands/cd";
import createFile from "../commands/touch";
import createDirectory from "../commands/mkdir";
import copyFile from "../commands/cp";
import copyDirectory from "../commands/cpdir";
import deleteFileOrDirectory from "../commands/rm";
import catFile from "../commands/cat";
import moveOrRenameFile from "../commands/mv";
import findTextinFile from "../commands/grep";
import countCharsInFile from "../commands/wc";

const history: string[] = [];

const initShell = () => {
    const r = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: `${process.cwd()}>> `,
    });

    r.prompt();

    r.on('line', async (input) => {
        history.push(input);
        const args = input.trim().split(' ');
        const flags = parseInputFlags(args);

        switch (args[0]) {
            case 'exit':
                r.close();
                break;
            case 'ls':
                listContentsOfDir(flags);
                break;
            case 'pwd':
                console.log(process.cwd());
                break;
            case 'clear':
                console.clear();
                break;
            case 'help':
                displaySupportedCommands();
                break;
            case 'history':
                console.log(history.join('\n'));
                break;
            case 'cd':
                changeDir(args[1]);
                r.setPrompt(`${process.cwd()}>> `);
                break;
            case 'touch':
                createFile(args[1]);
                break;
            case 'mkdir':
                createDirectory(args[1]);
                break;
            case 'cp':
                copyFile(args[1], args[2]);
                break;
            case 'cpdir':
                copyDirectory(args[1], args[2]);
                break;
            case 'rm':
                deleteFileOrDirectory(args[1]);
                break;
            case 'cat':
                await catFile(args[1]);
                break;
            case 'mv':
                moveOrRenameFile(args[1], args[2]);
                break;
            case 'grep':
                await findTextinFile(args[1], args[2]);
                break;
            case 'wc':
                await countCharsInFile(args[1]);
                break;
            case '':
                break;
            default:
                console.error(`Command '${args[0]}' not found.`);
                break;
        }

        r.prompt();
    });

    r.on('close', () => {
        console.log('Bye');
        process.exit(0);
    });
}

export default initShell;