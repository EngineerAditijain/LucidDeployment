import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: a,s
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ShowDetail({ open, setOpen}) {
    const handleClose = () => setOpen(false);
    

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        <>
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 4 , justifyContent:"space-between"}}>
                                    <div className='flex flex-col gap-4 '>
                                        <p style={{fontSize:"1.2rem", fontWeight:"bold"}}>Hosted zone name :</p>
                                        <Typography id="modal-modal-title" >
                                            mooo.com
                                        </Typography>
                                        <p style={{fontSize:"1.2rem", fontWeight:"bold"}}>Hosted zone ID</p>
                                        <Typography id="modal-modal-title" >
                                        Z00500433TW4TOQ8B9XXT
                                        </Typography>
                                        <p style={{fontSize:"1.2rem", fontWeight:"bold"}}>Description</p>
                                        <Typography id="modal-modal-title" >
                                       -
                                        </Typography>
                                    </div>
                                    
                                    <div className='ml-7'>
                                        <p style={{fontSize:"1.2rem", fontWeight:"bold"}}>Name servers</p>
                                        <Typography id="modal-modal-title" >
                                            ns-1214.awsdns-23.org <br/>
                                            ns-831.awsdns-39.net <br/>
                                            ns-69.awsdns-08.com <br/>
                                            ns-1559.awsdns-02.co.uk
                                        </Typography>
                                    </div>
                                </div>
                                {/* <img src={Edit} onClick={() => setEdit(true)} /> */}

                            
                        </>
                    }

                </Box>
            </Modal>
        </div>
    );
}