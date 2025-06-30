import * as React from "react";
//import styles from "./AzureApim.module.scss";
import { IAzureConnectProps } from "./IAzureConnectProps";
import {
  Anchor,
  Button,
  Container,
  MantineProvider,
  Paper,
  ScrollArea,
  Table,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { SiMicrosoftazure } from "react-icons/si";
import { AadTokenProvider } from "@microsoft/sp-http";
import { Placeholder } from "@pnp/spfx-controls-react";
import axios from "axios";
import * as strings from "AzureApimWebPartStrings";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: -16,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export const AzureConnect: React.FunctionComponent<IAzureConnectProps> = (
  props
) => {
  const { classes, cx } = useStyles();
  const { context, subscriptionKey, scopeUrl, tableEndpoint } = props;
  const [results, setResults] = React.useState<any[]>([]);
  const [scrolled, setScrolled] = React.useState(false);

  const getAccessToken = (): Promise<string> => {
    return context.aadTokenProviderFactory
      .getTokenProvider()
      .then((tokenProvider: AadTokenProvider): Promise<string> => {
        return tokenProvider.getToken(scopeUrl);
      })
      .catch((error) => {
        console.error("getAccessToken", error);
        return "";
      });
  };

  const getAzureTableData = async (token: string): Promise<any> => {
    try {
      const api = axios.create({
        baseURL: tableEndpoint,
      });

      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Ocp-Apim-Subscription-Key": subscriptionKey,
        },
      };
      const { data, status } = await api.get<any>(tableEndpoint, config);
      console.log(status);
      const [result] = [data.value] || [];
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const callAzureResource = async () => {
    try {
      const token = await getAccessToken();
      console.log(token);
      const result = await getAzureTableData(token);
      setResults(result);
    } catch (error) {}
  };

  const _onConfigure = () => {
    // Context of the web part
    context.propertyPane.open();
  };

  const rows =
    results.length > 0 &&
    results.map((row) => {
      return (
        <tr key={row.Title}>
          <td>
            <Anchor component="button" fz="sm">
              {row.Title}
            </Anchor>
          </td>
          <td>{row.Author}</td>
          <td>{row.Country}</td>
          <td>{row.ImageLink}</td>
          <td>{row.Language}</td>
          {/* <td>{row.Link}</td> */}
          <td>{row.Pages}</td>
          <td>{row.Year}</td>
        </tr>
      );
    });

  if (!scopeUrl || !tableEndpoint || !subscriptionKey) {
    return (
      <Placeholder
        iconName="Edit"
        iconText={strings.PlaceholderIconText}
        description={strings.PlaceholderDescription}
        buttonLabel={strings.PlaceholderButtonLabel}
        onConfigure={_onConfigure}
      />
    );
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container>
        <Paper
          shadow="md"
          radius="md"
          p="md"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <Title order={4}>
            {" "}
            Accessing Azure storage table data from SharePoint Online using
            Azure API Management
          </Title>
          <Button
            onClick={() => callAzureResource()}
            leftIcon={<SiMicrosoftazure />}
            variant="white"
          >
            View Azure Table Data
          </Button>
          <ScrollArea
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          />
          <Table sx={{ minWidth: 800 }} verticalSpacing="xs" striped>
            <thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <tr>
                <th>Book title</th>
                <th>Author</th>
                <th>Country</th>
                <th>ImageLink</th>
                <th>Language</th>
                {/* <th>Link</th> */}
                <th>Pages</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Paper>
      </Container>
    </MantineProvider>
  );
};
