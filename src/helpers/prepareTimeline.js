export const prepareTimeline = (messages) => {
  const n = [];
  for (let index = 0; index < messages.length - 1; index++) {
    const element1 = messages[index + 1];
    const element2 = messages[index];
    const currentDatetimeUTC = new Date(element1.timestamp * 1000);
    const prevDatetimeUTC = new Date(element2.timestamp * 1000);
    const d1UTC = new Date(
      Date.UTC(currentDatetimeUTC.getUTCFullYear(), 
      currentDatetimeUTC.getUTCMonth(), 
      currentDatetimeUTC.getUTCDate())
    );
    const d2UTC = new Date(
      Date.UTC(prevDatetimeUTC.getUTCFullYear(),
      prevDatetimeUTC.getUTCMonth(), 
      prevDatetimeUTC.getUTCDate())
    );
    // console.log('d1', d1UTC.getTime());
    // console.log('d2', d2UTC.getTime());
    if (d1UTC.getTime() !== d2UTC.getTime()){
      n.push({e: 1});
    }
  }  
  return n;
}

const messages = [
  {timestamp: '1727027959',},
  {timestamp: '1726916359',},
  {timestamp: '1726830251',},
  {timestamp: '1726829959',},
  {timestamp: '1726743559',},
];

console.log('t', prepareTimeline(messages));
