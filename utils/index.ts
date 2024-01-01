const parseInputFlags = (input: string[]) => {
    const flags: Record<string, any> = {};
    input.forEach(arg => {
        if (arg.startsWith('-')) {
            const keyValue = arg.split('=');
            flags[keyValue[0].slice(2)] = keyValue[1] ?? true;
        }
    });

    return flags;
}

const formatFileSize = (size: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;
    while (size > 1024) {
        size /= 1024;
        index++;
    }

    return `${size.toFixed(2)} ${units[index] ?? ''}`;
}

const displayWelcomeMessage = () => {
    const phrase = ["Welcome to the CLI of Possibilities!",
        "Unlock the Power of Command Line Awesomeness!", "Command Line Magic Starts Here!",
        "Elevate Your Terminal Experience!", "Where Commands Meet Creativity!", "Your Gateway to Terminal Excellence!",
        "Discover, Execute, Conquer!", "Unleash the Power of Your Keyboard!", "Commanding Your Way to Success!",
        "The CLI Adventure Begins Now!"];

    const welcomeMessageText = `
        ${"\x1b[32m"} _  __           _____ _          _ _ 
        | |/ /          / ____| |        | | |
        | ' / ___  __ _| (___ | |__   ___| | |
        |  < / _ \\/ _\` |\\___ \\| '_ \\ / _ \\ | |
        | . \\  __/ (_| |____) | | | |  __/ | |
        |_|\\_\\___|\\__,_|_____/|_| |_|\\___|_|_|
        
        -----------------------------------------
        ${"\x1b[36m"}${phrase[Math.floor(Math.random() * phrase.length)]}
        ${"\x1b[33m"}Type "help" to see available commands.
        ${"\x1b[0m"}-----------------------------------------
       `;

    console.log(welcomeMessageText);
}

const displaySupportedCommands = () => {
    const commands = [
        {
            name: 'ls',
            description: 'List contents of current directory',
        },
        {
            name: 'pwd',
            description: 'Print current working directory',
        },
        {
            name: 'exit',
            description: 'Exit the shell',
        },
        {
            name: 'clear',
            description: 'Clear the terminal screen',
        },
        {
            name: 'help',
            description: 'Display supported commands',
        },
        {
            name: 'history',
            description: 'Display command history',
        },
        {
            name: 'cd',
            description: 'Change directory',
        },
        {
            name: 'touch',
            description: 'Create a file',
        },
        {
            name: 'mkdir',
            description: 'Create a directory',
        },
        {
            name: 'cp',
            description: 'Copy a file',
        },
        {
            name: 'cpdir',
            description: 'Copy a directory',
        },
        {
            name: 'rm',
            description: 'Delete a file or directory',
        },
        {
            name: 'cat',
            description: 'Display contents of a file',
        },
        {
            name: 'mv',
            description: 'Move or rename a file',
        },
        {
            name: 'grep',
            description: 'Find a text in a file'
        },
        {
            name: 'wc',
            description: 'Count characters in a file'
        }
    ];
    commands.forEach(command => {
        console.log(`${command.name} - ${command.description}`);
    });
}

export {
    parseInputFlags,
    formatFileSize,
    displayWelcomeMessage,
    displaySupportedCommands
}