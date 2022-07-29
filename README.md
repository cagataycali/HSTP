# Hyper Service Transfer Protocol on EVM

The protocol aims to develop a contract level abstraction for the Hyper Service Transfer Protocol.

The protocol will implement way to transfer services between two parties.
One contract could call another contract within the same chain.

Thus the contracts can call each other freely, they can check their system status, and they can communicate with each other.

### Awesome web3 services running top of HSTP

[Full list here](https://github.com/cagataycali/awesome-web3-services)

### How to use the protocol

The protocol itself is a [smart contract proposal](./HSTP.sol), you can set your Contract as HSTP contract.

HSTP is a abstract class.

Implements: HTTP methods, HTTP headers, HTTP body, HTTP status code, HTTP status message, HTTP version.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Stateless Hyper Service Transfer Protocol for on-chain services.
import "./HSTP.sol";

contract Node is HSTP {
   function setServiceName (string memory name) public {
      register(name);
   }
    function query(Request memory request, Response memory response)
        public
        override
        virtual
        returns (Response memory) {
            response.status = "success";
            response.body = request.payload;
            return response;
        }

    function mutation(Request memory request, Response memory response)
        public
        virtual
        override
        payable
        returns (Response memory) {
            response.status = "success";
            response.body = request.payload;
            return response;
        }
}
```


### Test the HSTP;


- [x] Query the service: `request: ["payload"], response: ["status", "body"]`
- [x] Mutation the service: `request: ["payload"], response: ["status", "body"]`


# License

GNU GENERAL PUBLIC LICENSE V3

# Author

[Cagatay Cali](https://twitter.com/cagataycali)
