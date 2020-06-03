import * as React from 'react';
import styles from './ProjectOnline.module.scss';
import { IProjectOnlineProps, IProjectOnlineState } from '.';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Projects } from "../Projects";
import { ProjectTasks } from "../ProjectTasks";
import { ProjectAssignments } from "../ProjectAssignments/index";
import { Calendars } from '../Calendars';

export class ProjectOnline extends React.Component<IProjectOnlineProps, IProjectOnlineState> {

  constructor(props: IProjectOnlineProps) {
    super(props);
    this.state = {
      projectId: ''
    };
  }

  public render(): React.ReactElement<IProjectOnlineProps> {
    return (
      <div className={styles.projectOnline}>
        <div className={styles.container}>

          <span className={styles.title}>Welcome to Project Online!</span>
          <p className={styles.subTitle}>Customize Project Online experiences using SPFx Web Parts.</p>

          <TextField label="Project Id" value={this.state.projectId} onChange={this._onChange} />

          <h3>Projects</h3>
          <Projects projectId={this.state.projectId}></Projects>

          <h3>Project Tasks</h3>
          <ProjectTasks projectId={this.state.projectId}></ProjectTasks>

          <h3>Project Assignments</h3>
          <ProjectAssignments projectId={this.state.projectId}></ProjectAssignments>






          <h3>Calendars</h3>
          <Calendars></Calendars>
        </div>

      </div>
    );
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ projectId: newValue || '' });
  }

}
