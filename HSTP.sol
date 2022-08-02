// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "./Router.sol";

// Stateless Hyper Service Transfer Protocol for on-chain services.
// Will implement: EIP-4337 when it's on final stage.
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-4337.md
abstract contract HSTP is Router {
    constructor(string memory name) {
        register(name, this);
    }

    function query(bytes memory payload)
        public
        view
        virtual
        returns (Response memory);

    function mutation(bytes memory payload)
        public
        payable
        virtual
        returns (Response memory);
}