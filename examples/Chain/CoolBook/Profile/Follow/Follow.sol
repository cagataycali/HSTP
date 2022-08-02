// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "hstp/HSTP.sol";

struct IFollow {
    string from;
    string to;
}

// Stateless Hyper Service Transfer Protocol for on-chain services.
contract Follow is HSTP("Follow") {
    // 
    mapping(HSTP => mapping(HSTP => bool)) followList;

    function toggleFollow(IFollow memory request) public payable returns (Response memory response) {
        followList[request.from][request.to] != followList[request.from][request.to];
        return response;
    }

    function isFollows(IFollow memory request) public returns (Response memory response) {
        if (followList[request.from][request.to]) {
            response.body = true;
        }
        response.body = false;
        return response;
    }

    // Override for HSTP.
    function query(bytes memory payload)
        public
        view
        virtual
        override
        returns (Response memory)
    {
        IFollow memory request = abi.decode(payload, (IFollow));
        // If you want you can call another follow from here.
        // super.reply('Profile', Operation.Query, "cagataycali");
        return this.isFollows(request);
    }

    function mutation(bytes memory payload)
        public
        payable
        virtual
        override
        returns (Response memory)
    {
        IFollow memory request = abi.decode(payload, (IFollow));
        // If you want you can call another follow from here.
        // super.reply('Profile', Operation.Mutation, "cagataycali");
        return this.toggleFollow(requet);
    }
}
