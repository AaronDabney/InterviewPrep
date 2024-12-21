import * as  fs from "fs"


let regeExpString = process.argv[2];
let filesAndFolders = process.argv.slice(3);

if (!regeExpString || filesAndFolders.length === 0) {
    throw "Missing arguments"
}

console.log(nodeGrep(regeExpString, filesAndFolders));

/**
 * Searches provided files, folders, and subfolders for file content that matches regexp
 * Returns list of matching files
 * @param regexpString 
 * @param searchTargets 
 * @returns 
 */
function nodeGrep(regexpString: string, searchTargets: Array<string>): Array<string> {
    let validSearchTargets: Array<string> = searchTargets.filter(target => fs.existsSync(target));
    let invalidSearchTargets: Array<string> = searchTargets.filter(target => !fs.existsSync(target));

    for (let target of invalidSearchTargets) {
        console.log(`Target does not exist: ${target}`)
    }

    const regexp = new RegExp(regexpString);

    const matchingFiles: Array<string> = [];
    function recursiveSearch(item: string) {
        if (itemIsFile(item) && itemContentsMatchesRegexp(item, regexp)) {
            matchingFiles.push(item)
            return;
        }

        if (itemIsFolder(item)) {
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

function itemIsFile(filePath: string) {
    const itemInfo = fs.lstatSync(filePath);
    return itemInfo.isFile();
}

function itemIsFolder(filePath: string) {
    const pathItemInfo = fs.lstatSync(filePath);
    return pathItemInfo.isDirectory();
}

function itemContentsMatchesRegexp(filePath: string, regexp: RegExp) {
    let itemContents = fs.readFileSync(filePath, 'utf8');
    return regexp.test(itemContents);
}
