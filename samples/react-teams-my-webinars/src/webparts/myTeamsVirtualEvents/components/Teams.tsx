import { Dropdown, Field, Skeleton, SkeletonItem, Option } from "@fluentui/react-components";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { GraphError } from '@microsoft/microsoft-graph-client';
import * as React from "react";

export declare type SelectionEvents = React.ChangeEvent<HTMLElement> | React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>;
export declare type OptionOnSelectData = {
  optionValue: string | undefined;
  optionText: string | undefined;
  selectedOptions: string[];
};

interface ITeamsProps {
  context: WebPartContext;
  label: string;
  onOptionSelect?: (event: SelectionEvents, data: OptionOnSelectData) => void;
}

export default function Teams(props: ITeamsProps): React.ReactElement<ITeamsProps> {
  const { context, label } = props;
  const [myTeams, setMyTeams] = React.useState<MicrosoftGraph.Team[]>();
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [value, setValue] = React.useState<string>("");

  const onOptionSelect: (typeof props)["onOptionSelect"] = (ev, data) => {
    setSelectedOptions(data.selectedOptions);
    setValue(data.optionText ?? "");
    if (props.onOptionSelect) props.onOptionSelect(ev, data);
  };

  React.useEffect(() => {
    if ((myTeams?.length ?? -1) < 0) context.msGraphClientFactory
      .getClient('3')
      .then((client: MSGraphClientV3) => {
        if (!myTeams) client
          .api(`me/joinedTeams`)
          .version("v1.0")
          .get((err: GraphError, res: { value: MicrosoftGraph.Team[] }) => {
            if (err) {
              console.error(err);
              return;
            }
            setMyTeams(res.value);
          }).catch(console.error);
      }).catch(console.error);
  }, [context]);

  return (<Field required label={label}>
    {!myTeams && <Skeleton><SkeletonItem /></Skeleton>}
    {myTeams && <Dropdown value={value}
      selectedOptions={selectedOptions}
      onOptionSelect={onOptionSelect}>
      {myTeams.map(t => (<Option key={t.id} text={t.displayName ?? ''} value={t.id}>{t.displayName}</Option>))}
    </Dropdown>}
  </Field>);
}