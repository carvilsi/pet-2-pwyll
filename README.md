# pet-2-pwyll

Import your snippets from [pet](https://github.com/knqyf263/pet) to pwyll

Here you'll find the server side of [pwyll](https://github.com/carvilsi/pwyll) and the client [pwyll-cli](https://github.com/carvilsi/pwyll-cli)

## Usage

First install the dependencies:

`$ npm install` 

Then just run it, with the parameters:

`$ node pet-2-pwyll.js <path to pet snippet.toml file> <pwyll url> <pwyll username> <pwyll userID> <user secret>`

The toml's snippet file of pet use to be at: `~/.config/pet/snippet.toml`

**example**

`$ node pet-2-pwyll.js ~/.config/pet/snippet.toml http://localhost:46520 alan  00dd94e1df493c450c6b8aa0 alan-secrets`

