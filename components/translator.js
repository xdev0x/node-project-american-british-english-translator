const e = require('express');
const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1);
}

class Translator {

    translate(words, text, titles){
        let searchText = text.toLowerCase();
        Object.entries(words)
            .map(([key, value]) => {
                if (new RegExp(`(${key} | ${key}$ | ${key}[^A-Za-z])`, "gi").test(searchText)) {
                    if(key in titles){
                        value = capitalizeWord(value)
                    }
                    text = text.replace(new RegExp(key, "gi"), `<span class="highlight">${value}</span>`) || text;
                }
            })
        return text;
    }

    americanToBritish(text){
        let words = {...americanOnly, ...americanToBritishSpelling, ...americanToBritishTitles};
        let translation = this.translate(words, text, americanToBritishTitles);
        let t = text.match(/(([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]))/g)
        if(t){
            t.map((key)=>{
                let s = text.replace(new RegExp(`${key}`), (e)=>{
                    return `<span class="highlight">${key.replace(':', '.')}</span>`;
                })
                if(s) translation = s;
            })
        }
        return translation;
    }

    britishToAmerican(text){
        let britishToAmericanSpelling = Object.entries(americanToBritishSpelling).reduce((arr, [k, v]) => (arr[v] = k, arr), {})
        let britishToAmericanTitles = Object.entries(americanToBritishTitles).reduce((arr, [k, v]) => (arr[v] = k, arr), {})
        let words = {...britishOnly, ...britishToAmericanSpelling, ...britishToAmericanTitles};
        let translation = this.translate(words, text, britishToAmericanTitles);
        let t = text.match(/(([0-9]|0[0-9]|1[0-9]|2[0-3]).([0-5][0-9]))/g)
        if(t){
            t.map((key)=>{
                let s = text.replace(new RegExp(`${key}`), (e)=>{
                    return `<span class="highlight">${key.replace('.', ':')}</span>`;
                })
                if(s) translation = s;
            })
        }
        return translation;
    }
}

module.exports = Translator;