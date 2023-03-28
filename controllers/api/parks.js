// make fetch request here 
const Fuse = require('fuse.js');
const Reservation = require('../../models/reservation');
const Park = require('../../models/park');

module.exports = {
  searchAPI,
  getPark
};

async function searchAPI(req, res) {
  
  const options = {
    keys: ['name', 'feature_desc'],
    includeScore: true,
    threshold: 0.4
  };

  const response2 = await fetch(`https://data.seattle.gov/resource/j9km-ydkc.json`)
  const data2 = await response2.json();
  const fuse2 = new Fuse(data2, options);
  const results2 = fuse2.search(req.query.search);
  const matchedParks2 = results2.map((result2) => result2.item);
  // add to db
  const parkData = formatParkData(matchedParks2);
  const parksByName = {};
  for (const park of parkData) {
    // set p to the park in the data base if there is a park with a matching name, if not p is nothing or undefined maybe
    let p = await Park.findOne({name: park.name});
    // If p wasn't found in the database we want to create it so it will be falsy currently, !p make sit true so the create park will run
    if (!p) {
      p = await Park.create(park);
    }
    // if there are no parks in my parksByName object yet with this parks name, it must be new so add it
    if (!parksByName[p.name]) {
      parksByName[p.name] = p;
    }
    // gaurd in case a park doesn't have any feature, if the feature isn't included in the parks feature_desc array than we add the feature to it
    if (park.feature_desc && !parksByName[p.name].feature_desc.includes(park.feature_desc)) {
      parksByName[p.name].feature_desc.push(park.feature_desc);
    }
    await parksByName[p.name].save();
  }
  // reduce data I send back to just one array of all unique parks 
  const allParks = Object.values(parksByName);
  console.log(allParks)
  res.json(allParks);
}


function formatParkData(parks) {
  return parks.map((p) => (
    {
      name: p.name,
      feature_desc: p.feature_desc,
      hours: p.hours
    }
  ))
}
    
async function getPark(req, res) {
  const park = await Park.findById(req.params.id)
  res.json(park);
  console.log(park)
}