import * as React from 'react';
import styles from './ProjectAssignments.module.scss';
import { IProjectAssignmentsProps } from './IProjectAssignmentsProps';
import { project, User, CustomFieldCollection, PublishedAssignmentCollection, Calendar, PublishedTaskLinkCollection, PublishedTask, PublishedAssignment, PublishedProjectResource } from "pnpjs-project-online-package";
import { Button } from "office-ui-fabric-react/lib/Button";

export class ProjectAssignments extends React.Component<IProjectAssignmentsProps, {}> {

  public render(): React.ReactElement<IProjectAssignmentsProps> {
    return (
      <div className={styles.buttons}>
        <Button text='Get all project assignments' onClick={this._getAllProjectAssignments}></Button>
        <Button text='Get project assignment by Id' onClick={this._getProjectAssignmentById}></Button>
      </div>
    );
  }

  private _getAllProjectAssignments = async () => {
    const projectAssignments: PublishedAssignmentCollection[] = await project.projects.getById(this.props.projectId).assignments.get();
    console.log('Project assignments', projectAssignments);
  }

  private _getProjectAssignmentById = async () => {

    const id = '56701829-2d77-e911-8166-000d3a6dc32c';

    const publishedAssignment: PublishedAssignment = await project.projects.getById(this.props.projectId).assignments.getById(id).get();
    console.log('Assignment', publishedAssignment);

    const assignmentTask: PublishedTask = await project.projects.getById(this.props.projectId).assignments.getById(id).task.get();
    console.log('Assignment Task', assignmentTask);

    const assignmentResource: PublishedProjectResource = await project.projects.getById(this.props.projectId).assignments.getById(id).resource.get();
    console.log('Assignment Resource', assignmentResource);

    const assignmentOwner: PublishedTask = await project.projects.getById(this.props.projectId).assignments.getById(id).owner.get();
    console.log('Assignment Owner', assignmentOwner);

    const customFields: CustomFieldCollection[] = await project.projects.getById(this.props.projectId).assignments.getById(id).customFields.get();
    console.log('Custom Fields', customFields);

    const parentAssignment: PublishedAssignment = await project.projects.getById(this.props.projectId).assignments.getById(id).parent.get();
    console.log('Parent Assignment', parentAssignment);


  }





}
