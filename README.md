# marketplacemat

Watch what we eat (bytes).


## Installation

We use [grunt](http://gruntjs.com/):

    npm install grunt-cli -g
    npm install


## Recording sizes

These files were compiled using [`heifer`](https://github.com/potch/heifer):

    for url (https://marketplace.firefox.com https://marketplace.allizom.org https://marketplace-dev.allizom.org) { \
        domain=$url:s/https:\/\///:s/http:\/\///;
        fn='history/'$domain'/'$(date +%Y.%m.%d-%H.%M.%S);
        heifer --url $url --export-html $fn'.html' --export-json $fn'.json';
    }


## Updating GitHub™ Pages

1. Build the directory indices (grunt task coming soon):

    ```
    node build-indices/indices.js
    ```

2. Push pages:

    ```
    grunt gh-pages
    ```
