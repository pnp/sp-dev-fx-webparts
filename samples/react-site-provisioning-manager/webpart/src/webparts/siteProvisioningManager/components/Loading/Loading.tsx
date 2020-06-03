import * as React from "react";
import styles from "../App/App.module.scss";
const loadingImage: any = require("../Assets/loading_dots.gif");

interface ILoadingProps{
    hidden:boolean;
}

const Loading: React.FC<ILoadingProps> = (props) => {
    return (
        <div hidden={props.hidden}>
            <h3>
                Please wait, this process takes a while...
                </h3>
            <img src={loadingImage} className={styles.loadingImage} />
        </div>
    );
};

export default Loading;