import fs from 'fs';

const VARIABLE_NAME = process.argv[2];
const ROOT_NAME = process.argv[3];
const LANGUAGE = process.argv[4];

function getBuildFile() {
    // get current working dir
    const cwd = process.cwd();

    // get the build folder
    const buildFolder = `${cwd}/dist/assets`;

    // list all files in the build folder
    const files = fs.readdirSync(buildFolder);

    console.log("found ", files);

    return {
        "js": `${buildFolder}/${files.filter(file => file.endsWith('.js'))}`,
        "css": `${buildFolder}/${files.filter(file => file.endsWith('.css'))}`
    }
}

function elaborateJSFile(file) {
    // read the file
    let data = fs.readFileSync(file, 'utf8');
    
    // find string "CHANGE_THIS_VARIABLE" and replace it with a variable named AK_BOT_BOT_ID
    data = data.replace(/"CHANGE_THIS_VARIABLE"/g, VARIABLE_NAME);

    // find string called "root" and replace it with the root name
    data = data.replace(/"root"/g, `"${ROOT_NAME}"`);

    // find string called "LANGUAGE" and replace it with a variable named AK_BOT_LANGUAGE
    data = data.replace(/"LANGUAGE"/g, `${LANGUAGE}`);

    // check if the variable is present
    if (!data.includes(VARIABLE_NAME)) {
        console.error("Variable not found in the file");
        return;
    } else {
        console.log("Variable found in the file, operation successful");
    }

    // check if the root is present
    if (!data.includes(ROOT_NAME)) {
        console.error("Root not found in the file");
        return;
    } else {
        console.log("Root found in the file, operation successful");
    }

    // write the file
    fs.writeFileSync(file, data);
}

const files = getBuildFile();

elaborateJSFile(files.js);

// copy the js file into an other folder called CDN
fs.copyFileSync(files.js, `${process.cwd()}/CDN/index.js`);

// copy the css file into an other folder called CDN
fs.copyFileSync(files.css, `${process.cwd()}/CDN/index.css`);