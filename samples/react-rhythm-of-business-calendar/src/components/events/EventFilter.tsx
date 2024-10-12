import { FC, ReactElement } from "react";
import { Entity, MomentRange, User } from "common";
import { Approvers, Event, EventOccurrence, Refiner, RefinerValue } from "model";
import { useConfigurationService, useDirectoryService } from "services";
import { useTimeZoneService } from "services";

interface IProps {
    events: readonly Event[];
    dateRange: MomentRange;
    refiners: readonly Refiner[];
    selectedRefinerValues: Set<RefinerValue>;
    approvers: readonly Approvers[];
    searchText: string;
    viewType?: string;
    exactMatch: boolean;
    selectedItem: any;
    siteTimeZone?: string;
    children: (cccurrences: readonly EventOccurrence[]) => ReactElement;
  

}

export const EventFilter: FC<IProps> = ({ events, dateRange, refiners, selectedRefinerValues, approvers, searchText, viewType, exactMatch, selectedItem, siteTimeZone, children}) => {
    const { currentUser, currentUserIsSiteAdmin } = useDirectoryService();
    const { active: { useApprovals, useRefiners } } = useConfigurationService();
    const currentUserApprovers = approvers.filter(a => a.userIsAnApprover(currentUser));
    const { isDifferenceInTimezone } = useTimeZoneService();
    const filteredEventOccurrences = events
        .filter(event => {
            //if (viewType !== 'list') {
                return !event.isSeriesException;
           // }
          //  return true;
        })
        .filter(Entity.NotDeletedFilter)       
        // .filter(event => {
        //     if(searchText !== ""){
        //        if(event.displayName.toLowerCase().includes(searchText.toLowerCase()) || event.description.toLowerCase().includes(searchText.toLowerCase()) || event.location.toLowerCase().includes(searchText.toLowerCase())){
        //         return event.displayName !== undefined;
        //        }
        //        if (event.contacts.length > 0){
        //             for(var i=0; i<event.contacts.length; i++){
        //                 if((event.contacts[i].title.toLowerCase().includes(searchText.toLowerCase())) || (event.contacts[i].email.toLowerCase().includes(searchText.toLowerCase()))){
        //                     return event.displayName !== undefined;
        //                 }
        //             }
        //         }
        //     }           
        //     else{
        //         return event.displayName !== undefined; 
        //     }
        // })          
        .filter(event => {
            if (event.isApproved) {
                return true;
            } else if (event.isRejected && User.equal(event.creator, currentUser)) {
                return true;
            } else if (event.isPendingApproval) {
                if (!useApprovals)
                    return true;
                else if (currentUserIsSiteAdmin)
                    return true;
                else if (User.equal(event.creator, currentUser))
                    return true;
                else if (Approvers.appliesToAny(currentUserApprovers, event.valuesByRefiner()))
                    return true;
                else
                    return false;
            }
        })
        .flatMap(event => event.expandOccurrences(isDifferenceInTimezone, dateRange, viewType, siteTimeZone))
        .filter(occurrence => {
            if(searchText !== ""){
               if(occurrence.event.displayName.toLowerCase().includes(searchText.toLowerCase()) || occurrence.event.description.toLowerCase().includes(searchText.toLowerCase()) || occurrence.event.location.toLowerCase().includes(searchText.toLowerCase())){
                return occurrence.event.displayName !== undefined;
               }
               if (occurrence.event.contacts.length > 0){
                    for(var i=0; i<occurrence.event.contacts.length; i++){
                        if((occurrence.event.contacts[i].title.toLowerCase().includes(searchText.toLowerCase())) || (occurrence.event.contacts[i].email.toLowerCase().includes(searchText.toLowerCase()))){
                            return occurrence.event.displayName !== undefined;
                        }
                    }
                }
            }           
            else{
                return occurrence.event.displayName !== undefined; 
            }
        }) 
        .filter(occurrence => {
            const valuesByRefiner = occurrence.event.valuesByRefiner();
            return !useRefiners || refiners.every(refiner => {
                const values = valuesByRefiner.get(refiner);
                if (values)
                    return values.some(v => selectedRefinerValues.has(v));
                else if (!refiner.required)
                    return selectedRefinerValues.has(refiner.blankValue);
                else
                    return true;
            });
        });

    return children(filteredEventOccurrences);
};