import * as  fs from "fs"


let regeExpString = process.argv[2];
let filesAndFolders = process.argv.slice(3);

if (!regeExpString || filesAndFolders.length === 0) {
    throw "Missing arguments"
}

console.log(nodeGREP(regeExpString, filesAndFolders));

/**
 * Searches provided files, folders, and subfolders for file content that matches regexp
 * Returns list of matching files
 * @param regexpString 
 * @param searchTargets 
 * @returns 
 */
function nodeGREP(regexpString: string, searchTargets: Array<string>): Array<string> {
    let validSearchTargets: Array<string> = searchTargets.filter(target => fs.existsSync(target))
    let invalidSearchTargets: Array<string> = searchTargets.filter(target => !fs.existsSync(target))

    for (let target of invalidSearchTargets) {
        console.log(`Target does not exist: ${target}`)
    }

    const regexp = new RegExp(regexpString);
    const matchingFiles: Array<string> = [];

    const fileMatchesRegExp = (filePath: string) => regexp.test(fs.readFileSync(filePath, 'utf8'));
    const isFile = (filePath: string) => fs.lstatSync(filePath).isFile();
    const isFolder = (filePath: string) => fs.lstatSync(filePath).isDirectory();

    function recursiveSearch(item: string) {
        if (isFile(item) && fileMatchesRegExp(item)) {
            matchingFiles.push(item)
            return;
        }

        if (isFolder(item)) {
            let folderContents = fs.readdirSync(item)
            for (let subFolderItem of folderContents) {
                recursiveSearch(`${item}/${subFolderItem}`)
            }
        }
    }

    for (let target of validSearchTargets) {
        recursiveSearch(target)
    }

    return matchingFiles
}
