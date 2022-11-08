///<reference types="jest" />
import { PostInTeamsAction } from "../../../../src/manager/viewManager/viewActions/PostInTeamsAction";
describe("PostInTeamsAction", () => {
	test("should load teams to state", async () => {
		let mockTeams = [{
			id: "1",
			displayName: "team1"
		}, {
			id: "2",
			displayName: "team2"
		}, {
			id: "3",
			displayName: "team3"
		}];
		let mockManager = {
			getJoinedTeams: () => Promise.resolve(mockTeams)
		}
		let actionHandler = new PostInTeamsAction(mockManager as any);
		let quickView = {
			setState: jest.fn(),
			state: {}
		}
		let action = {
			id: "loadTeams"
		}

		let spy = jest.spyOn(quickView, "setState");
		await actionHandler.handleAction(action, quickView as any);
		expect(spy).toBeCalledWith({ joinedTeams: mockTeams, showTeams: true });
	});
	
	test("should load channels to state", async () => {
		let mockChannels = [{
			id: "1",
			displayName: "team1"
		}, {
			id: "2",
			displayName: "team2"
		}, {
			id: "3",
			displayName: "team3"
		}];
		let mockManager = {
			getChannels: () => Promise.resolve(mockChannels)
		}
		let actionHandler = new PostInTeamsAction(mockManager as any);
		let quickView = {
			setState: jest.fn(),
			state: {}
		}
		let action = {
			id: "showSelectChannel",
			data:{
				selectTeamsDD: "1"
			}
		}

		let spy = jest.spyOn(quickView, "setState");
		await actionHandler.handleAction(action, quickView as any);
		expect(spy).toBeCalledWith({ selectedTeamChannels: mockChannels, showChannels: true, selectedTeamId: "1" });
	});
	test("should post to selected channel", async () => {
		let mockManager = {
			shareNews: () => Promise.resolve()
		}
		let actionHandler = new PostInTeamsAction(mockManager as any);
		let newsToShare = {
			id: "test-news-1",
		};
		let quickView = {
			setState: jest.fn(),
			state: {
				selectedTeamId: "1",
				selectedNewsIndex: 0,
				news:[newsToShare]
			}
		}
		let action = {
			id: "shareInSelectedChannel",
			data:{
				selectChannelDD: "2"
			}
		}

		let spy = jest.spyOn(mockManager, "shareNews");
		await actionHandler.handleAction(action, quickView as any);
		expect(spy).toBeCalledWith(newsToShare, "1", "2");
	});
});
