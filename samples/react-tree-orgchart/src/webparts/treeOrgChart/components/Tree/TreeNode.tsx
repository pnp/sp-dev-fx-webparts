import * as React from "react";

interface TreeNodeProps {
  node: any;
  renderNode: (node: any) => JSX.Element;
  first: boolean;
  last: boolean;
}

import styles from "./TreeNode.module.scss";

const TreeNode: React.FC<TreeNodeProps> = ({ node, renderNode,first,last }) => {
    const [isExpanded, setIsExpanded] = React.useState(true);
  return (
    <div className={styles.treenode}>
      {renderNode(node)}
      {node.children && node.children.length > 0 && (<span className={isExpanded ? styles.collapseButton:styles.expandButton} onClick={() => setIsExpanded(!isExpanded)}/>)}
      {(!last || !first )&& (<span className={last?styles.lastStyle:first?styles.fistStyle:styles.middleStyle}/>)}
      
      {isExpanded && node.children && node.children.length > 0 && (
        <div className={styles.treechildren}>
            <div className={styles.line}/>
            <div className={styles.nodes}>
          {node.children.map((child: any,index:number) => (
            <TreeNode key={child.id} node={child} first={index===0} last={node.children && node.children.length === index+1} renderNode={renderNode} />
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeNode;