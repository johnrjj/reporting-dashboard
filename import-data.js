const fs = require('fs');
const csv = require('csv');
const moment = require('moment');

const s = fs.readFileSync('data.csv', 'utf8');
csv.parse(s, (e, d) => {

  const data = d;
  const doneIdx = data[0].findIndex(x => x === 'Done') - 1;
  const startIdx = data[0].findIndex(x => x === 'Analysis Active') - 1;
  const [first, ...rest] = data;
  const doneEvents = rest.filter(arr => arr[doneIdx] !== '');
  const eventMap = doneEvents.map(e => {
    const startDate = moment(e[startIdx]);
    const doneDate = moment(e[doneIdx]);
    const lengthInDays = doneDate.diff(startDate, 'days');
    const o = {
      x: e[doneIdx],
      y: lengthInDays,
      size: 1,
    };
    console.log(o);
    return o;
  });

fs.writeFileSync('src/data.json', JSON.stringify(eventMap), 'utf8');



  // console.log(d);
});


// [ { x, y, size }, { x,y,size}, ...];