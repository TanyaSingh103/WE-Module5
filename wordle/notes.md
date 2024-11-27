# What is XSS?

XSS = Cross-site scripting.

The same-origin policy stops XSS from happening by making sure that a script running on fraud.com can only communicate with fraud.com (not exactly, origin is a combination of URI scheme, host name, and port number - see [wiki](https://www.wikiwand.com/en/articles/Same_origin_policy))

HOWEVER, we need to create exceptions to this.

We NEED the javascript running on localhost:5173 to make a so-called Cross-Origin Request to we6.talentsprint.com/wordle/game/register etc.

The solution? CORS

In CORS, requests are divided into simple requests and non-simple requests. A simple request is simply let through. For a non-simple request, a kind of handshake needs to be done.

The browser first makes a "preflight" request using teh HTTP OPTIONS method with the same Headers as the request it was originally going to send. Based on the server's response, it either goes through with the request or doesn't.

If the 'Access-Control-Allow-Origin' header is missing in the server's response to the OPTIONS request, then the browser DOES NOT go through with the request.