import * as React from "react";
import SPService from "../../../services/SPService";
import {
  Chip,
  Group,
  Box,
  Modal,
  Button,
  Flex,
  Grid,
  useMantineTheme,
  ModalBaseStylesNames,
  Styles,
  Alert,
} from "@mantine/core";
import GraphService from "../../../services/GraphService";
import { ITerm } from "../types/Component.Types";
import { IconCheck } from "@tabler/icons-react";
import { useRecoilState } from "recoil";
import { tagsListAtom } from "../../../stores/appstore";
import CachingService from "../../../services/CachingService";

export interface IPickerProps {
  extensionName: string;
  termsetGuid: string;
  opened: boolean;
  close: () => void;
}

export const Picker: React.FC<IPickerProps> = (props) => {
  const { extensionName, termsetGuid, opened, close } = props;
  const [termsInfo, setTermsInfo] = React.useState<ITerm[]>([]);
  const theme = useMantineTheme();
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagList, setTagList] = useRecoilState(tagsListAtom);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [submitted, setSubmitted] = React.useState<boolean>(false);

  const dataCacheKey = `Preferences-taxonomy-${termsetGuid}`;

  const getCachedTaxonomy = async () => {
    // Check if the taxonomy data is available in the cache.
    const cachedTaxonomy = await CachingService.get(dataCacheKey);
    // If the taxonomy data is available in the cache, return it.
    if (cachedTaxonomy) {
      return cachedTaxonomy;
    }

    // Otherwise, make an API call to fetch the taxonomy data and cache it.
    const taxonomy = await SPService.getAllTermsByTermSet(termsetGuid);
    const termsResult = taxonomy.map((t: any) => {
      const termId = t.id;
      const termName = t.labels[0].name;
      return { id: termId, title: termName } as ITerm;
    });
    // Cache the taxonomy data.
    CachingService.set(dataCacheKey, termsResult);

    // Return the taxonomy data.
    return termsResult;
  };

  React.useEffect(() => {
    async function fetchTaxonomy() {
      const termsResult = await getCachedTaxonomy();
      const ids = tagList.map((obj: ITerm) => obj.id);
      setTags(ids);
      setTermsInfo(termsResult);
    }
    fetchTaxonomy();
  }, []);

  // React.useEffect(() => {
  //   async function fetchTaxonomy() {
  //     const terms = await SPService.getAllTermsByTermSet(termsetGuid);
  //     const termsResult = terms.map((t: any) => {
  //       const termId = t.id;
  //       const termName = t.labels[0].name;
  //       return { id: termId, title: termName } as ITerm;
  //     });
  //     const ids = tagList.map((obj: ITerm) => obj.id);
  //     setTags(ids);
  //     setTermsInfo(termsResult);
  //   }
  //   fetchTaxonomy();
  // }, []);

  const onSavePreferences = async () => {
    setLoading(true);
    setSubmitted(false);

    const extension = await GraphService.GetExtension(extensionName);

    const selectedTags = [];
    for (const guid of tags) {
      const term = termsInfo.find((t: ITerm) => t.id === guid);
      if (term) {
        selectedTags.push(term);
      }
    }

    const userSettings = {
      "@odata.type": "microsoft.graph.openTypeExtension",
      extensionName: extensionName,
      Tags: selectedTags,
    };
    if (extension === null) {
      //Create Extesion
      const response = await GraphService.SavePreferences(userSettings);
      if (response !== null && response.ok) {
        console.log(response);
      }
    } else {
      //update Extesion
      const response = await GraphService.UpdatePreferences(
        userSettings,
        extensionName
      );
      if (response !== null) {
        console.log(response);
        setTagList(selectedTags);
        setSubmitted(true);
      }
    }

    setLoading(false);
  };
  const onTagChange = (selectedTags: string[]) => {
    const ids = [...selectedTags];
    setTags(ids);
    //setTags((prevState) => [...prevState, ...selectedTags]);
  };
  console.log(tagList);

  const modelHeaderStyles: Styles<ModalBaseStylesNames> = {
    header: {
      backgroundColor: "#d1d2d3ba",
      h2: {
        fontSize: "1.1rem",
      },
    },
  };

  return (
    <div>
      <Modal
        styles={modelHeaderStyles}
        size="lg"
        opened={opened}
        onClose={close}
        title="Update preferences"
        centered
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Grid>
          <Grid.Col span={12}>
            {" "}
            <Chip.Group multiple value={tags} onChange={onTagChange}>
              <Group position="center" mt="md">
                {termsInfo.length > 0 &&
                  termsInfo.map((t: ITerm, index: number) => {
                    const isSelected: boolean = tags.some((o) => o === t.id);
                    return (
                      <Chip
                        checked={isSelected}
                        variant="filled"
                        key={index}
                        value={t.id}
                      >
                        {t.title}
                      </Chip>
                    );
                  })}
              </Group>
            </Chip.Group>
          </Grid.Col>
          {!submitted && (
            <Grid.Col span={12}>
              {" "}
              <Flex gap="md" justify="flex-end">
                <Box w={200}>
                  <Button
                    loading={loading}
                    loaderPosition="left"
                    fullWidth
                    variant="gradient"
                    onClick={onSavePreferences}
                  >
                    Save
                  </Button>
                </Box>
              </Flex>
            </Grid.Col>
          )}
        </Grid>

        {submitted && (
          <Alert
            icon={<IconCheck size="1rem" />}
            title="Success!"
            color="green"
          >
            Your preferences have been successfully updated. You&apos;re good to go!
          </Alert>
        )}
      </Modal>
    </div>
  );
};
