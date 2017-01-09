import * as React from "react";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";
const connect = require("react-redux").connect;
import SystemStatus from "../model/SystemStatus";
import Content from "../components/content";
interface IAppProps extends React.Props<any> {
  systemStatus: SystemStatus;
}
function mapStateToProps(state) {
  return {
    systemStatus: state.systemStatus,
  };
}
function mapDispatchToProps(dispatch) {
  return {
  };
}
class App extends React.Component<IAppProps, void> {
  private messageBar(error: string): JSX.Element {
    if (error === "") {
      return (<div />);
    }
    else {
      return (
        <MessageBar messageBarType={MessageBarType.error}>{error} </MessageBar>
      );
    }
  }
  public render() {
    const { children} = this.props;
    return (
      <div>

        <div>
          {this.messageBar(this.props.systemStatus.fetchStatus)}
          <div>{this.props.systemStatus.currentAction}
          </div>
        </div>
        <Content isVisible={true}>
          {children}
        </Content>
      </div >
    );
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
