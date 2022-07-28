// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;
// Author: cagataycali@icloud.com

// Stateless Hyper Service Transfer Protocol for on-chain services.
abstract contract HTSP {
    struct Route {
        string path;
        string method;
    }
    struct Request {
        string path;
        string[] params;
        string[] headers;
    }
    struct Response {
        string status;
        string body;
        string headers;
    }
    // Mapping for routes: {'/': 'GET', '/', 'PUT'}
    mapping(string => string) public routes;

    // Main reply method for all requests,
    function reply(string memory method, string memory path)
        public
        virtual
        returns (Response memory response) {
            // if (method === "GET") { return this.get(Request memory request); }
            // if (method === "PUT") { return this.get(Request memory request); }
            // if (method === "REMOVE") { return this.get(Request memory request); }
            // return this._500();
        }

    // Methods
    function get(Request memory request)
        public
        virtual
        returns (Response memory response);

    function put(Request memory request)
        public
        virtual
        returns (Response memory response);

    function remove(Request memory request)
        public
        virtual
        returns (Response memory response);
}

// Each route will have access NFT's. 
// If the access NFT exists on the caller, caler could call the service's method.