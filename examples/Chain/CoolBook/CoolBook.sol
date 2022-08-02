// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "hstp/HSTP.sol";
import "./Profile/Profile.sol";

// Stateless Hyper Service Transfer Protocol for on-chain services.
// coolbook/query/<IProfileQuery memory request> (type bytes)
// coolbook/mutation/<IProfileMutation memory request> (type bytes)
contract CoolBook is HSTP("CoolBook") {
    mapping(string => address) public names;
    mapping(address => Profile) public profiles;

    // Overrides .query
    function getProfile(string memory name) public view returns(Profile memory profile) {
        return profiles[names[name]];
    }
    
    // Overrides .mutation
    function createProfile(Profile memory profile) public payable returns(Response memory response) {
        HSTP memory profileHSTPNode = new Profile(profile.name);
        names[profile.name] = address(profileHSTPNode);
        profiles[address(profileHSTPNode)] = profile;
        return response;
    }

    // Override for HSTP.
    function query(bytes memory payload)
        public
        view
        virtual
        override
        returns (Response memory) {
            // Profile service's query payload is defined in Profile.sol
            (string memory request) = abi.decode(payload, (IProfileQuery));
            HSTP memory profile = profiles[this.getProfile(request.name)];
            // Sent HSTP query request to underneath service.
            return profile.query(payload);
        }

    function mutation(bytes memory payload)
        public
        payable
        virtual
        override
        returns (Response memory) {
            // Profile service's data model is defined in Profile.sol
            // Mutation is resolving to createProfile function.
            (string memory request) = abi.decode(payload, (IProfile));
            // Sent HSTP mutation request to underneath service.
            HSTP memory profile = profiles[this.getProfile(request.name)];
            return profile.mutation(payload);
        }
}