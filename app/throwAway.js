var votes = [
  'tacos',
  'pizza',
  'pizza',
  'tacos',
  'fries',
  'ice cream',
  'ice cream',
  'pizza'
]

obj1 = votes.reduce((obj,food)=>{
  if(!obj[food]){obj[food] === 1}
  else{obj[food]++}
  return obj;
},{});

console.log(obj1);
