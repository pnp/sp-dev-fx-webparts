import * as React from 'react';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartTitle } from '@pnp/spfx-controls-react';
import { ActionButton, CompoundButton, getTheme, Icon, Stack } from 'office-ui-fabric-react';
import { ILink } from '../models/ILink';
import { Util } from '../Util/Util';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { IPnPQuickLinksProps } from './IPnPQuickLinksProps';
import { TileSize } from '../models/enums';

export interface ITilesQuickLinksProps extends IPnPQuickLinksProps {
  size: TileSize,
  hideText: boolean;
}


export const TilesQuickLinks: React.FunctionComponent<ITilesQuickLinksProps> = (props: React.PropsWithChildren<ITilesQuickLinksProps>) => {
  const { displayMode, webPartTitle, setWebpartTitle, links, setLinks, SelectedItemId, setSelectedItemId, hideText, size } = props;
  const theme = getTheme();

  const AddLink = ():void => {
    setLinks([...links, {
      Id: Util.GenerateId(),
      SortWeight: Util.CalculateNewSortWeight(links, links.length),
      Title: "New link",
      IconName: "Globe",
      Link: "https://pnp.github.io/",
      Target: "_blank"
    }]);
  }



  const SortableItem = SortableElement(({ link }: { link: ILink }) => (
    <CompoundButton
      primary
      text={link.Title}
      styles={{
        root: {
          border: SelectedItemId === link.Id ? `3px solid ${theme.palette.themeSecondary}` : undefined,
          width: size < TileSize.Large ? 85 + size : 130,
          minHeight: size < TileSize.Large ? 80 + size : 124,
          borderRadius: 3
        },
        textContainer: {
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
          textAlign: "center"
        },
      }}
      href={displayMode === DisplayMode.Read && link.Link}
      target={displayMode === DisplayMode.Read && link.Target}

      onClick={displayMode === DisplayMode.Edit && (() => setSelectedItemId(link.Id))}
      onRenderText={(props) => {
        return (
          <Stack styles={{ root: { gap: 10 } }}>
            <Icon iconName={link.IconName} styles={{ root: { fontSize: size } }} />
            {(!hideText && size <= TileSize.Large) && props.text}
          </Stack>
        )
      }} />
  ));

  const SortableList = SortableContainer(({ items }: { items: ILink[] }) => (
    <div style={{ gap: 10, display: 'flex', flexWrap: "wrap" }}>
      {items.map((item, index) => (
        <SortableItem
          key={`${item.Id}`}
          index={index}
          link={item}
          disabled={displayMode === DisplayMode.Read}
        />
      ))}
    </div>
  ));

  const UpdateSortIndex = (indexToMove: number, newIndex: number):void => {
    const arr = [...links].sort((a, b) => a.SortWeight - b.SortWeight);
    const res = Util.CalculateNewSortWeight(links, newIndex, indexToMove);
    arr[indexToMove].SortWeight = res;
    setLinks(arr);
  }


  return (

    <>
      <WebPartTitle
        displayMode={displayMode}
        title={webPartTitle}
        updateProperty={setWebpartTitle}
      />

      {displayMode === DisplayMode.Edit && <ActionButton iconProps={{ iconName: "Add" }} onClick={() => AddLink()} >Add link</ActionButton>}

      <SortableList
        items={[...links].sort((a, b) => a.SortWeight - b.SortWeight)}
        axis="xy"
        distance={25}
        onSortEnd={sort => UpdateSortIndex(sort.oldIndex, sort.newIndex)}
      />

    </>
  );
};