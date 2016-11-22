import * as React from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import * as MyActions from "./actions/myAction";

export interface StateProps {
  massagedFoo: number;
  message: string;
}

export interface DispatchProps {

}

export type HomeProps = StateProps & DispatchProps;

function mapStateToProps(state) {
  return {
    massagedFoo: state.myAction.massagedFoo,
    message: state.myAction.message
  };
}

function mapDispatchToProps(dispatch) {
  return ;
}


export class Home extends React.Component<HomeProps, any> {
  render() {
    const {
      massagedFoo,
      message,

    } = this.props;

    return (
      <div>
        <div>foo: {massagedFoo} message: {message}</div>

      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);