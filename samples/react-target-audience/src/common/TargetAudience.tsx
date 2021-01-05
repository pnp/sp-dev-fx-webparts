import * as React from "react";
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import spservices from "../service/spservices";
import { PageContext } from "@microsoft/sp-page-context";
export interface ITargetAudienceProps {
    pageContext:PageContext;
    groupIds: IPropertyFieldGroupOrPerson[];
}
export interface ITargetAudienceState {
    canView?: boolean;
}
export default class TargetAudience extends React.Component<ITargetAudienceProps, ITargetAudienceState>{
    constructor(props: ITargetAudienceProps) {
        super(props);
        this.state = {
            canView: false
        } as ITargetAudienceState;

    }
    public componentDidMount(): void {
        //setting the state whether user has permission to view webpart
        this.checkUserCanViewWebpart();
    }
    public render(): JSX.Element {
        return (<div>{this.props.groupIds? (this.state.canView ? 
            this.props.children : ``):this.props.children}</div>);
    }
    public checkUserCanViewWebpart(): void {
        const self = this;
        let proms = [];
        const errors = [];
        const _sv = new spservices();
        self.props.groupIds.map((item) => {
            proms.push(_sv.isMember(item.fullName, self.props.pageContext.legacyPageContext[`userId`], self.props.pageContext.site.absoluteUrl));
        });
        Promise.race(
          proms.map(p => {
            return p.catch(err => {
              errors.push(err);
              if (errors.length >= proms.length) throw errors;
              return Promise.race(null);
            });
          })).then(val => {
            this.setState({ canView: true }); //atleast one promise resolved
        });
    }
}
