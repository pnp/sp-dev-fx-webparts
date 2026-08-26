import { spfi, SPFI } from "@pnp/sp";
import { SPFx } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IResource } from "../models/IResource";
import { IBooking } from "../models/IBooking";

export class BookingService {
  private resourcesListName: string;
  private bookingsListName: string;
  private context: WebPartContext;
  private sp: SPFI;

  constructor(
    context: WebPartContext,
    resourcesListName: string = "HotDeskResources",
    bookingsListName: string = "HotDeskBookings"
  ) {
    this.context = context;
    this.resourcesListName = resourcesListName;
    this.bookingsListName = bookingsListName;
    this.sp = spfi().using(SPFx(context));
  }

  public async getResources(): Promise<IResource[]> {
    try {
      const items = await this.sp.web.lists
        .getByTitle(this.resourcesListName)
        .items.select("ID", "Title", "ResourceType", "Location", "Description", "IsActive")
        .filter("IsActive eq 1")();

      return items.map((item: any) => this._mapToResource(item));
    } catch (error) {
      console.error("Error fetching resources:", error);
      throw error;
    }
  }

  public async getMyBookings(): Promise<IBooking[]> {
    try {
      const userId = this.context.pageContext.legacyPageContext.userId;
      const [items, resources] = await Promise.all([
        this.sp.web.lists
          .getByTitle(this.bookingsListName)
          .items.select("ID", "Title", "BookingDate", "Notes", "ResourceId")
          .filter(`BookedById eq ${userId}`)
          .orderBy("BookingDate", false)(),
        this.getResources()
      ]);

      const resourceMap = new Map(resources.map((r) => [r.id, r]));
      return items.map((item: any) => ({
        id: item.ID.toString(),
        title: item.Title,
        resource: item.ResourceId ? (resourceMap.get(item.ResourceId.toString()) ?? null) : null,
        bookingDate: new Date(item.BookingDate),
        bookedBy: "",
        notes: item.Notes || ""
      }));
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  }

  public async checkConflict(resource: IResource, date: Date): Promise<boolean> {
    try {
      const { startIso, endIso } = this._dayRange(date);
      const items = await this.sp.web.lists
        .getByTitle(this.bookingsListName)
        .items.select("ID")
        .filter(`ResourceId eq '${resource.id}' and BookingDate ge datetime'${startIso}' and BookingDate lt datetime'${endIso}'`)();

      return items.length > 0;
    } catch (error) {
      console.error("Error checking conflict:", error);
      throw new Error("Could not verify availability. Please try again.");
    }
  }

  public async addBooking(resource: IResource, date: Date, notes: string): Promise<void> {
    try {
      const hasConflict = await this.checkConflict(resource, date);
      if (hasConflict) {
        throw new Error("This resource is already booked for the selected date.");
      }

      const dateStr = date.toISOString().split("T")[0];
      const title = `${resource.title} - ${dateStr}`;
      const webUrl = this.context.pageContext.web.absoluteUrl;

      await this.sp.web.lists.getByTitle(this.bookingsListName).items.add({
        Title: title,
        BookingDate: date,
        Notes: notes,
        ResourceId: resource.id,
        "Resource@odata.bind": `${webUrl}/_api/web/lists/getByTitle('${this.resourcesListName}')/items(${parseInt(resource.id, 10)})`,
        BookedById: this.context.pageContext.legacyPageContext.userId
      });
    } catch (error) {
      console.error("Error adding booking:", error);
      throw error;
    }
  }

  public async cancelBooking(bookingId: string): Promise<void> {
    try {
      await this.sp.web.lists
        .getByTitle(this.bookingsListName)
        .items.getById(parseInt(bookingId, 10))
        .delete();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw error;
    }
  }

  public async getBookingsForDate(date: Date): Promise<IBooking[]> {
    try {
      const { startIso, endIso } = this._dayRange(date);
      const items = await this.sp.web.lists
        .getByTitle(this.bookingsListName)
        .items.select("ID", "Title", "BookingDate", "Notes", "ResourceId")
        .filter(`BookingDate ge datetime'${startIso}' and BookingDate lt datetime'${endIso}'`)();

      return items.map((item: any) => ({
        id: item.ID.toString(),
        title: item.Title,
                resource: item.ResourceId
          ? {
              id: item.ResourceId.toString(),
              title: "",
              resourceType: "",
              location: "",
              description: "",
              isActive: true
            }
          : null,
        bookingDate: new Date(item.BookingDate),
        bookedBy: "",
        notes: item.Notes || ""
      }));
    } catch (error) {
      console.error("Error fetching bookings for date:", error);
      throw error;
    }
  }

  private _mapToResource(raw: any): IResource {
    return {
      id: raw.ID.toString(),
      title: raw.Title,
      resourceType: raw.ResourceType || "",
      location: raw.Location || "",
      description: raw.Description || "",
      isActive: raw.IsActive !== undefined ? raw.IsActive : true
    };
  }

  private _dayRange(date: Date): { startIso: string; endIso: string } {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    return {
      startIso: start.toISOString(),
      endIso: end.toISOString()
    };
  }
}

