# Hyper Service Transfer Protocol on EVM

The protocol aims to develop a contract level abstraction for the Hyper Service Transfer Protocol.

The protocol will implement way to transfer services between two parties.
One contract could call another contract within the same chain.

Thus the contracts can call each other freely, they can check their system status, and they can communicate with each other.

### How to use the protocol

The protocol itself is a [smart contract proposal](./HSTP.sol), you can set your Contract as HSTP contract.

HSTP is a abstract class.

Implements: HTTP methods, HTTP headers, HTTP body, HTTP status code, HTTP status message, HTTP version.

```solidity
contract Service is HSTP {
    function reply(Route memory route, string memory payload, string memory headers, string memory cookies)
        public
        virtual
        returns (Response memory response) {
            // response.status = "200";
            // response.body = payload;
            // response.headers = headers;
            // response.cookies = cookies;
            // return response;
        }
    }
    function query(Request memory request) public virtual returns (Response memory response) {
        response.status = "200";
        response.body = "Hello World!";
        response.headers = "";
        response.cookies = "";
        return response;
    }
    function mutation(Request memory request) public virtual returns (Response memory response) {
        response.status = "200";
        response.body = "Hello World!";
        response.headers = "";
        response.cookies = "";
        return response;
    }
}
```

# License

GNU GENERAL PUBLIC LICENSE V3

# Author

[Cagatay Cali](https://twitter.com/cagataycali)
