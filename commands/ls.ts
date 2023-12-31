import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { formatFileSize } from '../utils/index';

const listContentsOfDir = (flags: Record<string, any>) => {
    try {
        const result: { Name: string, Type: string, Size: string }[] = [];
        readdirSync('./').forEach(file => {
            const itemPath = join('./', file);
            const stats = statSync(itemPath);

            if (stats.isDirectory()) {
                result.push({ Name: file, Type: 'dir', Size: '--' });
            } else if (stats.isFile()) {
                result.push({ Name: file, Type: 'file', Size: formatFileSize(stats.size) });
            } else if (stats.isSymbolicLink()) {
                result.push({ Name: file, Type: 'symlink', Size: '--' });
            } else {
                result.push({ Name: file, Type: 'unknown', Size: '--' });
            }
        });

        console.table(result);
    } catch (error) {
        console.error(error);
    }
}

export default listContentsOfDir;