import BookListItem from "../BookListItem";

export default interface IDetailsDialogProps{
    open:boolean;
    handleClose:()=>void;
    book:BookListItem;
}