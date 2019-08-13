import * as React from 'react';
import styles from './TeamInABoxSlicer.module.scss';
import { ITeamInABoxSlicerProps } from './ITeamInABoxSlicerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITeamInABoxSlicerState } from './ITeamInABoxSlicerState';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPListService } from '../../../../services/index';
import { IClient, IMatter } from '../../../../models';
import { Nav, INavLinkGroup, INavLink } from 'office-ui-fabric-react/lib/Nav';


export class TeamInABoxSlicer extends React.Component<ITeamInABoxSlicerProps, ITeamInABoxSlicerState> {
    private wpContext: IWebPartContext;

    constructor(props: ITeamInABoxSlicerProps) {
        super(props);

        this.state = {
            clients: [],
            matters: [],
            slicerData: []
        };
        this.wpContext = props.context;
    }
    public render(): React.ReactElement<ITeamInABoxSlicerProps> {
        return (
            <div className={styles.teamInABoxSlicer}>
            <div className={styles.Slicer}><h3>Filter Options</h3></div>
                <Nav groups={ this.state.slicerData } onLinkClick={ this.onMatterClick } />
            </div>
        );
    }

    private loadData() {
        const listService: SPListService = new SPListService(this.wpContext);
        listService.getClients()
            .then((clients: IClient[]) => {
                this.setState({ clients: clients });
                listService.getMatters()
                    .then((matters: IMatter[]) => {
                        this.setState({ matters: matters });
                        const slicerData = this.state.clients.map((client) => {
                            return {
                                name: client.CliNickName,
                                collapseByDefault: true,
                                links: this.state.matters.filter((matter) => matter.MatCliNbr === client.CliSysNbr)
                                    .map((matter) => {
                                        return {
                                            key: matter.MatSysNbr.toString(),
                                            name: matter.Title,
                                            url: null,
                                            matter: matter
                                        };
                                })
                            };
                        });
                        this.setState({ slicerData: slicerData });
                    });
            });
    }

    private onMatterClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void => {
        ev.preventDefault();
        this.props.onMatterSelect(item.matter);
    }

    public componentDidMount(): void {
        this.loadData();
    }
}
