import fs from 'fs';
import path from 'path';


const writeToFile = async (urlPath, errorObj, ext, key) => {
    const logPath = _buildPath(urlPath, errorObj.name || 'UndefinedError', ext, key);
    console.error(`writeToFile errorObj:\n${logPath}\n${errorObj[key]}`);

    return await new Promise(resolve => fs.writeFile(logPath, errorObj[key] || 'N/A', () =>
        resolve(console.log(`Error ${key} written to file.`))
    ));
};

const _buildPath = (urlPath, errorName, ext, key) => {
    const dirname = import.meta.dirname;
    const relativePath = `/../../error_logs${ext == 'log' ? '' : `/${key}`}`;
    const logPath = path.join(
        dirname,
        relativePath,
        `DRN_${urlPath}_${errorName}_error_${new Date().toISOString().replaceAll(':', '.')}.${ext}`
    );
    if (!fs.existsSync(dirname + relativePath)) fs.mkdirSync(dirname + relativePath);
    return logPath;
};

export { writeToFile };
