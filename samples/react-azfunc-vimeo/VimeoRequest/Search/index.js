'use strict';
var Vimeo = require('vimeo').Vimeo;

const VimeoAPIKey = process.env.VimeoAPI,
    VimeoAPISecret = process.env.VimeoSecret,
    VimeoEndPoint = process.env.VimeoEndPoint;

var _handleError = {
    noQuery: (context) => {

        // return error context
        context.res = {
            status: 400,
            body: "No search query has been passed in please specifiy ?q=Hello World"
        };
        context.done();

        // throw exception
        throw "No query was specified please use ?q=VideoToFind";

    },
    APIError: (context, message) => {

        // return error context
        context.res = {
            status: 400,
            body: "API Error: " + message
        };
        context.done();

        // throw exception
        throw "API Error" + message;

    }

}

async function queryVimeo(search, client) {

    return new Promise((resolve, reject) => {

        client.request({
            // This returns the first page of videos containing the term "vimeo staff".
            // These videos will be sorted by most relevant to least relevant.
            path: '/videos',
            query: {
                page: 1,
                per_page: 10,
                query: search,
                sort: 'relevant',
                direction: 'asc'
            }

        }, (error, body, statusCode, headers) => {

            console.log(error);

            if (error) {

                reject();
                throw error;

            }

            resolve({
                header: headers,
                body: body
            });

        })

    })
};

module.exports = (context, req) => {

    if (Object.keys(req.query).length === 0) {
        throw _handleError.noQuery(context);
    }

    if (req.query.q === undefined) {

        throw _handleError.noQuery(context);

    }

    try {

        var client = new Vimeo(VimeoAPIKey, VimeoAPISecret);

        client.generateClientCredentials(["public"], (err, response) => {

            console.log(response);

            if (err) {

                throw err;
                context.done();

            }

            client.setAccessToken(response.access_token);

            try {

                queryVimeo(req.query.q, client)
                    .then((searchResponse) => {

                        console.log(searchResponse.header);

                        context.res = {
                            body: searchResponse.body
                        };

                        context.done();

                    }).catch(
                        (error) => {

                            throw error;
                            context.done();

                        }

                    )

            } catch (err) {

                context.log('error', err);

            }

        })

    } catch (error) {

        context.res = {
            body: error
        };

    }

};