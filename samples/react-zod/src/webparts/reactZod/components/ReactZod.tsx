import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import * as React from "react";
import { FormResultsModel } from "../utils/Models";

interface IReactZodProps {
  data: FormResultsModel;
}

const ReactZod = (props: IReactZodProps): JSX.Element => {
  const columns: IColumn[] = [
    {
      key: "Id",
      name: "Id",
      fieldName: "Id",
      minWidth: 10,
      maxWidth: 30,
    },
    {
      key: "Title",
      name: "Title",
      fieldName: "Title",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      key: "Description",
      name: "Description",
      fieldName: "Description",
      minWidth: 200,
    },
    {
      key: "Qty",
      name: "Qty",
      fieldName: "Qty",
      minWidth: 30,
    },
    {
      key: "Rating",
      name: "Rating",
      fieldName: "Rating",
      minWidth: 50,
      maxWidth: 100,
    },
    {
      key: "IsActive",
      name: "Is Active",
      fieldName: "IsActive",
      minWidth: 80,
    },
    {
      key: "Status",
      name: "Status",
      fieldName: "Status",
      minWidth: 50,
    },
    {
      key: "PublishDate",
      name: "Publish Date",
      fieldName: "PublishDate",
      minWidth: 120,
    },
    {
      key: "Contact",
      name: "Contact",
      fieldName: "Contact",
      minWidth: 100,
    },
    {
      key: "Email",
      name: "Email",
      fieldName: "Email",
      minWidth: 150,
    },
  ];

  return (
    <section>
      <DetailsList items={props.data} columns={columns} setKey="set" />
    </section>
  );
};

export { ReactZod, IReactZodProps };
