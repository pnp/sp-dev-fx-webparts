import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IDetailsDialogProps from './IDetailsDialogProps';
import styles from './DetailsDialog.module.scss';


const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);
export default class DetailsDialog extends React.Component<IDetailsDialogProps>{
  public render(): React.ReactElement<IDetailsDialogProps> {
    const book = this.props.book;
    return <div className={styles.DetailsDialog}>
      <Dialog
      maxWidth={"md"}      
        onClose={this.props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={this.props.open}
        className={styles.DetailsDialog}
      >
       
        <MuiDialogTitle disableTypography className={styles.dialogTitle}>
      <Typography variant="h6">{this.props.book.Title}</Typography>
      {this.props.handleClose ? (
        <IconButton aria-label="Close" className={styles.closeButton} onClick={this.props.handleClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
        <DialogContent>
          <img src={book.Image.Url} alt={book.Title} className={styles.image}/>
          <Typography className={styles.details}>
            {book.Details}
          </Typography>
        </DialogContent>
      </Dialog>
    </div>;
  }
}