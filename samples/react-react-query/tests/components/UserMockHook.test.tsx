/// <reference types="jest" />
import * as React from "react";
import { User } from "../../src/components/User"
import { render, act, RenderResult } from "@testing-library/react";
import { UseQueryResult } from "react-query";

let userQueryMock: UseQueryResult<any>;
jest.mock("../../src/queries/SampleQueries", () => {
    return {
        useUserQuery: jest.fn(() => (userQueryMock))
    }
})

describe("<User /> (mocked hook)", () => {
    test("should render user", async () => {
        userQueryMock = {
            isLoading: false,
            data: {
                displayName: "Test user",
                presence: { availability: "Available" },
                jobTitle: "Developer",
                photo: "mock-photo"
            },
            isError: false
        } as UseQueryResult<any>


        let userComponent: RenderResult;
        await act(async () => {
            userComponent = await render(<User />);
            let userDisplayName = await userComponent.findAllByText("Test user");
            let availability = await userComponent.findAllByText("Available");

            expect(userDisplayName.length).toBeGreaterThan(0);
            expect(availability.length).toBeGreaterThan(0);
        });
    });
})