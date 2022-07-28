// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Stateless Hyper Service Transfer Protocol for on-chain services.
abstract contract HTSP {
    struct Route {
        string path;
        string operation;
    }
    struct Request {
        string path;
        string payload;
        string headers;
        string cookies;
    }
    struct Response {
        string status;
        string body;
        string headers;
    }
    // Mapping for routes: {'/': 'query', '/', 'mutation'}
    mapping(string => string) public routes;

    // Main reply method for all requests,
    function reply(Route memory route, string memory payload, string memory headers, string memory cookies)
        public
        virtual
        returns (Response memory response);

    // Operation
    function query(Request memory request)
        public
        virtual
        returns (Response memory response);

    function mutation(Request memory request)
        public
        virtual
        returns (Response memory response);
}