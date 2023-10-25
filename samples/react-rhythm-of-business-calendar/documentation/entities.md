# Entities

Entities are the implementation of a rich domain model for your application, inspired by the Domain-Driven Design approach to software development.  Entities live in the [model](../src/model/) folder in the solution.

All entities have the following features:
* Change tracking (hasChanges, isNew, isDeleted, allowGhosting)
* States (current, snapshot, and previous)
* Relationships (one-to-many and many-to-many)
* Text search
* Validation
* Filtering and sorting functions

All entities derive from the `Entity` class in `common`.

SharePoint list item entities have the following additional functionality:
* Title
* Author/Editor user
* Created/Modified timestamp

SharePoint list item entities derive from the `ListItemEntity` class found in `common/sharepoint`.

## Defining an entity
The essential parts of an entity are the class that derives from `Entity`, a state interface, and the constructor.

Here is an example of a SharePoint list item entity representing an item in a list called Categories.  Note that the Title field is already defined in the `ListItemEntity` base class.

```
import { User } from 'common';
import { ListItemEntity } from 'common/sharepoint';

interface IState {
    order: number;
    owners: User[];
    // ... any other properties - these typically correspond with fields on the SharePoint list
}

export class Category extends ListItemEntity<IState> {
    // The constructor for a list item entity must specify these parameters
    constructor(author?: User, editor?: User, created?: Moment, modified?: Moment, id?: number, uniqueId?: Guid, etag?: number) {
        super(author, editor, created, modified, id, uniqueId, etag);

        // Each property in IState needs to be initialized here
        // If there's no other default value for your domain, then good options are 0 for numbers,
        // empty string ('') for strings, and an empty array ([]) for array types.
        this.state.order = 0;
        this.state.owners = [];
    }

    // Define a getter/setter for each field
    public get order(): number { return this.state.order; }
    public set order(val: number) { this.state.order = val; }
    
    public get owners(): User[] { return this.state.owners; }
    public set owners(val: User[]) { this.state.owners = val; }
}
```

Entity state supports all primitive types (string, number, boolean), plus Set, Map, our User class, Moment and Duration, Guid (from '@microsoft/sp-core-library'), custom objects, and arrays of any of the preceeding types.

If you want store an immutable object in state [example](../src/model/EventModerationStatus.ts), make sure that the immutable class implements a clone() method that simply returns itself:
```
public clone(): this {
    return this;
}
```

## Validation
The `valid()` function runs each of the rules on the entity and returns true only if all rules succeed.

Let's extend the previous example to define validations for the `owners` field.  This will indicate that the user must specify at least one owner and at most 5 owners for the category.

```
import { User, ValidationRule, RequiredValidationRule, MaxItemsValidationRule } from 'common';

...

export class Category extends ListItemEntity<IState> {
    // Define a custom property that specifies the validation rules for the owners field.
    // This is useful so that these rules can be easily passed to the Validation component on an edit screen.
    public static readonly OwnersValidations = [
        new RequiredValidationRule<Category>(e => e.owners),
        new MaxItemsValidationRule<Category>(e => e.owners, 5)
    ];

    ...

    // Override the validationRules function to return the validations for all of this entity's fields
    protected validationRules(): ValidationRule<Category>[] {
        return [
            ...Category.OwnersValidations,
            // other validation rules
        ];
    }
}
```

The common library includes the following validation rules ready to use:
Rule|Description
---|---
RequiredValidationRule|The field cannot be undefined/null, 0, an empty string, or a zero-length array
MinValueValidationRule|If the number field has a value, it must have a value greater than or equal to the provided min value
MaxValueValidationRule|If the number field has a value, it must have a value less than or equal to the provided max value
RangeValueValidationRule|Combines the Min/Max rules into a single range rule
MaxLengthValidationRule|The string value of the field must be less than or equal to the provided max value
MaxItemsValidationRule|The number of items in an array field must be  less than or equal to the provided max value
UrlValidationRule|If the string field has a value, it must be a valid URL format
EmailValidationRule|If the string field has a value, it must be a valid e-mail address format

To define your own custom validation rule, simply derive a class from `ValidationRule`.  Some examples can be found in [Validations.ts](../src/model/Validations.ts).

## Display name property
The `displayName` property is intended to be a general text string representation of the entity that can be rendered in the UI if desired.  The property is abstract on the `Entity` base class, however the `ListItemEntity` base class overrides it to simply return the value of the `title` property (the built-in property that represents the Title field in a SharePoint list).

You may override it to return whatever you would like.  For example:

```
export class Category extends ListItemEntity<IState> {
    ...

    // This might return a string similar to "1 - Marketing (2 owners)"
    public get displayName(): string {
        return [
            this.order && `${this.order} - `,
            this.title,
            `(${this.owners.length} owners)`
        ].filter(Boolean).join(' ');
    }

    ...
}
```

## Text search
```
export class Category extends ListItemEntity<IState> {
    ...

    protected buildSearchHelperStrings(): string[] {
        return [
            ...this.owners.map(owner => owner.title)
        ];
    }

    ...
}
```

## Filter and sort functions
The convention is to define useful filtering and sorting functions as static members of the entity class.

