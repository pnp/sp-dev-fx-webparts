import * as React from 'react';
import styles from './FluentUi9Demo.module.scss';
import { IFluentUi9DemoProps } from './IFluentUi9DemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Button, Link, Text, Tab, TabList, Avatar, useId, ToggleButton, Slider, Divider, Label, Input, Checkbox, RadioGroup, Radio, Switch, Body1, Caption1, CompoundButton, Menu, MenuButtonProps, MenuItem, MenuList, MenuPopover, MenuTrigger, SplitButton, Card, CardHeader, CardPreview, CardFooter } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { ArrowReplyRegular, ShareRegular, DocumentText24Regular } from '@fluentui/react-icons';
import { ResponseType } from "@microsoft/microsoft-graph-clientv1";
import { AppMode } from '../FluentUi9DemoWebPart';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export default function FluentUi9Demo(props: IFluentUi9DemoProps): React.ReactElement<IFluentUi9DemoProps> {
  const { isDarkTheme, userDisplayName, appMode } = props;
  const [tab, setTab] = React.useState<string | unknown>("buttons");
  const [me, setMe] = React.useState<string | undefined>();
  const outlineId = useId('input-outline');
  const underlineId = useId('input-underline');

  const am = (): string => {
    switch (appMode) {
      case AppMode.Office: return "Office";
      case AppMode.OfficeLocal: return "Office Local";
      case AppMode.Outlook: return "Outlook";
      case AppMode.OutlookLocal: return "Outlook Local";
      case AppMode.SharePoint: return "SharePoint";
      case AppMode.SharePointLocal: return "SharePoint Local";
      case AppMode.Teams: return "Teams";
      case AppMode.TeamsLocal: return "Teams Local";
    }
    return "unknown";
  }

  React.useEffect(() => {
    props.context.msGraphClientFactory.getClient("3").then(async (client) => {
      await client
        .api('/me/photo/$value')
        .responseType(ResponseType.BLOB)
        .get()
        .then((blob: Blob): Promise<unknown> => {
          return new Promise(resolve => {
            const url = URL.createObjectURL(blob);
            setMe(url);
            resolve(url);
          });
        });
    }).catch(console.error);
  }, []);

  return (
    <section>
      <div className={styles.welcome}>
        <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
        <h2>Well done, {escape(userDisplayName)}!</h2>
        <div>This app is running in {am()}</div>
      </div>
      <div>
        <h3>Welcome to SharePoint Framework!</h3>
        <p>
          This demos the use of Fluent UI 9 instead of using FabircUI.  The new framework combines Northstar and FluentUI.  Below are some demo&rsquo;s and they should render in Teams style when inside Teams.
        </p>
        <Text as="h3">Demo components</Text>
        <div className={styles.stack}>
          <TabList onTabSelect={(e, data) => setTab(data.value)} defaultSelectedValue="buttons">
            <Tab value="buttons">Buttons</Tab>
            <Tab value="cards">Cards</Tab>
            <Tab value="inputs">Inputs</Tab>
          </TabList>
          {tab === 'buttons' && <div className={styles.stack} style={{ padding: 10 }}>
            <Divider appearance='brand'>Button</Divider>
            <div className={`${styles.stackHoz} ${styles.spaceBetween}`}>
              <Button>Default</Button><Button appearance="primary">Primary</Button><Button appearance="outline">Outline</Button><Button appearance="subtle">Subtle</Button><Button appearance="transparent">Transparent</Button>
            </div>
            <Divider appearance='brand'>Toggle Button</Divider>
            <div className={`${styles.stackHoz} ${styles.spaceBetween}`}>
              <ToggleButton>Default</ToggleButton>
              <ToggleButton appearance="primary">Primary</ToggleButton>
              <ToggleButton appearance="outline">Outline</ToggleButton>
              <ToggleButton appearance="subtle">Subtle</ToggleButton>
              <ToggleButton appearance="transparent">Transparent</ToggleButton>
            </div>
            <Divider appearance='brand'>Compond Button</Divider>
            <div className={`${styles.stackHoz} ${styles.spaceBetween}`}>
              <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonthRegular />}>Default</CompoundButton>
              <CompoundButton secondaryContent="Secondary content" appearance="primary" icon={<CalendarMonthRegular />}>Primary</CompoundButton>
              <CompoundButton secondaryContent="Secondary content" appearance="outline" icon={<CalendarMonth />}>Outline</CompoundButton>
              <CompoundButton secondaryContent="Secondary content" appearance="subtle" icon={<CalendarMonth />}>Subtle</CompoundButton>
              <CompoundButton secondaryContent="Secondary content" appearance="transparent" icon={<CalendarMonth />}>Transparent</CompoundButton>
            </div>
            <Divider appearance='brand'>Split Button</Divider>
            <div className={`${styles.stackHoz} ${styles.spaceBetween}`}>
              {/* @ts-expect-error Issue with the menu object with Typescript sub elements not resolving correctly */}
              <Menu positioning="below-end">
                <MenuTrigger disableButtonEnhancement>
                  {(triggerProps: MenuButtonProps) => <SplitButton menuButton={triggerProps}>Default</SplitButton>}
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    <MenuItem>Item a</MenuItem>
                    <MenuItem>Item b</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
              {/* @ts-expect-error Issue with the menu object with Typescript sub elements not resolving correctly */}
              <Menu positioning="below-end">
                <MenuTrigger disableButtonEnhancement>
                  {(triggerProps: MenuButtonProps) => (
                    <SplitButton menuButton={triggerProps} appearance="primary">
                      Primary
                    </SplitButton>
                  )}
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    <MenuItem>Item a</MenuItem>
                    <MenuItem>Item b</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
              {/* @ts-expect-error Issue with the menu object with Typescript sub elements not resolving correctly */}
              <Menu positioning="below-end">
                <MenuTrigger disableButtonEnhancement>
                  {(triggerProps: MenuButtonProps) => (
                    <SplitButton menuButton={triggerProps} appearance="outline">
                      Outline
                    </SplitButton>
                  )}
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    <MenuItem>Item a</MenuItem>
                    <MenuItem>Item b</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
              {/* @ts-expect-error Issue with the menu object with Typescript sub elements not resolving correctly */}
              <Menu positioning="below-end">
                <MenuTrigger disableButtonEnhancement>
                  {(triggerProps: MenuButtonProps) => (
                    <SplitButton menuButton={triggerProps} appearance="subtle">
                      Subtle
                    </SplitButton>
                  )}
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    <MenuItem>Item a</MenuItem>
                    <MenuItem>Item b</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
              {/* @ts-expect-error Issue with the menu object with Typescript sub elements not resolving correctly */}
              <Menu positioning="below-end">
                <MenuTrigger disableButtonEnhancement>
                  {(triggerProps: MenuButtonProps) => (
                    <SplitButton menuButton={triggerProps} appearance="transparent">
                      Transparent
                    </SplitButton>
                  )}
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    <MenuItem>Item a</MenuItem>
                    <MenuItem>Item b</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </div>
          </div>}
          {tab === 'cards' && <>
            <Card>
              <CardHeader
                image={<Avatar name={userDisplayName} image={me ? { src: me } : null} />}
                header={
                  <Body1>
                    <b>{userDisplayName}</b> mentioned
                  </Body1>
                }
                description={<Caption1>5h ago · About us - Overview</Caption1>}
              />

              <CardPreview logo={<DocumentText24Regular />}>
                <img src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} alt="Preview of a Word document " />
              </CardPreview>
              <CardFooter>
                <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
                <Button icon={<ShareRegular fontSize={16} />}>Share</Button>
              </CardFooter>
            </Card>
          </>}
          {tab === 'inputs' && <div style={{ padding: 10 }} className={styles.stack}>
            <div><Label htmlFor={outlineId}>Outline (default)</Label><Input appearance="outline" id={outlineId} /></div>
            <div><Label htmlFor={underlineId}>Underline</Label><Input appearance="underline" id={underlineId} /></div>
            <Checkbox label="Option 1" /><Checkbox label="Option 2" checked /><Checkbox label="Option 3" checked="mixed" />
            <RadioGroup layout="horizontal"><Radio value="A" label="Option A" /><Radio value="B" label="Option B" /><Radio value="C" label="Option C" /><Radio value="D" label="Option D" /></RadioGroup>
            <Switch />
            <Slider defaultValue={20} />
          </div>}
        </div>
        <h4>Learn more about SPFx development:</h4>
        <ul className={styles.links}>
          <li><Link href="https://aka.ms/spfx" target="_blank">SharePoint Framework Overview</Link></li>
          <li><Link href="https://aka.ms/spfx-yeoman-graph" target="_blank">Use Microsoft Graph in your solution</Link></li>
          <li><Link href="https://aka.ms/spfx-yeoman-teams" target="_blank">Build for Microsoft Teams using SharePoint Framework</Link></li>
          <li><Link href="https://aka.ms/spfx-yeoman-viva" target="_blank">Build for Microsoft Viva Connections using SharePoint Framework</Link></li>
          <li><Link href="https://aka.ms/spfx-yeoman-store" target="_blank">Publish SharePoint Framework applications to the marketplace</Link></li>
          <li><Link href="https://aka.ms/spfx-yeoman-api" target="_blank">SharePoint Framework API reference</Link></li>
          <li><Link href="https://aka.ms/m365pnp" target="_blank">Microsoft 365 Developer Community</Link></li>
          <li><Link href="https://aka.ms/fluentui-storybook" target="_blank">Microsoft Fluent UI v9</Link></li>
        </ul>
      </div>
    </section>
  );
}