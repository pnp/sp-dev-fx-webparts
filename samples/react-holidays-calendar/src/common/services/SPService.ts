import { SPFI, spfi, SPFx as spSPFx } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/site-groups";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import "@pnp/sp/site-users/web";

export class SPService {
	private sp: SPFI;
	constructor(context: any) {
		this.sp = spfi().using(spSPFx(context));
	}

	public getListItems = async (
		listTitle: string,
		filter: string = "",
		columns: string = "*",
		expand: string = "",
		orderby?: string,
		orderSequence?: boolean
	): Promise<any> => {
		let items: any = [];
		try {
			if (!orderby) {
				items = await this.sp.web.lists.getByTitle(listTitle).items.select(columns).filter(filter).expand(expand).top(5000)();
			} else {
				return await this.sp.web.lists.getByTitle(listTitle).items.select(columns).orderBy(orderby, orderSequence).filter(filter).expand(expand).top(5000)();
			}
			return Promise.resolve(items);
		} catch (ex) {
			return Promise.reject(ex);
		}
	};

	public getSharePointGroupDetails = async (groupTitle: string): Promise<any> => {
		try {
			const response = await this.sp.web.siteGroups.getByName(groupTitle)();
			return Promise.resolve(response);
		} catch (ex) {
			return Promise.reject(ex);
		}
	};

	public getUserDetails = async (userId: number): Promise<any> => {
		try {
			const response = await this.sp.web.getUserById(userId)();
			return Promise.resolve(response);
		} catch (ex) {
			return Promise.reject(ex);
		}
	};

	public ensureUser = async (loginName: string): Promise<any> => {
		if (loginName.indexOf("i:0#.f|membership|") === -1) {
			loginName = "i:0#.f|membership|" + loginName;
		}

		try {
			const response = await (await this.sp.web.ensureUser(loginName)).user();
			return Promise.resolve(response);
		} catch (ex) {
			return Promise.reject(ex);
		}
	};
}
