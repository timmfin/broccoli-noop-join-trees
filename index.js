var mapSeries = require('promise-map-series')


module.exports = NoopTreeJoiner
function NoopTreeJoiner (mainInputTree, treesToJoin) {
  this.mainInputTree = mainInputTree;
  this.treesToJoin = treesToJoin;
}

NoopTreeJoiner.prototype.read = function (readTree) {
  var self = this

  return mapSeries(this.treesToJoin, function(tree) {
    return tree.read(readTree);
  }).then(function (unneededOutputDirs) {
    return self.mainInputTree.read(readTree);
  })
}

NoopTreeJoiner.prototype.cleanup = function () {}
