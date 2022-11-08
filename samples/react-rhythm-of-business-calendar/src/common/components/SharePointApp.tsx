import { noop, isEqual } from 'lodash';
import React, { ReactElement, ReactNode, Component, CSSProperties } from "react";
import { initializeIcons, Shimmer, ThemeProvider as FluentThemeProvider } from "@fluentui/react";
import { ISPFXContext } from '@pnp/common';
import { graph } from "@pnp/graph";
import { sp } from "@pnp/sp";
import { ThemeProvider as SPThemeProvider, ThemeChangedEventArgs, IReadonlyTheme, BaseComponent } from '@microsoft/sp-component-base';
import { IMicrosoftTeams } from '@microsoft/sp-webpart-base';
import { perf } from 'common';
import { ServiceManager, ServicesType, ServicesProvider, ServiceDescriptorArray, SpfxContext } from "common/services";

require('office-ui-fabric-react/dist/css/fabric.min.css');

initializeIcons();

const fluentRootStyle: CSSProperties = { height: '100%' };

interface IProps<D extends ServiceDescriptorArray> {
    appName: string;
    companyName: string;
    spfxComponent: BaseComponent;
    spfxContext: SpfxContext;
    teams: IMicrosoftTeams;
    serviceDescriptors: D;
    shimmerElements?: ReactNode;
    onInitBeforeServices?: () => Promise<any>;
    onInitAfterServices?: (services: ServicesType<D>) => Promise<any>;
    children: (services: ServicesType<D>) => ReactElement;
}

interface IState<D extends ServiceDescriptorArray> {
    serviceManager: ServiceManager<D>;
}

export class SharePointApp<D extends ServiceDescriptorArray> extends Component<IProps<D>, IState<D>> {
    private _themeProvider: SPThemeProvider;
    private _theme: IReadonlyTheme;

    constructor(props: IProps<D>) {
        super(props);

        this.state = {
            serviceManager: null
        };
    }

    public async componentDidMount() {
        const { spfxComponent, spfxContext, onInitBeforeServices = noop, onInitAfterServices } = this.props;

        try {
            this._configurePnP();

            const [
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _unused,
                serviceManager
            ] = await Promise.all([
                onInitBeforeServices(),
                this._createServiceManager()
            ]);

            this._themeProvider = spfxContext.serviceScope.consume(SPThemeProvider.serviceKey);
            this._themeProvider.themeChangedEvent.add(spfxComponent, this._onThemeChanged);
            this._theme = this._themeProvider.tryGetTheme();

            if (onInitAfterServices) {
                await perf('SharePointApp.onInitAfterServices', () => onInitAfterServices(serviceManager.services));
            }

            this.setState({ serviceManager });
        } catch (e) {
            console.error(e);
        }
    }

    public componentWillUnmount() {
        const { spfxComponent } = this.props;

        if (this._themeProvider)
            this._themeProvider.themeChangedEvent.remove(spfxComponent, this._onThemeChanged);
    }

    private readonly _onThemeChanged = ({ theme }: ThemeChangedEventArgs) => {
        if (!isEqual(this._theme, theme)) {
            this._theme = theme;
            this.forceUpdate();
        }
    }

    private _configurePnP() {
        const { appName, companyName, spfxContext } = this.props;
        const { version } = spfxContext.manifest;
        const xClientTag = `${companyName}|${appName}/${version}`;

        sp.setup({
            spfxContext: spfxContext as unknown as ISPFXContext,
            sp: {
                headers: {
                    "X-ClientTag": xClientTag,
                    "User-Agent": xClientTag
                }
            }
        });

        graph.setup(spfxContext as unknown as ISPFXContext);
    }

    private readonly _createServiceManager = (): Promise<ServiceManager<D>> => {
        const { appName, spfxComponent, spfxContext, teams, serviceDescriptors } = this.props;

        return ServiceManager.create(appName, spfxComponent, spfxContext, teams, {}, serviceDescriptors);
    }

    public render(): ReactElement<IProps<D>> {
        const { children, shimmerElements } = this.props;
        const { serviceManager } = this.state;

        return (
            <FluentThemeProvider theme={this._theme} style={fluentRootStyle}>
                <Shimmer isDataLoaded={!!serviceManager} customElementsGroup={shimmerElements}>
                    {!!serviceManager &&
                        <ServicesProvider value={serviceManager.services}>
                            {children(serviceManager.services)}
                        </ServicesProvider>
                    }
                </Shimmer>
            </FluentThemeProvider>
        );
    }
}