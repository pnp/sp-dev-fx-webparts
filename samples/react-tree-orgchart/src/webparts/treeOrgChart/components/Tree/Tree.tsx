/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import TreeNode from './TreeNode';

interface TreeProps {
  data: any[];
  renderNode: (node: any) => JSX.Element;
}
import styles from "./TreeNode.module.scss";

const Tree: React.FC<TreeProps> = ({ data, renderNode }) => {
  return (
    <div className={styles.tree}>
      {data.map((node,index) => (
        <TreeNode key={index} node={node} parentlast={true} last={data.length === index+1} renderNode={renderNode} />
      ))}
    </div>
  );
};

export default Tree;