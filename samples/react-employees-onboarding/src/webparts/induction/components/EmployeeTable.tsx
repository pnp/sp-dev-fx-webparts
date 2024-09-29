import * as React from 'react';
import { Table } from '@mantine/core';
import { EmployeeOnboarding } from '../../../types/Components.Types';
import { IconSquareCheck, IconSquareLetterX } from '@tabler/icons-react';

interface EmployeeTableProps {
    data: EmployeeOnboarding[];
    fileName?: string;
    isCompleted?: boolean;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ data, fileName, isCompleted }) => {
    return (
        <Table striped highlightOnHover withBorder withColumnBorders>
            {fileName && <caption>{fileName}</caption>}
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    {isCompleted && (
                        <>
                            <th>Team Membership</th>
                            <th>Notification</th>
                        </>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((element: EmployeeOnboarding, index) => (
                    <tr key={index}>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>
                            {isCompleted ? (
                                element.department ? <IconSquareCheck color='#006600' /> : <IconSquareLetterX color="#ED2939" />
                            ) : (
                                element.department
                            )}
                        </td>
                        {isCompleted && (
                            <>
                                <td>{element.teamMembership ? <IconSquareCheck color='#006600' /> : <IconSquareLetterX color="#ED2939" />}</td>
                                <td>{element.notification ? <IconSquareCheck color='#006600' /> : <IconSquareLetterX color="#ED2939" />}</td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default EmployeeTable;