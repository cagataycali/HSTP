// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

// Stateless Hyper Service Transfer Protocol for on-chain services.
abstract contract HSTP {
    struct Route {
        string path;
        string operation;
    }
    struct Request {
        string payload;
    }
    struct Response {
        string status;
        string body;
    }
    // Mapping for routes: {'/': 'query', '/', 'mutation'}
    mapping(string => string) public routes;

    // Main reply method for all requests,
    function reply(
        Route memory route,
        Request memory request,
        Response memory response
    ) public virtual returns (Response memory);

    // Operation
    function query(Request memory request, Response memory response)
        public
        virtual
        returns (Response memory);

    function mutation(Request memory request, Response memory response)
        public
        virtual
        payable
        returns (Response memory);
}
