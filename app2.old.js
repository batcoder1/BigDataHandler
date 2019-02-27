const fs = require('fs')
const readline = require('readline')
const stream = require('stream')

const inStream = fs.createReadStream('itcont.txt');
const outStream = new stream();

const async = require("async");


const rl = readline.createInterface(inStream, outStream);

let lineCount = 0;

let names = [];
let dupeNames = {};
let dateDonationCount = [];

let firstNames = []


rl.on('line', (line) => {
    lineCount++;
    console.log(lineCount)
    let name = line.split('|')[7];
    names.push(name);

    let firstName = name.split(', ')[1];

    if (firstName !== undefined) {
        firstNames.push(firstName);

    }
    let timestamp = line.split('|')[4].slice(0, 6);
    let formattedTimestamp = `${timestamp.slice(0,4)} - ${timestamp.slice(4,6)}`;
    dateDonationCount.push(formattedTimestamp);

})
rl.on('close', () => {
    console.log(`Lineas del fichero: ${lineCount}`);


    firstNames.forEach(name => {
        dupeNames[name] = (dupeNames[name] || 0) + 1;
    })


    var sortedDupeNames = [];

    sortedDupeNames = Object.entries(dupeNames);

    sortedDupeNames.sort((a, b) => {
        return b[1] - a[1]
    })

    //number donation per month
    dateDonationCount.forEach(x => {
        dateDonations[x] = (dateDonations[x] || 0) + 1;
    })
    logDateElements = (key, value, map) => {
        console.log(`Donations per month and year: ${value} and donation count ${key}`);
    }

    new Map(Object.entries(date)).forEach(logDateElements)
})
rl.on('error', err => {
    console.log(`Error: ${err} `)
})