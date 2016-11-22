import * as React from 'react';


import ListItem from '../model/ListItem';
export interface IListItemViewProps extends React.Props<any> {
  listItems: Array<ListItem>;
  addListItem: () => void;
  removeListItem: () => void;
  getListItems: () => void;
};
function listItemRow(listItem: ListItem) {
  return (
    <tr>
      <td>
        {listItem.id}
      </td>
      <td>
        {listItem.title}
      </td>
      <td>
        {listItem.guid}
      </td>
    </tr>
  );
}
export default function ListItemView({
  listItems,
  addListItem,
  removeListItem,
  getListItems
}: IListItemViewProps) {
  debugger;
  return (
    <div >
      <button
        testid="counter-decrementButton"
        id="qa-decrement-button"
        className="bg-black col-2"
        onClick={removeListItem}>
        -
      </button>

      <button
        testid="counter-incrementButton"
        id="qa-increment-button"
        className="col-2"
        onClick={addListItem}>
        +
      </button>
      <button
        testid="counter-incrementButton"
        id="qa-increment-button"
        className="col-2"
        onClick={getListItems}>
        =
      </button>

      <table
        data-testid="counter-result"
        id="qa-counter-div"
        >
        <tr>
          <th>
            List Item ID
          </th>
          <th>
            Title
          </th>
          <th>
            Item GUID
          </th>
        </tr>
        {

          listItems.map(function (col, j) { return listItemRow(col); })
        }
      </table>

    </div>
  );
}

