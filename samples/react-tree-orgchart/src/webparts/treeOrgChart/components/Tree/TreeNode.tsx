/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

interface TreeNodeProps {
  node: any;
  renderNode: (node: any) => JSX.Element;
  parentlast: boolean;
  last: boolean;
}

import styles from "./TreeNode.module.scss";

const TreeNode: React.FC<TreeNodeProps> = ({ node, renderNode,parentlast,last }) => {
    const [isExpanded, setIsExpanded] = React.useState(true);
    console.log(last);
    console.log(parentlast);
    console.log(node.title.props.text);
  return (
    <div className={styles.treenode}>
      {renderNode(node)}
      {node.children && node.children.length > 0 && (<span className={isExpanded ? styles.collapseButton:styles.expandButton} onClick={() => setIsExpanded(!isExpanded)}/>)}
      <span className={styles.middleStyle}/>
      
      {isExpanded && node.children && node.children.length > 0 && (
        <div className={styles.treechildren}>
          <span style={{display:'none'}}>{node.title.props.text}</span>
          <span style={{display:'none'}}>{node.children.length}</span>
            {<div className={node.children.length===1?styles.linetop:styles.line}/>}
            
            <div className={styles.nodes}>
          {node.children.map((child: any,index:number) => (
            <TreeNode key={index} node={child} parentlast={last} last={node.children.length === (index+1)} renderNode={renderNode} />
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeNode;