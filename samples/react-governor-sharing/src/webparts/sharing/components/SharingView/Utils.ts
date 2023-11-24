
import { IColumn, IContextualMenuItem, IFacepilePersona } from '@fluentui/react';
import { IdentitySet } from '@microsoft/microsoft-graph-types';
import { isEqual } from '@microsoft/sp-lodash-subset';

// need to rework this sorting method to be a) working with dates and b) be case insensitive
export function genericSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}
// thanks to Michael Norward for this function, https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array
export function textSort(objectsArr: any[], prop, isSortedDescending = true): any[] {
  const objectsHaveProp = objectsArr.every(object => object.hasOwnProperty(prop));
  if (objectsHaveProp) {
    const newObjectsArr = objectsArr.slice();
    newObjectsArr.sort((a, b) => {
      if (isNaN(Number(a[prop]))) {
        const textA = a[prop].toUpperCase(),
          textB = b[prop].toUpperCase();
        if (isSortedDescending) {
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        } else {
          return textB < textA ? -1 : textB > textA ? 1 : 0;
        }
      } else {
        return isSortedDescending ? a[prop] - b[prop] : b[prop] - a[prop];
      }
    });
    return newObjectsArr;
  }
  return objectsArr;
}

export function uniqForObject<T>(array: T[]): T[] {
  const result: T[] = [];
  for (const item of array) {
    const found = result.some((value) => isEqual(value, item));
    if (!found) {
      result.push(item);
    }
  }
  return result;
}

export function rightTrim(sourceString: string, searchString: string): string {
  for (; ;) {
    const pos = sourceString.lastIndexOf(searchString);
    if (pos === sourceString.length - 1) {
      const result = sourceString.slice(0, pos);
      sourceString = result;
    }
    else {
      break;
    }
  }
  return sourceString;
}

export function convertToGraphUserFromLinkKind(linkKind: number): microsoftgraph.User {
  const _user: microsoftgraph.User = {};
  switch (linkKind) {
    case 2: _user.displayName = "Organization View"; break;
    case 3: _user.displayName = "Organization Edit"; break;
    case 4: _user.displayName = "Anonymous View"; break;
    case 5: _user.displayName = "Anonymous Edit"; break;
    default: break;
  }
  _user.userType = "Link";
  return _user;
}

export function convertUserToFacePilePersona(user: IdentitySet): IFacepilePersona {
  if (user['siteUser'] != null) {
    const siteUser = user['siteUser'];
    const _user: IFacepilePersona =
    {
      data: (siteUser.loginName.indexOf('#ext') != -1) ? "Guest" : "Member",
      personaName: siteUser.displayName,
      name: siteUser.loginName.replace("i:0#.f|membership|", "")
    };
    return _user;
  }
  else if (user['siteGroup'] != null) {
    const siteGroup = user['siteGroup'];
    const _user: IFacepilePersona =
    {
      data: "Group",
      personaName: siteGroup.displayName,
      name: siteGroup.loginName.replace("c:0t.c|tenant|", "")
    };
    return _user;
  }
  else {
    const _user: IFacepilePersona =
    {
      name: user.user.id,
      data: (user.user.id == null) ? "Guest" : "Member",
      personaName: user.user.displayName
    };
    return _user;
  }

}

export function convertToFacePilePersona(users: IdentitySet[]): IFacepilePersona[] {
  const _users: IFacepilePersona[] = [];
  if (users.length > 1) {
    users.forEach((user) => {
      if (user['siteUser'] != null) {
        const siteUser = user['siteUser'];
        const _user: IFacepilePersona =
        {
          data: (siteUser.loginName.indexOf('#ext') !== -1) ? "Guest" : "Member",
          personaName: siteUser.displayName,
          name: siteUser.loginName.replace("i:0#.f|membership|", "")
        };
        _users.push(_user);
      }
      else {
        const _user: IFacepilePersona =
        {
          name: user.user.id,
          data: (user.user.id == null) ? "Guest" : "Member",
          personaName: user.user.displayName
        };
        _users.push(_user);
      }
    });
  }
  else {
    _users.push(convertUserToFacePilePersona(users[0]));
  }

  return _users;
}

export function getSortingMenuItems(column: IColumn, onSortColumn: (column: IColumn, isSortedDescending: boolean) => void): IContextualMenuItem[] {
  const menuItems = [];
  if (column.data === Number) {
    menuItems.push(
      {
        key: 'smallToLarger',
        name: 'Smaller to larger',
        canCheck: true,
        checked: column.isSorted && !column.isSortedDescending,
        onClick: () => onSortColumn(column, false)
      },
      {
        key: 'largerToSmall',
        name: 'Larger to smaller',
        canCheck: true,
        checked: column.isSorted && column.isSortedDescending,
        onClick: () => onSortColumn(column, true)
      }
    );
  }
  else if (column.data === Date) {
    menuItems.push(
      {
        key: 'oldToNew',
        name: 'Older to newer',
        canCheck: true,
        checked: column.isSorted && !column.isSortedDescending,
        onClick: () => onSortColumn(column, false)
      },
      {
        key: 'newToOld',
        name: 'Newer to Older',
        canCheck: true,
        checked: column.isSorted && column.isSortedDescending,
        onClick: () => onSortColumn(column, true)
      }
    );
  }
  else
  //(column.data == String) 
  // NOTE: in case of 'complex columns like Taxonomy, you need to add more logic'
  {
    menuItems.push(
      {
        key: 'aToZ',
        name: 'A to Z',
        canCheck: true,
        checked: column.isSorted && !column.isSortedDescending,
        onClick: () => onSortColumn(column, false)
      },
      {
        key: 'zToA',
        name: 'Z to A',
        canCheck: true,
        checked: column.isSorted && column.isSortedDescending,
        onClick: () => onSortColumn(column, true)
      }
    );
  }
  return menuItems;
}

/// this is used to process the SharedWithUsersOWSUSER output to get the userPrincipalName and userType 
export function processUsers(users: string): IFacepilePersona[] {
  const _users: microsoftgraph.User[] = [];

  if (users === null || users === undefined)
    return _users;

  if (users.match("\n\n")) {
    const allUsers = users.split("\n\n");
    allUsers.forEach(element => {
      const user: IFacepilePersona = {
        personaName: element.split("|")[1].trim(),
        data: (element.indexOf("#ext#") > -1) ? "Guest" : "Member",
        id: element.split("|")[0].trim()
      };
      _users.push(user)
    });
  }
  else {
    const user: IFacepilePersona = {
      personaName: users.split("|")[1].trim(),
      data: (users.indexOf("#ext#") > -1) ? "Guest" : "Member",
      id: users.split("|")[0].trim()
    };
    _users.push(user)
  }
  return _users;
}