An example of defining sorting functions for ordering the categories:
```
export class Category extends ListItemEntity<IState> {
    public static readonly OrderAscComparer = (a: Category, b: Category) => a.order - b.order;

    ...
}
```

This can be utilized elsewhere in the app as follows:
```
const categories: Cateogory[] = ...
categories.sort(Category.OrderAscComparer);
```

An example of defining a filter function:
```
import { isEmpty } from 'lodash';
...

export class Category extends ListItemEntity<IState> {
    public static readonly HasOwnersFilter = ({ owners }: Category): boolean => !isEmpty(owners);

    ...
}
```

The filter can be utilized as follows:
```
const categories: Cateogory[] = ...
const categoriesWithOwners = categories.filter(Category.HasOwnersFilter);
```

The `multifilter` and `aggregateFilter` utility functions from `'common'` can be used to apply multiple filters.  The `multisort` and `aggregateComparer` utility functions from `'common'` can be used to achieve multi-column sorting.

## Change tracking
Entities support change tracking for their fields.  Imagine rendering an edit screen for an entity, for example editing an event on a calendar, and the user can make changes to the fields on the screen.  When the user clicks the save button, we want the ability to know if the entity has been changed to know if we need to send the updated data back to the server.  We also want to allow the user to close or cancel out of the edit screen, and if there are changes to the data we would like to pop up a confirmation dialog to be sure they want to discard those changes.  If the user chooses to discard the changes, we want to be able to revert the state of the entity back to what it was before the user opened the edit screen.

This scenario is facilitated by three functions on the Entity class: `snapshot()`, `revert()`, and `immortalize()`.

Snapshot takes a copy of the entity's current state and stores that copy in the 'snapshot state'.  The [data/entity panel/dialog/component components](./components.md) automatically call `snapshot()` when you invoked their `edit()` function and pass in an entity to edit.  

While the entity has a snapshot, the properties of the entity can be updated, for instance in response to the user interacting with controls on the screen. The `hasChanges()` function can be called to determine if there are any changes between the current state and the snapshot state.

To discard the current set of changes, call `revert()` which will overwrite the current state using the snapshot state copy.  To keep the current set of changes and reset change tracking, call `immortalize()` which will simply erase the snapshot state copy.  These functions are called automatically if utilizing [data/entity panel/dialog/component components](./components.md).

## New and ghostable
An entity is considered 'new' when it does not yet have an ID.  For SharePoint items this means an ID that is a number greater than 0.  The `isNew` property on the entity indicates this state.

In some situations, you may want to have an entity where new instances will only be persisted if the user makes explicit changes to any of it's properties.  This is accomplished by overriding the `allowGhosting` property and returning true:
```
    public get allowGhosting(): boolean {
        return true;
    }
```

By default, when an entity is new (`isNew === true`) it will also report that it has changes (`hasChanges() === true`), however when ghosting is enabled `hasChanges()` will return false unless some value in the entity's current state is different than the snapshot state.

## Delete and soft delete
Entities are marked for deletion by calling their `delete()` method.  The `isDeleted` property indicates if an entity is marked for deletion.  In the case of a SharePoint `ListItemEntity`, when the entity is persisted (saved) to SharePoint, the actual list item is deleted from the list.

If instead the desired behavior is to keep the item in the back-end storage and simply mark it as deleted ('soft delete' or 'archive'), then override the softDeleteSupported function in the entity class:
```
public get softDeleteSupported(): boolean {
    return true;
}
```
You must manage the deleted status of the entity when loading/persisting using a field in the back-end storage when choosing soft delete.  For example, provisioning a Yes/No field named "Archived" on the SharePoint list.  When persisting, use the `isDeleted` property to set the value of the "Archived" field, and when loading read the value of the "Archived" field and call `delete()` as appropriate.

## Relationships
Entities also support one-to-many and many-to-many relationships through the use of navigation properties.  The relationship classes handle all of the plumbing on both sides of the relationship so it is simple to set the parent on a child entity or add a child to a parent's collection.  Relationships may also participate in change tracking through snapshot/revert/immortalize, so it easy to discard changes to all related entities from an edit screen.

### Defining a one-to-many relationship
Let's say we also have a Meeting entity and want to create a relationship with the Category entity.  Each meeting has a category, and each category can be linked to zero, one or more meetings.  In your SharePoint list schema, you likely have a list for Categories and a list for Meetings, with the Meetings list having a lookup column that references the Categories list.

In the Meeting entity we would define the relationship like this:
```
import { IManyToOneRelationship, ManyToOneRelationship } from 'common';
import { Category } from './Category';

interface IState {
    category: Category;
}

export class Meeting extends ListItemEntity<IState> {
    constructor(author?: User, editor?: User, created?: Moment, modified?: Moment, id?: number, uniqueId?: Guid, etag?: number) {
        super(author, editor, created, modified, id, uniqueId, etag);

        ...

        this.category = new ManyToOneRelationship<Meeting, Category>.create(this, 'meetings', 'category');
    }

    public readonly category: IManyToOneRelationship<Category>;

    ...
}
```
This is the 'many-to-one' side of the relationship (many meetings to one category), so we use the `ManyToOneRelationship` class for the navigation property.  The create static function takes three parameters: the current entity (this meeting), the name of the corresponding navigation property on the parent entity ('meetings'), and the name of the field in the state object that will store the parent object ('category' field in the IState interface).  The fact that the field in state is named 'category' and the navigation property on the entity is also named 'category' is a useful convention but is not required.

