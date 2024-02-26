const toml = require('toml');
//const concat = require('concat-stream');
const axios = require('axios');
const fs = require('node:fs');
//const bb = require('bluebird');

const config = {
  pwyllUrl:"http://localhost:46520",
  username:"char",
  userID:"65c0ca527aa48203c6734b8f"
};

const snippets = [];

function readPetTomlFile() {
  const readable = fs.createReadStream('snippet.toml', 'utf8');

  readable.on('close', () => {
    console.log('done');
    importFromPet();
  });

  readable.on('data', (data) => {
    let parsed = toml.parse(data);
    for (let i = 0; i < parsed.snippets.length; i++) {
      const snippetObj = {
        command: parsed.snippets[i].command,
        description: parsed.snippets[i].description,
      };
      snippets.push(snippetObj);
    }
  });
}

function usage() {
    const usageMessage = 'Usage: \n' +
        'node index.js <path to pet snippet.toml file> <pwyll url> ' + 
        '<pwyll username> <pwyll userID> <user secret>'; 
    throw new Error(usageMessage);
}

(async () => {
    try {
        const args = process.argv;
        if (args.length !== 5) { 
            usage();
        }
        readPetTomlFile();
    } catch (err) {
        console.log(err.message);
    }
})();

// creating new snippet
async function addSnippetPwyllCall(snippetObj) {
   return await axios.post(`${config.pwyllUrl}/command`, {
      command: snippetObj.command,
      description: snippetObj.description,
      userId: config.userID,
    });
}

async function importFromPet() {
    for (let i = 0; i < snippets.length; i++) {
        await addSnippetPwyllCall(snippets[i]);
        console.log(`imported snippet ${i+1}/${snippets.length}`);
        console.dir(snippets[i]);
    }
    console.log(`imported a total of ${snippets.length} snippets into pwyll`);
}

