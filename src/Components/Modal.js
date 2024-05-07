import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({open,setOpen}) {
  return (
    <React.Fragment>
      <Dialog
        open={open.show}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {setOpen({...open,show:false})}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{<b>About Company</b>}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {open.info}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}