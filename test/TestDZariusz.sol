pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/DZariusz.sol";

contract TestDZariusz {

  function testInitName() public {
    DZariusz dzariusz = DZariusz(DeployedAddresses.DZariusz());
    Assert.equal(dzariusz.name(), "Dariusz Zacharczuk", "It should store name of 'Dariusz Zacharczuk'");
  }

  function testInitContact() public {
    DZariusz dzariusz = DZariusz(DeployedAddresses.DZariusz());
    Assert.equal(dzariusz.contact(), "http://dzariusz.com", "It should store name of 'http://dzariusz.com'");
  }


  function testStoredName() public {
    DZariusz dzariusz = DZariusz(DeployedAddresses.DZariusz());

    dzariusz.setName('Any Name');

    Assert.isTrue(false, "It should throw, because only owner can change name");
  }

}
