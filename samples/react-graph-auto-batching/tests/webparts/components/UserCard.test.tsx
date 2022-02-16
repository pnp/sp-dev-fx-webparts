///<reference types="jest" />
import * as React from "react";
import { RenderResult, render, act } from "@testing-library/react";
import { assert } from "chai";
import { UserCard } from "../../../src/webparts/graphAutoBatching/components/UserCard";

describe("<UserCard />", () => {
    test("should render user with presence", async ()=>{
        let graphClient = {
            get: async (url: string)=>Promise.resolve({})   
        };

        jest.spyOn(graphClient, "get").mockReturnValueOnce(Promise.resolve({
            status: 200,
            ok: true,
            json: ()=>Promise.resolve({
                displayName: "Marcin Wojciechowski",
                jobTitle: "Senior Software Engineer",
            })
        }));
        jest.spyOn(graphClient, "get").mockReturnValueOnce(Promise.resolve({
            status: 200,
            ok: true,
            text: ()=>Promise.resolve(`"someEncodedContent"`)
        }));
        jest.spyOn(graphClient, "get").mockReturnValueOnce(Promise.resolve({
            status: 200,
            ok: true,
            json: ()=>Promise.resolve({
                availability: "Available"
            })
        }))

        let userCard: RenderResult;
        await act(async ()=>{
            userCard = render(<UserCard graphClient={graphClient as any} userQuery={"/me"} />);
        });
        const displayNameDiv = userCard.getByText("Marcin Wojciechowski");
        assert.isNotNull(displayNameDiv);
        
        const presenceDiv = userCard.getByText("Available");
        assert.isNotNull(presenceDiv);
    });
});