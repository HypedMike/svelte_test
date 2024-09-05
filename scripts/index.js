import fs from 'fs';

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

const files = getBuildFile();

// copy the js file into an other folder called CDN
fs.copyFileSync(files.js, `${process.cwd()}/CDN/index.js`);

// copy the css file into an other folder called CDN
fs.copyFileSync(files.css, `${process.cwd()}/CDN/index.css`);