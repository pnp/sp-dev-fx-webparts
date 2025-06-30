import * as React from 'react';
//import styles from './Tags.module.scss';
import { Space, Tag } from 'antd';

export interface ITagsProps {
    keywords: string[];
}

const Tags: React.FunctionComponent<ITagsProps> = ({ keywords }) => {

    if (!keywords || keywords.length === 0) {
        return null;
    }

    return (
        <Space size={[0, 8]} wrap>
            {keywords.map((keyword: any, i) =>
                <Tag color="#108ee9">{keyword}</Tag>
            )}
        </Space>
    );
};
export default Tags;