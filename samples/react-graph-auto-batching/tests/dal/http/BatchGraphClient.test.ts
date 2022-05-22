///<reference types="jest" />
import { BatchGraphClient } from "../../../src/dal/http/BatchGraphClient";
import { assert } from "chai";
import { TestingUtilities } from "../../TestingUtilities";
import { BatchHandler } from "../../../src/dal/http/BatchHandler";

describe("BatchGraphClient", ()=>{
	test("should batch get requests", async () => {
        let baseClient = {
            get: (url,  options) => {
                throw "Don't call get!"
            },
            post: (url,  options) => {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        responses: [
                            {
                                status: 200,
                                body: {
                                    displayName: "Test User"
                                },
                                id: encodeURIComponent("/me")
                            },
                            {
                                status: 200,
                                body: {
                                    value: [{
                                        id: "Test group id"
                                    }]
                                },
                                id: encodeURIComponent("/me/groups")
                            },
                        ],
                    })
                });
            }
        }
        let batchClient = new BatchGraphClient(baseClient as any);
        let mePromise = batchClient.get("/me");
        let groupPromise = batchClient.get("/me/groups");
        let me = await mePromise;
        let group = await groupPromise;
        assert.deepEqual((await me.json()), {
            displayName: "Test User"
        });
        assert.deepEqual((await group.json()), {
            value: [{
                id: "Test group id"
            }]
        });
    });
    test("should request two batches", async () => {
        let postMethod = jest.fn()
        postMethod.mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 200,
                        body: {
                            displayName: "Test User"
                        },
                        id: encodeURIComponent("/me")
                    },
                    {
                        status: 200,
                        body: {
                            value: [{
                                id: "Test group id"
                            }]
                        },
                        id: encodeURIComponent("/me/groups")
                    },
                ],
            })
        })).mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 200,
                        body: {
                            displayName: "Test User second batch"
                        },
                        id: encodeURIComponent("/me")
                    },
                    {
                        status: 200,
                        body: {
                            value: [{
                                id: "Test group id second batch"
                            }]
                        },
                        id: encodeURIComponent("/me/groups")
                    },
                ],
            })
        }));
        let baseClient = {
            post: postMethod
        };

        let batchClient = new BatchGraphClient(baseClient as any, 10);
        let mePromise = batchClient.get("/me");
        let groupPromise = batchClient.get("/me/groups");

        await TestingUtilities.sleep(11);

        let secondMePromise = batchClient.get("/me");
        let secondGroupPromise = batchClient.get("/me/groups");

        let me = await mePromise;
        let group = await groupPromise;

        let secondMe = await secondMePromise;
        let secondGroup = await secondGroupPromise;

        assert.deepEqual((await me.json()), {
            displayName: "Test User"
        });
        assert.deepEqual((await group.json()), {
            value: [{
                id: "Test group id"
            }]
        });
        assert.deepEqual((await secondMe.json()), {
            displayName: "Test User second batch"
        });
        assert.deepEqual((await secondGroup.json()), {
            value: [{
                id: "Test group id second batch"
            }]
        });
    });
    test("should batch get requests", async () => {
        let baseClient = {
            get: (url,  options) => {
                throw "Don't call get!"
            },
            post: (url,  options) => {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        responses: [
                            {
                                status: 200,
                                body: {
                                    displayName: "Test User"
                                },
                                id: encodeURIComponent("/me")
                            },
                            {
                                status: 404,
                                body: {
                                    error: {
                                        id: "group-error"
                                    }
                                },
                                id: encodeURIComponent("/me/groups")
                            },
                        ],
                    })
                });
            }
        }
        let batchClient = new BatchGraphClient(baseClient as any);
        let mePromise = batchClient.get("/me");
        let groupPromise = batchClient.get("/me/groups");
        let me = await mePromise;
        try {
            await groupPromise;
        }
        catch (err) {
            assert.deepEqual((await err.json()), {
                error: {
                    id: "group-error"
                }
            });
        }
        assert.deepEqual((await me.json()), {
            displayName: "Test User"
        });
    });
    test("should batch v1 request separately", async () => {
        let baseClient = {
            get: (url,  options) => {
                throw "Don't call get!"
            },
            post: (url,  options) => {
                if (url.indexOf("/v1.0/") >= 0) {
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve({
                            responses: [
                                {
                                    status: 200,
                                    body: {
                                        displayName: "Test User v1"
                                    },
                                    id: encodeURIComponent("/v1.0/me")
                                }
                            ],
                        })
                    });
                }
                else {
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve({
                            responses: [
                                {
                                    status: 200,
                                    body: {
                                        displayName: "Test User Beta"
                                    },
                                    id: encodeURIComponent("/me")
                                }
                            ],
                        })
                    })
                }
            }
        }
        let batchClient = new BatchGraphClient(baseClient as any);
        let mePromise = batchClient.get("/me");
        let meV1Promise = batchClient.get("/v1.0/me");
        Promise.all([mePromise, meV1Promise]);
        let betaMe = await (await mePromise).json();
        let meV1 = await (await meV1Promise).json();

        assert.equal(meV1.displayName, "Test User v1");
        assert.equal(betaMe.displayName, "Test User Beta");
    });
    test("should batch v1 request separately (different resources)", async () => {
        let baseClient = {
            get: (url,  options) => {
                throw "Don't call get!"
            },
            post: (url,  options) => {
                if (url.indexOf("/v1.0/") >= 0) {
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve({
                            responses: [
                                {
                                    status: 200,
                                    body: {
                                        displayName: "Test User v1"
                                    },
                                    id: encodeURIComponent("/v1.0/some-other-resource")
                                }
                            ],
                        })
                    });
                }
                else {
                    return Promise.resolve({
                        ok: true,
                        json: () => Promise.resolve({
                            responses: [
                                {
                                    status: 200,
                                    body: {
                                        displayName: "Test User Beta"
                                    },
                                    id: encodeURIComponent("/me")
                                }
                            ],
                        })
                    })
                }
            }
        }
        let batchClient = new BatchGraphClient(baseClient as any);
        let mePromise = batchClient.get("/me");
        let meV1Promise = batchClient.get("/v1.0/some-other-resource");
        Promise.all([mePromise, meV1Promise]);
        let betaMe = await (await mePromise).json();
        let meV1 = await (await meV1Promise).json();

        assert.equal(meV1.displayName, "Test User v1");
        assert.equal(betaMe.displayName, "Test User Beta");
    });
    test("should retry single request", async () => {
        let baseClient = {
            get: (url,  options) => {
                throw "Don't call get!"
            },
            post: (url,  options) => {
                return {}
            }
        }
        jest.spyOn(baseClient, 'post').mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 429,
                        body: {
                            displayName: "Test User"
                        },
                        id: encodeURIComponent("/me")
                    },
                    {
                        status: 200,
                        body: {
                            value: [{
                                id: "Test group id"
                            }]
                        },
                        id: encodeURIComponent("/me/groups")
                    },
                ],
            })
        }));
        jest.spyOn(baseClient, 'post').mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 200,
                        body: {
                            displayName: "Test User"
                        },
                        id: encodeURIComponent("/me")
                    }
                ],
            })
        }));
        let batchClient = new BatchGraphClient(baseClient as any);

        let mePromise = batchClient.get("/me");
        let groupPromise = batchClient.get("/me/groups");
        let me = await mePromise;
        let group = await groupPromise;
        assert.deepEqual((await me.json()), {
            displayName: "Test User"
        });
        assert.deepEqual((await group.json()), {
            value: [{
                id: "Test group id"
            }]
        });
    });
    test("should retry single request to v1", async () => {
        let baseClient = {
            get: (url,  options) => {
                throw "Don't call get!"
            },
            post: (url,  options) => {
                return {}
            }
        }
        jest.spyOn(baseClient, 'post').mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 200,
                        body: {
                            value: [{
                                id: "Test group id"
                            }]
                        },
                        id: encodeURIComponent("/me/groups")
                    },
                ],
            })
        }));
        jest.spyOn(baseClient, 'post').mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 429,
                        body: {
                            error: "Throttle"
                        },
                        id: encodeURIComponent("/v1.0/me")
                    }
                ],
            })
        }));
        jest.spyOn(baseClient, 'post').mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 200,
                        body: {
                            displayName: "Test User"
                        },
                        id: encodeURIComponent("/v1.0/me")
                    }
                ],
            })
        }));
        let batchClient = new BatchGraphClient(baseClient as any);

        let mePromise = batchClient.get("/v1.0/me");
        let groupPromise = batchClient.get("/me/groups");
        let me = await mePromise;
        let group = await groupPromise;
        assert.deepEqual((await me.json()), {
            displayName: "Test User"
        });
        assert.deepEqual((await group.json()), {
            value: [{
                id: "Test group id"
            }]
        });
    });
    test("should retry 5 times and error request", async () => {
        let baseClient = {
            get: (url,  options) => {
                throw "Don't call get!"
            },
            post: (url,  options) => {
                return {}
            }
        }

        const throttlePromise = Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 429,
                        body: {
                            error: "Throttle"
                        },
                        id: encodeURIComponent("/me")
                    }
                ],
            })
        })

        jest.spyOn(baseClient, 'post').mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 429,
                        body: {
                            error: "Throttle"
                        },
                        id: encodeURIComponent("/me")
                    },
                    {
                        status: 200,
                        body: {
                            value: [{
                                id: "Test group id"
                            }]
                        },
                        id: encodeURIComponent("/me/groups")
                    },
                ],
            })
        })).mockReturnValueOnce(throttlePromise)
            .mockReturnValueOnce(throttlePromise)
            .mockReturnValueOnce(throttlePromise)
            .mockReturnValueOnce(throttlePromise)
            .mockReturnValueOnce(throttlePromise)
        const batchHandlerSpy = jest.spyOn(BatchHandler.prototype, "executeBatch")
        let batchClient = new BatchGraphClient(baseClient as any);

        let mePromise = batchClient.get("/me");
        let groupPromise = batchClient.get("/me/groups");
        let me = await mePromise;
        let group = await groupPromise;

        expect(batchHandlerSpy).toBeCalledTimes(6);
        assert.isFalse(me.ok);
        assert.deepEqual((await group.json()), {
            value: [{
                id: "Test group id"
            }]
        });

        batchHandlerSpy.mockClear();
    });
    test("should retry 5 times and error request (next request should work)", async () => {
        let baseClient = {
            get: (url,  options) => {
                throw "Don't call get!"
            },
            post: (url,  options) => {
                return {}
            }
        }

        const throttlePromise = Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 429,
                        body: {
                            error: "Throttle"
                        },
                        id: encodeURIComponent("/me")
                    }
                ],
            })
        });

        jest.spyOn(baseClient, 'post').mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 429,
                        body: {
                            error: "Throttle"
                        },
                        id: encodeURIComponent("/me")
                    },
                    {
                        status: 200,
                        body: {
                            value: [{
                                id: "Test group id"
                            }]
                        },
                        id: encodeURIComponent("/me/groups")
                    },
                ],
            })
        })).mockReturnValueOnce(throttlePromise)
            .mockReturnValueOnce(throttlePromise)
            .mockReturnValueOnce(throttlePromise)
            .mockReturnValueOnce(throttlePromise)
            .mockReturnValueOnce(throttlePromise)
            .mockReturnValueOnce(Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    responses: [
                        {
                            body: {
                                displayName: "Test User"
                            },
                            status: 200,
                            id: encodeURIComponent("/me")
                        },
                        {
                            status: 200,
                            body: {
                                value: [{
                                    id: "Test group id"
                                }]
                            },
                            id: encodeURIComponent("/me/groups")
                        },
                    ],
                })
            }));
        const batchHandlerSpy = jest.spyOn(BatchHandler.prototype, "executeBatch")

        let batchClient = new BatchGraphClient(baseClient as any);

        let mePromise = batchClient.get("/me");
        let groupPromise = batchClient.get("/me/groups");
        let me = await mePromise;
        let group = await groupPromise;

        expect(batchHandlerSpy).toBeCalledTimes(6);
        assert.isFalse(me.ok);
        assert.deepEqual((await group.json()), {
            value: [{
                id: "Test group id"
            }]
        });
        mePromise = batchClient.get("/me");
        groupPromise = batchClient.get("/me/groups");
        me = await mePromise;
        group = await groupPromise;
        assert.isTrue(me.ok);

        assert.deepEqual((await me.json()), {
            displayName: "Test User"
        });
        assert.deepEqual((await group.json()), {
            value: [{
                id: "Test group id"
            }]
        });
    });
    test("should retry and concurrent request should be called", async () => {
        let baseClient = {
            get: (url,  options) => {
                throw "Don't call get!"
            },
            post: (url,  options) => {
                return {}
            }
        }
        const throttlePromise = Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 429,
                        body: {
                            error: "Throttle"
                        },
                        id: encodeURIComponent("/me")
                    }
                ],
            })
        });
        //So...the first request should be throttled
        jest.spyOn(baseClient, 'post').mockReturnValueOnce(throttlePromise);
        //The first retry will occur before we call concurrent request, to make sure retry batch will not be overridden
        jest.spyOn(baseClient, 'post').mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 200,
                        body: {
                            displayName: "Test User"
                        },
                        id: encodeURIComponent("/me")
                    }
                ],
            })
        }));
        //The concurrent request should be resolved with this response
        jest.spyOn(baseClient, 'post').mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 200,
                        body: {
                            displayName: "Test User (concurrent)"
                        },
                        id: encodeURIComponent("/me-concurrent")
                    }
                ],
            })
        }));
        let batchClient = new BatchGraphClient(baseClient as any, 10);
        //request throttled endpoint
        let throttledPromise = batchClient.get("/me");
        //wait 12 milliseconds to be sure retry batch is constructed
        await TestingUtilities.sleep(12);
        //then request another 
        let concurrentRequest = batchClient.get("/me-concurrent");

        let meResponse = await throttledPromise;
        let concurrentMeResponse = await concurrentRequest;

        assert.equal((await meResponse.json()).displayName, "Test User");
        assert.equal((await concurrentMeResponse.json()).displayName, "Test User (concurrent)");
    });
    test("should split bigger batch to subsequent requests", async () => {
        let baseClient = {
            get: (url,  options) => {
                throw "Don't call get!"
            },
            post: (url,  options) => {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        responses: [
                        ],
                    })
                });
            }
        }

        jest.spyOn(baseClient, "post").mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 200,
                        body: {
                            displayName: "Test User"
                        },
                        id: encodeURIComponent("/me")
                    },
                    {
                        status: 200,
                        body: {
                            value: [{
                                id: "Test group id"
                            }]
                        },
                        id: encodeURIComponent("/me/groups")
                    }
                ],
            })
        }));
        jest.spyOn(baseClient, "post").mockReturnValueOnce(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                responses: [
                    {
                        status: 200,
                        body: {
                            displayName: "Test User 2"
                        },
                        id: encodeURIComponent("/me2")
                    },
                    {
                        status: 200,
                        body: {
                            value: [{
                                id: "Test group id 2"
                            }]
                        },
                        id: encodeURIComponent("/me/groups2")
                    }
                ],
            })
        }));
        let batchClient = new BatchGraphClient(baseClient as any);
        batchClient.batchSplitThreshold = 2;
        let mePromise = batchClient.get("/me");
        let groupPromise = batchClient.get("/me/groups");
        let mePromise2 = batchClient.get("/me2");
        let groupPromise2 = batchClient.get("/me/groups2");
        let me = await mePromise;
        let group = await groupPromise;
        let me2 = await mePromise2;
        let group2 = await groupPromise2;
        assert.deepEqual((await me.json()), {
            displayName: "Test User"
        });
        assert.deepEqual((await group.json()), {
            value: [{
                id: "Test group id"
            }]
        });
        assert.deepEqual((await me2.json()), {
            displayName: "Test User 2"
        });
        assert.deepEqual((await group2.json()), {
            value: [{
                id: "Test group id 2"
            }]
        });
    });
});
				