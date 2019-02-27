const fs = require('fs'),
    es = require('event-stream');


let totalLines = 0;

let names = [];
let dupeNames = {};
let dateDonationCount = [];
let dateDonations = []
let firstNames = []


const s = fs
    .createReadStream('itcont.txt')
    .pipe(es.split())
    .pipe(es
        .mapSync(line => {
            totalLines++;
            console.log(totalLines)
            let name = line.split('|')[7];
            if (totalLines === 444 | totalLines === 44300) {
                names.push(name);

            }
            let firstName = undefined;
            if (name !== undefined) {
               firstName = name.split(', ')[1];
            }
            if (firstName !== undefined) {
                firstNames.push(firstName);
        
            }
            let timestambulk = line.split('|')[4]
            if (timestambulk !== undefined){

                let timestamp = timestambulk.slice(0, 6);
                if (timestamp !== undefined) {
                   let formattedTimestamp = `${timestamp.slice(0,2)} - ${timestamp.slice(2,4)}`;
                   dateDonationCount.push(formattedTimestamp);
                }
            }

        
        })
        .on('error', err => {
            console.log(err)
          }  )

        .on('end', () => {
            console.log(`end reading: ${totalLines}`);
            console.log(`file lines: ${totalLines}`);

            console.log(names);

            firstNames.forEach(name => {
                dupeNames[name] = (dupeNames[name] || 0) + 1;
            })
        
        
            var sortedDupeNames = [];
        
            sortedDupeNames = Object.entries(dupeNames);
        
            sortedDupeNames.sort((a, b) => {
                return b[1] - a[1]
            })
            console.log(sortedDupeNames[0])
            //number donation per month
            dateDonationCount.forEach(x => {
                dateDonations[x] = (dateDonations[x] || 0) + 1;
            })
            logDateElements = (key, value, map) => {
                console.log(`Donations per month and year: ${value} and donation count ${key}`);
            }
        
            new Map(Object.entries(dateDonations)).forEach(logDateElements)
        })
        
)

console.log('Start');