In the Category entity we would define the relationship as follows:
```
import { IOneToManyRelationship, OneToManyRelationship } from 'common';
import { Meeting } from './Meeting';

export class Category extends ListItemEntity<IState> {
    constructor(author?: User, editor?: User, created?: Moment, modified?: Moment, id?: number, uniqueId?: Guid, etag?: number) {
        super(author, editor, created, modified, id, uniqueId, etag);

        ...

        this.meetings = new OneToManyRelationship<Category, Meeting>.create(this, 'category');
    }

    public readonly meetings: IOneToManyRelationship<Meeting>;

    ...
}
```
This is the 'one-to-many' side of the relationship (one category to many meetings), so we use the `OneToManyRelationship` class for the navigation property.  The static create() function needs only two parameters: the current entity (this category), and the name of the corresponding navigation property on the child entity ('category').  There is no property to add to the entity state on the Category entity because the child collection of meetings is handled internally by the OneToManyRelationship class.

We can also specify sort options as an optional third parameter to the create() function for the collection of meetings on the Category entity by passing in an object with a comparer function and a flag indicating when to perform the sort (as soon as a child entity is added to the collection, or only when the collection is immortalized).

The following code demonstrates how to use these relationships:
```
const category = new Category();
category.title = "Green";

const meeting1 = new Meeting();
meeting1.category.set(category);

const meeting2 = new Meeting();
categery.meetings.add(meeting2);

console.log(meeting1.category.get()?.title); // --> Green
console.log(category.meetings.get().length); // --> 2

category.meetings.remove(meeting1);

console.log(meeting1.category.get()); // --> null
console.log(category.meetings.get().length); // --> 1
```

### Defining a many-to-many relationship
Defining a many-to-many relationship is very similar to a one-to-many relationship.  Let's change the previous example so that meetings may have more than one category.

On the Meeting entity:
```
import { IManyToManyRelationship, ManyToManyRelationship } from 'common';
import { Category } from './Category';

export class Meeting extends ListItemEntity<IState> {
    constructor(author?: User, editor?: User, created?: Moment, modified?: Moment, id?: number, uniqueId?: Guid, etag?: number) {
        super(author, editor, created, modified, id, uniqueId, etag);

        ...

        this.categories = new ManyToManyRelationship<Meeting, Category>.create(this, 'meetings');
    }

    public readonly categories: IManyToManyRelationship<Category>;

    ...
}
```

And on the Category entity:
```
import { IManyToManyRelationship, ManyToManyRelationship } from 'common';
import { Meeting } from './Meeting';

export class Category extends ListItemEntity<IState> {
    constructor(author?: User, editor?: User, created?: Moment, modified?: Moment, id?: number, uniqueId?: Guid, etag?: number) {
        super(author, editor, created, modified, id, uniqueId, etag);

        ...

        this.meetings = new ManyToManyRelationship<Category, Meeting>.create(this, 'categories');
    }

    public readonly meetings: IManyToManyRelationship<Meeting>;

    ...
}
```

Notice that there is no state property on either entity because the relationship objects manage the collections internally on both sides of the relationship.  Sorting options are also available for both sides of a many-to-many relationship.

### Bounded context
Often times there is a very close relationship between entities, and changes the user makes to a set of related entities should be tracked together, committed together, or reverted together.  For example, in the Rhythm of Business Calendar app, Refiner and RefinerValue are closely related.  Each refiner has a set of values, and the edit screen for a refiner also allows the user to add/edit/delete/reorder the values, which should be persisted together or all reverted if the user discards changes.

This feature is achieved by specifying that the relationship is included when snapshot/revert/immortalize are called on the entity.  We do that by adding a call to `includeInBoundedContext` after instantiating the relationship in the entity constructor:
```
export class Refiner extends ListItemEntity<IState> {
    constructor(author?: User, editor?: User, created?: Moment, modified?: Moment, id?: number, uniqueId?: Guid, etag?: number) {
        super(author, editor, created, modified, id, uniqueId, etag);

        ...

        this.values = OneToManyRelationship.create<Refiner, RefinerValue>(this, 'refiner');
        this.includeInBoundedContext(this.values);
    }

    public readonly values: IOneToManyRelationship<RefinerValue>;
}
```

Now any calls to `snapshot()`/`revert()`/`immortalize()` will cascade through the relationship to any related refiner values too.  For instance, when we call `snapshot()` on a refiner, the refiner values relationship as well as any related refiner values will also have a snapshot taken.  On the edit screen, the user may change the refiner's title, add a new refiner value, and change the title of an existing refiner value.  Because a snapshot has been taken of the entire graph of related entities, we can now easily track which have changes and persist those if the user chooses to save their changes, or we can revert every change with one call to `revert()` on the refiner entity if the user wishes to discard their changes.