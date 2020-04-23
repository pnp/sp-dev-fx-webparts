import * as React from 'react';
import styles from './ProjectTasks.module.scss';
import { IProjectTasksProps } from './IProjectTasksProps';
import { project, User, CustomFieldCollection, PublishedAssignmentCollection, Calendar, PublishedTaskLinkCollection, PublishedTaskCollection, PublishedTask } from "pnpjs-project-online-package";
import { Button } from "office-ui-fabric-react/lib/Button";

export class ProjectTasks extends React.Component<IProjectTasksProps, {}> {

  public render(): React.ReactElement<IProjectTasksProps> {
    return (
      <div className={styles.buttons}>
        <Button text='Get all project tasks' onClick={this._getAllProjectTasks}></Button>
        <Button text='Get project task by Id' onClick={this._getProjectTaskById}></Button>
      </div>
    );
  }

  private _getAllProjectTasks = async () => {
    const projectTasks: PublishedTaskCollection[] = await project.projects.getById(this.props.projectId).tasks.get();
    console.log('Project tasks', projectTasks);
  }

  private _getProjectTaskById = async () => {

    const id = '3a701829-2d77-e911-8166-000d3a6dc32c';

    const publishedTask: PublishedTask = await project.projects.getById(this.props.projectId).tasks.getById(id).get();
    console.log('Published task', publishedTask);

    const publishedAssignmentCollection: PublishedAssignmentCollection[] = await project.projects.getById(this.props.projectId).tasks.getById(id).assignments.get();
    console.log('Published Assignment Collection', publishedAssignmentCollection);

    const calendar: Calendar = await project.projects.getById(this.props.projectId).tasks.getById(id).calendar.get();
    console.log('Calendar', calendar);

    const customFieldCollection: CustomFieldCollection[] = await project.projects.getById(this.props.projectId).tasks.getById(id).customFields.get();
    console.log('Custom Field Collection', customFieldCollection);

    const parentTaskLink: PublishedTask = await project.projects.getById(this.props.projectId).tasks.getById(id).parent.get();
    console.log('Parent Task Link', parentTaskLink);

    const predecessorTasks: PublishedTaskLinkCollection[] = await project.projects.getById(this.props.projectId).tasks.getById(id).predecessors.get();
    console.log('Predecessor Tasks', predecessorTasks);

    const successorTasks: PublishedTaskLinkCollection[] = await project.projects.getById(this.props.projectId).tasks.getById(id).successors.get();
    console.log('Successor Tasks', successorTasks);

    const statusManager: User = await project.projects.getById(this.props.projectId).tasks.getById(id).statusManager.get();
    console.log('Status Manager', statusManager);

  }





}
