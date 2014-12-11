/*global describe,it*/
/*jshint expr:true */

require('should');

var GeoPoint = require('../lib/geo').GeoPoint;

describe('GeoPoint', function () {

  describe('constructor', function() {

    it('should support a valid array', function () {
      var point = new GeoPoint([-34, 150]);

      point.lat.should.equal(-34);
      point.lng.should.equal(150);
    });

    it('should support a valid object', function () {
      var point = new GeoPoint({ lat: -34, lng: 150 });

      point.lat.should.equal(-34);
      point.lng.should.equal(150);
    });

    it('should support valid string geo coordinates', function () {
      var point = new GeoPoint('-34,150');

      point.lat.should.equal(-34);
      point.lng.should.equal(150);
    });

    it('should reject invalid parameters', function () {
      /*jshint -W024 */
      var fn = function() {
        new GeoPoint('150,-34');
      };
      fn.should.throw();

      fn = function() {
        new GeoPoint('150,-34');
      };
      fn.should.throw();

      fn = function() {
        new GeoPoint();
      };
      fn.should.throw();
    });

  });

  describe('distance calculation between two points', function () {

    var here = new GeoPoint({ lat: 40.77492964101182, lng: -73.90950187151662 });
    var there = new GeoPoint({ lat: 40.7753227, lng: -73.909217 });

    it('should return value in miles by default', function () {

      var distance = GeoPoint.distanceBetween(here, there);
      distance.should.be.a.Number;
      distance.should.equal(0.03097916611592679);
    });

    it('should return value using specified unit', function () {

      /* Supported units:
       * - `radians`
       * - `kilometers`
       * - `meters`
       * - `miles`
       * - `feet`
       * - `degrees`
       */

      var distance = here.distanceTo(there, { type: 'radians'});
      distance.should.be.a.Number;
      distance.should.equal(0.000007825491914348416);

      distance = here.distanceTo(there, { type: 'kilometers'});
      distance.should.be.a.Number;
      distance.should.equal(0.04985613511367009);

      distance = here.distanceTo(there, { type: 'meters'});
      distance.should.be.a.Number;
      distance.should.equal(49.856135113670085);

      distance = here.distanceTo(there, { type: 'miles'});
      distance.should.be.a.Number;
      distance.should.equal(0.03097916611592679);

      distance = here.distanceTo(there, { type: 'feet'});
      distance.should.be.a.Number;
      distance.should.equal(163.56999709209347);

      distance = here.distanceTo(there, { type: 'degrees'});
      distance.should.be.a.Number;
      distance.should.equal(0.0004483676593058972);
    });
  });
});
