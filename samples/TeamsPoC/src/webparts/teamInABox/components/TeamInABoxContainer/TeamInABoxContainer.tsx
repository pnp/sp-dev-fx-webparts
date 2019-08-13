import * as React from 'react';
import styles from './TeamInABoxContainer.module.scss';
import { ITeamInABoxContainerProps } from './ITeamInABoxContainerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITeamInABoxContainerState } from './ITeamInABoxContainerState';
import { TeamInABoxNotes } from '../TeamInABoxNotes';
import { TeamInABoxBills } from '../TeamInABoxBills';
import { TeamInABoxEmployees } from '../TeamInABoxEmployees';
import { TeamInABoxTasks } from '../TeamInABoxTasks';
import { TeamInABoxSlicer } from '../TeamInABoxSlicer';
import { TeamInABoxBilledTime } from '../TeamInABoxBilledTime';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IMatter, INote, IBilledTime, IBill, IEmployee } from '../../../../models';
import { SPListService } from '../../../../services';

export class TeamInABoxContainer extends React.Component<ITeamInABoxContainerProps, ITeamInABoxContainerState> {
    private wpContext: IWebPartContext;
    constructor(props: ITeamInABoxContainerProps) {
        super(props);

        this.state = {
            selectedMatter: null,
            notes: [],
            bills: [],
            allbills: [],
            employees: [],
        };
        this.wpContext = props.context;
    }
    public render(): React.ReactElement<ITeamInABoxContainerProps> {
        return (
            <div className={styles.teamInABoxContainer}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TeamInABoxSlicer context={ this.wpContext } onMatterSelect={ this.onMatterSelect }></TeamInABoxSlicer>
                        </div>
                        <div className={styles.columnRight}>
                            <div className={styles.columnPadding}>                                                                                                            
                            <TeamInABoxEmployees context={ this.wpContext } matter={ this.state.selectedMatter } employees={ this.state.employees }></TeamInABoxEmployees>
                            <TeamInABoxBilledTime context={ this.wpContext } matter={ this.state.selectedMatter } bills={ this.state.bills }></TeamInABoxBilledTime>
                            <TeamInABoxNotes context={ this.wpContext } matter={ this.state.selectedMatter } notes={ this.state.notes }></TeamInABoxNotes>
                            <TeamInABoxBills context={ this.wpContext } matter={ this.state.selectedMatter } allbills={ this.state.allbills }></TeamInABoxBills>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onMatterSelect = (matter: IMatter): void => {
        this.setState({ selectedMatter: matter });
        this.loadNotes(matter);
        this.loadBilledTime(matter); 
        this.loadEmployees(matter);  
        this.loadAllBills(matter);     
    }

    private loadBilledTime(matter: IMatter) {
        const listService: SPListService = new SPListService(this.wpContext);
        listService.getBilledTime(matter.MatSysNbr)
            .then((bills: IBilledTime[]) => {
                this.setState({ bills: bills });
            });            
    }
    
    private loadNotes(matter: IMatter) {
        const listService: SPListService = new SPListService(this.wpContext);
        listService.getNotes(matter.MatSysNbr)
            .then((notes: INote[]) => {
                this.setState({ notes: notes });
            });            
    }

    private loadAllBills(matter: IMatter) {
        const listService: SPListService = new SPListService(this.wpContext);
        listService.getAllBills(matter.MatSysNbr)
            .then((allbills: IBill[]) => {
                this.setState({ allbills: allbills });
            });            
    }

    private loadEmployees(matter: IMatter) {
        const listService: SPListService = new SPListService(this.wpContext);
        listService.getEmployees(matter.MatSysNbr)
            .then((employees: IEmployee[]) => {
                this.setState({ employees: employees });
            });            
    }
}
