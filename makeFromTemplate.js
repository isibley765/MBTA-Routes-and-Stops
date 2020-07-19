const fs = require('fs');
const path = require('path');

var whereto = null;
var filename = null;
var template = null;

if (process.argv.length == 4)
{
    whereto = path.join(__dirname, process.argv[2], process.argv[3]);

    if (fs.existsSync(whereto)) {
        console.log("Folder path already exists -- delete if you're sure you want to do this");
        return;
    }

    filename = process.argv[3];
    
    template = fs.readFileSync(path.join(__dirname, "src/react/assets/filetemplate.txt"), 'utf-8');
    
    template = template.replace(/\$FileName/g, filename);

    console.log("Working on it boss...");
    
    fs.mkdirSync(whereto, {recursive: true});
    fs.writeFileSync(path.join(whereto, filename + ".jsx"), template);
    fs.writeFileSync(path.join(whereto, filename + ".css"), "");
}
else
{
    console.log("GIVE THE RIGHT INPUTS");
    console.log("npm run template -- filePath fileName");
    console.log(`NOT these ${process.argv.length}`);
    console.log(process.argv.join(", "));
}
