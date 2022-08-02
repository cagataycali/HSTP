// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "hstp/HSTP.sol";
import "./Follow/Follow.sol";

struct IProfileQuery {
    string name;
}

struct IProfile {
    string name;
    string avatar;
    string description;
}

// Stateless Hyper Service Transfer Protocol for on-chain services.
contract Profile is HSTP("Profile") {
    IProfile public profile;

    function getProfile() public payable returns (Response memory response) {
        response.body = profile;
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
        // This will resolve from root node.
        // super.reply('Follow', Operation.Mutation, "erdalcay");
        return this.getProfile(request);
    }

    function mutation(bytes memory payload)
        public
        payable
        virtual
        override
        returns (Response memory)
    {
        IProfile memory _profile = abi.decode(payload, (IProfile));
        profile = _profile;
        return true;
    }
}
