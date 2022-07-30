// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "./Structs.sol";

// Stateless Hyper Service Transfer Protocol for on-chain services.
abstract contract HSTP {
    function query(string[] memory request)
        public
        view
        virtual
        returns (Response memory);

    function mutation(string[] memory request)
        public
        payable
        virtual
        returns (Response memory);
}