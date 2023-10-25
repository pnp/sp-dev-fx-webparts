import * as React from "react";
//import styles from "./Preferences.module.scss";
import { IPreferencesProps } from "./IPreferencesProps";
//import SPService from "../../../services/SPService";
import {
  Container,
  Group,
  createStyles,
  ActionIcon,
  Card,
  Text,
} from "@mantine/core";

import { IconSettings } from "@tabler/icons-react";
import GraphService from "../../../services/GraphService";
import { Picker } from "./Picker";
import { ITerm } from "../types/Component.Types";
import { useRecoilState } from "recoil";
import { tagsListAtom } from "../../../stores/appstore";
import CachingService from "../../../services/CachingService";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

const useStyles = createStyles((theme) => ({
  tagWrapper: {
    display: "flex",
    flexDirection: "unset",
    margin: "3px 1em 3px 0",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
  },
  tag: {
    color: "white",
    backgroundColor: "rgb(34, 139, 230)",
    padding: "0 0.625rem",
    border: "0.0625rem solid transparent",
    borderRadius: "2rem",
    height: "1.75rem",
    fontSize: "0.875rem",
    lineHeight: "calc(1.625rem)",
    whiteSpace: "nowrap",
    transition: "background-color 100ms ease 0s",
  },
}));
export const Preferences: React.FC<IPreferencesProps> = (props) => {
  const {
    extensionName,
    termsetGuid,
    loginName,
    title,
    context,
    enableCaching,
  } = props;
  const { classes } = useStyles();
  const [isPanelOpen, setIsPanelOpen] = React.useState<boolean>(false);
  const [tagList, setTagList] = useRecoilState(tagsListAtom);
  const dataCacheKey = `Preferences-${extensionName}-${loginName}`;

  const onConfigure = () => {
    // Context of the web part
    context.propertyPane.open();
  };

  const getUserPreferences = async () => {
    const cachedData = CachingService.get(dataCacheKey);
    if (cachedData !== null) {
      return cachedData;
    }

    const result = await GraphService.GetPreferences(extensionName);
    if (result && result.Tags && Array.isArray(result.Tags) && enableCaching) {
      CachingService.set(dataCacheKey, result.Tags);
    }

    return result.Tags || [];
  };

  const getPreferences = React.useCallback(async () => {
    const result = await getUserPreferences();
    return result;
  }, []);

  React.useEffect(() => {
    getPreferences()
      .then((data) => setTagList(data))
      .catch((error) => console.log(error));
  }, [getPreferences]);

  const onViewPanelClick = (): void => {
    setIsPanelOpen(true);
  };

  function onViewPanelDismiss(): void {
    setIsPanelOpen(false);
  }

  if (!extensionName || !termsetGuid) {
    return (
      <Placeholder
        iconName="Edit"
        iconText="Configure your web part"
        description="Please provide the Microsoft Graph open extension name and term set Id."
        buttonLabel="Configure"
        onConfigure={onConfigure}
      />
    );
  }

  return (
    <Container>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">
            <Text size={30} weight={500}>
              {title}
            </Text>
            <ActionIcon
              onClick={onViewPanelClick}
              variant="outline"
              color="indigo"
            >
              <IconSettings size="1rem" />
            </ActionIcon>
          </Group>
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          {isPanelOpen && (
            <Picker
              extensionName={extensionName}
              termsetGuid={termsetGuid}
              opened={isPanelOpen}
              close={onViewPanelDismiss}
            />
          )}

          <div className={classes.tagWrapper}>
            {tagList.length > 0 &&
              tagList.map((t: ITerm, index) => {
                return (
                  <div className={classes.tag} key={index}>
                    {t.title}
                  </div>
                );
              })}
          </div>
        </Group>

        {/* <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
          </Button> */}
      </Card>
    </Container>
  );
};
