import { sp } from "@pnp/sp";
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

  constructor(
    context: WebPartContext,
    resourcesListName: string = "HotDeskResources",
    bookingsListName: string = "HotDeskBookings"
  ) {
    this.context = context;
    this.resourcesListName = resourcesListName;
    this.bookingsListName = bookingsListName;
  }

  public async getResources(): Promise<IResource[]> {
    try {
      const items = await sp.web.lists
        .getByTitle(this.resourcesListName)
        .items.select("ID", "Title", "ResourceType", "Location", "Description", "IsActive")
        .filter("IsActive eq true")
        .get();

      return items.map((item: any) => ({
        id: item.ID.toString(),
        title: item.Title,
        resourceType: item.ResourceType || "",
        location: item.Location || "",
        description: item.Description || "",
        isActive: item.IsActive
      }));
    } catch (error) {
      console.error("Error fetching resources:", error);
      throw error;
    }
  }

  public async getMyBookings(): Promise<IBooking[]> {
    try {
      const userId = this.context.pageContext.legacyPageContext.userId;
      const items = await sp.web.lists
        .getByTitle(this.bookingsListName)
        .items.select("ID", "Title", "BookingDate", "Notes", "Resource/ID", "Resource/Title", "Resource/ResourceType", "Resource/Location")
        .expand("Resource")
        .filter(\`BookedById eq \${userId}\`)
        .orderBy("BookingDate", false)
        .get();

      return items.map((item: any) => ({
        id: item.ID.toString(),
        title: item.Title,
        resource: item.Resource
          ? {
              id: item.Resource.ID.toString(),
              title: item.Resource.Title,
              resourceType: item.Resource.ResourceType,
              location: item.Resource.Location,
              description: "",
              isActive: true
            }
          : null,
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
      const dateStr = date.toISOString().split("T")[0];
      const items = await sp.web.lists
        .getByTitle(this.bookingsListName)
        .items.select("ID")
        .filter(\`ResourceId eq \${resource.id} and BookingDate eq datetime'\${dateStr}'\`)
        .get();

      return items.length > 0;
    } catch (error) {
      console.error("Error checking conflict:", error);
      return false;
    }
  }

  public async addBooking(resource: IResource, date: Date, notes: string): Promise<void> {
    try {
      const hasConflict = await this.checkConflict(resource, date);
      if (hasConflict) {
        throw new Error("This resource is already booked for the selected date.");
      }

      const dateStr = date.toISOString().split("T")[0];
      const title = \`\${resource.title} – \${dateStr}\`;

      await sp.web.lists.getByTitle(this.bookingsListName).items.add({
        Title: title,
        BookingDate: date,
        Notes: notes,
        ResourceId: resource.id
      });
    } catch (error) {
      console.error("Error adding booking:", error);
      throw error;
    }
  }

  public async cancelBooking(bookingId: string): Promise<void> {
    try {
      await sp.web.lists
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
      const dateStr = date.toISOString().split("T")[0];
      const items = await sp.web.lists
        .getByTitle(this.bookingsListName)
        .items.select("ID", "Title", "BookingDate", "Notes", "Resource/ID", "Resource/Title")
        .expand("Resource")
        .filter(\`BookingDate eq datetime'\${dateStr}'\`)
        .get();

      return items.map((item: any) => ({
        id: item.ID.toString(),
        title: item.Title,
        resource: item.Resource
          ? {
              id: item.Resource.ID.toString(),
              title: item.Resource.Title,
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
}
