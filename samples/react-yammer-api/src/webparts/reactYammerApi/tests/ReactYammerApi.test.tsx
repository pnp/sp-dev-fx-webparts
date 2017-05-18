/// <reference types="mocha" />
/// <reference types="sinon" />

import * as React from 'react';
import { assert, expect } from 'chai';
import { mount } from 'enzyme';
import ReactYammerApi from '../components/ReactYammerApi';

import { IConfiguration } from '../yammer/IConfiguration';
import { IYammerProvider } from '../yammer/IYammerProvider';
import YammerProvider from '../yammer/YammerProvider';
import { SearchResult } from '../yammer/SearchResult';

declare const sinon: any;

describe("ReactYammerApiWebPart:", () => {
    let componentDidMountSpy: any;
    let yammerComponent: any;
    let yammerProvider: IYammerProvider;
    let componentSearchMethodSpy: any;
    let componentSearchButtonHandlerSpy: any;
    let componentSearchInputHandlerSpy: any;
    let yammerProviderLoginButtonStub: any;
    let yammerProviderGetLoginStatusStub: any;
    let yammerProviderSearchStub: any;

    // define fake data.
    let fakeDefaultSearchQuery: string = "#joined";
    let fakeConfig: IConfiguration = { clientId: "fakeId", redirectUri: "fakeUri" } as IConfiguration;
    let fakeStrings: { SearchLabel: string } = { SearchLabel: "fakeSearchLabel" };
    let fakeSearchResults: Array<SearchResult> = [{ id: 1, url: "fakeUrl", text: "fakeText" }] as Array<SearchResult>;

    before(() => {
        // set object stubs of the Yammer config and provider classes.
        let configStub: IConfiguration = sinon.stub(fakeConfig);

        // stub the fake strings.
        let stringsStub: any = sinon.stub(fakeStrings);

        // fake Yammer provider methods.
        let searchResults: Array<SearchResult> = sinon.stub(fakeSearchResults);

        yammerProviderSearchStub = sinon.stub(YammerProvider.prototype, "search");
        yammerProviderSearchStub.returns(new Promise((resolve, reject) => resolve(searchResults)));

        sinon.stub(YammerProvider.prototype, "loadSdk").returns(new Promise((resolve, reject) => resolve()));

        yammerProviderGetLoginStatusStub = sinon.stub(YammerProvider.prototype, "getLoginStatus");
        yammerProviderGetLoginStatusStub.returns(new Promise((resolve, reject) => resolve({})));

        yammerProviderLoginButtonStub = sinon.stub(YammerProvider.prototype, "loginButton");
        yammerProviderLoginButtonStub.returns(new Promise((resolve, reject) => resolve({})));

        // init the Yammer provider.
        yammerProvider = new YammerProvider(configStub);

        // set spies on the Yammer Component methods. Should be added before mount.
        componentSearchMethodSpy = sinon.spy(ReactYammerApi.prototype, "_search");
        componentSearchButtonHandlerSpy = sinon.spy(ReactYammerApi.prototype, "_handleSearch");
        componentSearchInputHandlerSpy = sinon.spy(ReactYammerApi.prototype, "_handleInputChange");
        componentDidMountSpy = sinon.spy(ReactYammerApi.prototype, "componentDidMount");

        // mount the component.
        yammerComponent =
            mount(<ReactYammerApi defaultSearchQuery={fakeDefaultSearchQuery} yammer={yammerProvider} strings={stringsStub} />);
    });

    after(() => {
        componentDidMountSpy.restore();
        componentSearchButtonHandlerSpy.restore();
        componentSearchInputHandlerSpy.restore();
        componentSearchMethodSpy.restore();
    });

    it("Should call componentDidMount only once", () => {
        // check if the componentDidMount is called once.
        expect(componentDidMountSpy.calledOnce).to.be.true;
    });

    it("Should render title", () => {
        // check if the correct hreader is present.
        expect(yammerComponent.find("h1").text()).to.be.equals(`Yammer ${fakeStrings.SearchLabel}`);
    });

    it("Should have one 'code' element displayed", () => {
        // check if only one HTML code element is present on render.
        expect(yammerComponent.find("code").length).to.be.equals(1);
    });

    it("Should not display 'pre' elements when initialy loaded", () => {
        expect(yammerComponent.find("pre").length).to.be.equals(0);
    });

    it("Should have correct initial defaultSearchQuery property", () => {
        expect(yammerComponent.props().defaultSearchQuery).to.be.equals(fakeDefaultSearchQuery);
    });

    it("Should not call yammer button since logged in", () => {
        expect(yammerProviderLoginButtonStub.called).to.be.false;
    });

    it("Should call component _search", (done) => {
        setTimeout(() => {
            expect(componentSearchMethodSpy.calledOnce).to.be.true;
            done();
        }, 50);
    });

    it("Should call yammer search after component _search", (done) => {
        setTimeout(() => {
            expect(yammerProviderSearchStub.calledOnce).to.be.true;
            expect(yammerProviderSearchStub.calledAfter(componentSearchMethodSpy)).to.be.true;
            done();
        }, 50);
    });

    it("Should load one search result", (done) => {
        setTimeout(() => {
            let l: number = yammerComponent.state("searchResults").length;
            expect(l).to.be.equals(1);
            done();
        }, 50);
    });

    it("Should load search result with correct data", (done) => {
        setTimeout(() => {
            let results: Array<SearchResult> = yammerComponent.state("searchResults");
            if (results.length === 0) {
                assert.fail();
            } else {
                expect(results[0].id).to.be.equals(fakeSearchResults[0].id);
                expect(results[0].url).to.be.equals(fakeSearchResults[0].url);
                expect(results[0].text).to.be.equals(fakeSearchResults[0].text);
            }
            done();
        }, 50);
    });

    it("Should call the button click handler", () => {
        yammerComponent.find("#SearchButton").simulate("click");
        expect(componentSearchButtonHandlerSpy.calledOnce).to.be.true;
        expect(componentSearchMethodSpy.calledTwice).to.be.true;
        expect(componentSearchMethodSpy.calledAfter(componentSearchButtonHandlerSpy)).to.be.true;
    });

    it("Should call the input change handler", () => {
        yammerComponent.find(".search-box input").simulate("change");
        expect(componentSearchInputHandlerSpy.called).to.be.true;
        expect(componentSearchInputHandlerSpy.getCalls(0)[0].args[0]).to.be.equals("#joined");
    });

    it("Should call login button if not logged in", (done) => {
        // change get login status to rejected promise.
        yammerProviderGetLoginStatusStub.returns(new Promise((resolve, reject) => reject({})));

        // mount the component to simulate getLoginStatus failure.
        mount(<ReactYammerApi defaultSearchQuery={fakeDefaultSearchQuery} yammer={yammerProvider} strings={sinon.stub(fakeStrings)} />);

        setTimeout(() => {
            expect(yammerProviderLoginButtonStub.calledOnce).to.be.true;
            done();
        }, 50);
    });
});