import * as React from 'react';
import IPersonaCardListProps from './IPersonaCardListProps';
import IPersonaCardListState from './IPersonaCardListState';
import { PersonaCard } from '../../index';
import { IRectangle } from '@uifabric/utilities';
import { List } from 'office-ui-fabric-react/lib/List';

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 352;

export class PersonaCardList extends React.Component<IPersonaCardListProps, IPersonaCardListState> {

    private _positions: any;
    private _columnCount: number;
    private _columnWidth: number;
    private _rowHeight: number;
    private _previewImageHeight:number;  
    private _previewImageWidth:number; 
    private _pageWidth:number;
    private _pageHight: number;
    
    constructor(props) {
        super();        
        this._positions = {};
        this._getItemCountForPage = this._getItemCountForPage.bind(this);
        this._getPageHeight = this._getPageHeight.bind(this);              
    }
    
    public render() {        
        const items = this.props.items; 
        return (  
            <List                
                items={ items } 
                getItemCountForPage={ this._getItemCountForPage }
                getPageHeight={ this._getPageHeight }
                renderedWindowsAhead={ 3 }                
                onRenderCell={ (item, index) => (                                      
                    <div style={ {
                        width:this._columnWidth,
                        height:this._rowHeight,                        
                        marginRight: (index + 1 ) % this._columnCount === 0 ? 0: 20,                                         
                    } }>                  
                        <PersonaCard user={item} 
                            getPropertiesForUsers={this.props.getPropertiesForUsers}                           
                        />   
                    </div>                 
                )}/>                   
        );  
    } 

    private _getItemCountForPage(itemIndex: number, surfaceRect: IRectangle) {
        let i = 10; 
        this._pageWidth = surfaceRect ? surfaceRect.width : 0;      
        let h =  surfaceRect ? surfaceRect.height : 0;      
        if (itemIndex === 0){
            this._columnCount = Math.floor((this._pageWidth + 20) / 360);
            this._columnCount = Math.min(3, this._columnCount);
            i = Math.ceil(i / this._columnCount) * this._columnCount;    

            this._columnWidth =  Math.min((this._pageWidth - 20 * (this._columnCount - 1)) / this._columnCount, 360);  
            if(this._columnCount === 1){
                this._columnWidth = this._pageWidth;
            }        
            this._rowHeight = 222;
        } 
        return this._columnCount * ROWS_PER_PAGE;
    }

    private _getPageHeight(itemIndex: number, surfaceRect: IRectangle) {
        return this._rowHeight * this._columnCount;
    }
}