// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

struct Route {
    string name;
    string operation;
}
struct Request {
    string payload;
}
struct Response {
    string status;
    string body;
}