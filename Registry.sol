// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

// Contract level DNS registrar.
// TODO: implement 721 here to register your top level tld.
contract Registry {
    struct Record {
        string name;
        string ipfs;
        address owner;
    }
    address public _owner;

    constructor(string memory name, string memory ipfs, address owner) {
        _owner = owner;
        register(name, ipfs);
    }

    mapping(string => Record) public records;

    function register(string memory name, string memory ipfs) public payable {
        // TODO: the price could be changeable from the owner.
        // Access NFTs HSTP protocol call here. (https://github.com/cagataycali/flex-protocol)
        // You can enable any web3 service as middleware the service usage by paying the fee.
        require(msg.value >= 0 ether, "Registry: Insufficient funds");
        require(msg.sender == _owner, "Only owner can add records");
        records[name] = Record({
            name: name,
            ipfs: ipfs,
            owner: _owner
        });
    }
}