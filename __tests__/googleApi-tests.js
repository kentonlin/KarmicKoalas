jest.unmock('../server/googleApiDirections');

var start = "40.8534229,-73.9793236";
var end = "40.7466059,-73.9885128";

describe('googleApiDirections', () => {
  it('returns an array of geolocations', () => {
    const getRoute = require('../server/googleApiDirections');
    getRoute(start, end, (result) => {
      expect(result.length).toBeGreaterThan(0);
    });
  });
});

describe('googleApiAddresses', () => {
  it('returns an address', () => {
    const getAddress = require('../server/googleApiAddresses');
    getAddress({
      start: start,
      end: end
    }, (result) => {
      // console.log("end:", result.end);
      expect(result.start).toEqual('1401-1551 John St, Fort Lee, NJ 07024, USA');
      expect(result.end.length).toBeGreaterThan(0);
    })
  })
})
