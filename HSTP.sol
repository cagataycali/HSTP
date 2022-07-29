// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "./Structs.sol";

// Stateless Hyper Service Transfer Protocol for on-chain services.
abstract contract HSTP {
    function query(Request memory request, Response memory response)
        public
        virtual
        returns (Response memory);

    function mutation(Request memory request, Response memory response)
        public
        payable
        virtual
        returns (Response memory);
}
