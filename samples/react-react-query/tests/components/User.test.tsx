/// <reference types="jest" />
import * as React from "react";
import { User } from "../../src/components/User"
import { ContextProvider } from "../../src/infrastructure/ContextProvider";
import { render, act, RenderResult } from "@testing-library/react";

describe("<User />", () => {
    test("should render user", async () => {
        let graphClient = {
            get: () => Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
                text: () => Promise.resolve("")
            })
        }
        //@ts-ignore
        jest.spyOn(graphClient, "get").mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ displayName: "Test user", jobTitle: "Developer" })
        });
        //@ts-ignore
        jest.spyOn(graphClient, "get").mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve("")
        });
        //@ts-ignore
        jest.spyOn(graphClient, "get").mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ availability: "Available" })
        });
        let context = ContextProvider({
            children: <User />,
            graphClient: graphClient as any,
        });
        let contextComponent: RenderResult;
        await act(async () => {
            contextComponent = await render(context);
            let userDisplayName = await contextComponent.findAllByText("Test user");
            let availability = await contextComponent.findAllByText("Available");

            expect(userDisplayName.length).toBeGreaterThan(0);
            expect(availability.length).toBeGreaterThan(0);
        });
    });
})