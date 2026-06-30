import * as React from 'react';
import { useEffect, useState } from 'react';
import { PageContext } from '@microsoft/sp-page-context';
// import { IPropertyFieldGroupOrPerson } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
import spservice from '../service/spservice';

export interface ITargetAudienceProps {
    pageContext: PageContext;
    context: any;
    groupIds: any[];
    children?: React.ReactNode;
}

const TargetAudience: React.FC<ITargetAudienceProps> = ({ pageContext, groupIds, children, context }) => {
    const [canView, setCanView] = useState<boolean>(false);

    useEffect(() => {
        const checkUserIsAllowedToViewWebpart = async () => {
            let proms: any[] = [];
            const errors: any[] = [];
            const _sv = new spservice();
            groupIds?.map((item : any) => {
                proms.push(
                    _sv.isMember(item, context)
                );
            });
            Promise.race(
                proms.map(p => {
                    return p.catch((err: any) => {
                        errors.push(err);
                        if (errors.length >= proms.length){
                            throw errors;
                        } 
                        return Promise.race(null);
                    });
                }))
                .then(val => {
                    setCanView(true);
                });
        };
        checkUserIsAllowedToViewWebpart();
    }, [groupIds, pageContext]);

    return (
        <div>
            {groupIds != null && groupIds.length >= 1 ? (canView ? children : '') : children}
        </div>
    );
};

export default TargetAudience;