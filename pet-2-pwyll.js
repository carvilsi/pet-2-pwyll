const toml = require('toml');
const axios = require('axios');
const fs = require('node:fs');

const snippets = [];
const config = {};

function readPetTomlFile(petSnippetTomlPath) {
    const readable = fs.createReadStream(petSnippetTomlPath, 'utf8');

    readable.on('close', () => {
        console.log('done');
        importFromPet();
    });

    readable.on('data', (data) => {
        let parsed = toml.parse(data);
        for (let i = 0; i < parsed.snippets.length; i++) {
            const snippetObj = {
                snippet: parsed.snippets[i].command,
                description: parsed.snippets[i].description,
            };
            snippets.push(snippetObj);
        }
    });
}

function usage() {
    const usageMessage = 'Usage: \n' +
        'node pet-2-pwyll.js <path to pet snippet.toml file> <pwyll url> ' + 
        '<pwyll username> <pwyll userID> <user secret>'; 
    throw new Error(usageMessage);
}

// creating new snippet
async function addSnippetPwyllCall(snippetObj) {
        snippetObj.userID = config.userID;
        snippetObj.secret = config.secret;
    return await axios.post(`${config.pwyllUrl}/snippet`, snippetObj);
}

async function importFromPet() {
    for (let i = 0; i < snippets.length; i++) {
        await addSnippetPwyllCall(snippets[i]);
        console.log(`imported snippet ${i+1}/${snippets.length}`);
        console.dir(snippets[i]);
    }
    console.log(`imported a total of ${snippets.length} snippets into pwyll`);
}

(async () => {
    try {
        const args = process.argv;
        if (args.length !== 7) { 
            usage();
        }
        config.pwyllUrl = args[3];
        config.username = args[4];
        config.userID = args[5];
        config.secret = args[6];
        readPetTomlFile(args[2]);
    } catch (err) {
        console.log(err.message);
    }
})();

