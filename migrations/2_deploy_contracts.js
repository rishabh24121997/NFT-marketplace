const RishabhERC20 = artifacts.require("RishabhERC20");
const NewToken = artifacts.require("NewToken");
const MarketPlace = artifacts.require("MarketPlace");

module.exports = function (deployer) {
  deployer.deploy(MarketPlace)
  deployer.deploy(RishabhERC20, 1000)
  deployer.deploy(NewToken)
};