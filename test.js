const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

let database = {
  Songs: ["a", "b", "c"]
}

let getAll = function() {
  return database.Songs;
}

describe("Artist Portal", () => {
  describe("getAll", () => {
    it("Should be a function", () => {
      expect(getAll).to.be.a("function");
    });

    it("Should return all songs in the database", () => {
      expect(database).to.deep.equal({Songs: ["a", "b", "c"]})
    })
  });

  describe("database", () => {
    it("Should be an object", () => {
      expect(database).to.be.an("object");
    });
  });
});
