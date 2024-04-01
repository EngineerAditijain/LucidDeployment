import React, { useState } from 'react'
import { Stack, TextField, Button, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublishLoader } from '../../PublishLoader/loader';
const Form = () => {
    //   let {subdomainname,type,TTL,IPaddress}=request.body;
    let options = ["A","AAAA","CAA","CNAME","DS","MX","NS","PTR","SOA","SRV","TXT","DNSSEC"]
    const [formData, setFormData] = useState({
        subdomainname: '',
        type: '',
        TTL: 0,
        IPaddress: '',

    });
    const[loading, setLoading] = useState(false);
    const history = useHistory();
    const token = localStorage.getItem('token');
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("value", value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${window.location.origin}/addrecord`, {
            subdomainname: formData.subdomainname,
            type: formData.type,
            TTL: formData.TTL,
            IPaddress: formData.IPaddress,
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in the request headers
            }
        }).then(res => {
            alert(res.data.message);
            // window.location.reload();
            // history.push("/")
            setFormData({
                subdomainname: '',
                type: '',
                TTL: 0,
                IPaddress: '',
            }); // You can access formData here and perform your desired actions
            history.push("/home");
            setLoading(false);
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                history.push("/home");
                toast.error(`Error: ${error.response.data.message}`);
            } else if (error.request) {
                // The request was made but no response was received
                history.push("/home");
                toast.error('Error: No response received from server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                history.push("/home");
                toast.error(`Error: ${error.message}`);
            }
        });
    };
    

    return (
        <div className='flex flex-col w-full'>
            {loading?<>
            <PublishLoader open={loading}/></>:<form className="gap-8">
                <Stack direction="row" alignItems="center" className='justify-between mt-4 '>
                    <TextField label='Subdomain Name' name='subdomainname' value={formData.subdomainname} onChange={handleChange} className="bg-[#DFDCF7] rounded-md" sx={{
                        "& .MuiInputLabel-root": {
                            color: "#5262bc", // Custom color for label
                        },
                        "& .MuiInputBase-root": {
                            color: "#5262bc", // Custom color for entered text
                        },
                        "& fieldset": { border: 'none' },
                        borderRadius: "0.8rem",
                        outline: "none"
                    }} size='small' />
                    <TextField label='TTL' name='TTL' value={formData.TTL} onChange={handleChange} className="bg-[#DFDCF7] rounded-md" type='number' sx={{
                        "& .MuiInputLabel-root": {
                            color: "#5262bc", // Custom color for label
                        },
                        "& .MuiInputBase-root": {
                            color: "#5262bc", // Custom color for entered text
                        },
                        "& fieldset": { border: 'none' },
                        borderRadius: "0.8rem",
                    }} size='small' />

                </Stack>
                <Stack direction="row" alignItems="center" className='justify-between mt-4'>

                    {/* <TextField label='Designation' name='designation' value={formData.designation} onChange={handleChange} className="bg-[#DFDCF7] rounded-md" sx={{
                        "& .MuiInputLabel-root": {
                            color: "#5262bc", // Custom color for label
                        },
                        "& .MuiInputBase-root": {
                            color: "#5262bc", // Custom color for entered text
                        },
                        "& fieldset": { border: 'none' },
                        borderRadius: "0.8rem",
                    }} size='small' /> */}
                    <TextField label="IPaddress" name="IPaddress" value={formData.IPaddress} onChange={handleChange} size='small' sx={{
                        background: "#DFDCF7",
                        borderRadius: "5px",
                        "& .MuiInputLabel-root": {
                            color: "#5262bc", // Custom color for label
                        },
                        "& .MuiInputBase-root": {
                            color: "#5262bc", // Custom color for entered text
                        },
                        "& fieldset": { border: 'none' },
                        borderRadius: "0.8rem",
                    }} />

                </Stack>
                <Stack direction="row" alignItems="center" className='justify-between mt-4'>


                    <Select
                        value={formData.type}
                        onChange={handleChange}
                        name="type"
                        displayEmpty
                        size="small"
                        sx={{
                            minWidth: '120px',
                            background: "#DFDCF7",
                            borderRadius: "5px",
                            "& .MuiSelect-selectMenu": {
                                color: "#5262bc", // Custom color for selected value
                            },
                            "& .MuiInputLabel-root": {
                                color: "#5262bc", // Custom color for label
                            },
                            "& .MuiInputBase-root": {
                                color: "#5262bc", // Custom color for entered text
                            },
                        }}
                    >
                        <MenuItem value="" disabled>
                           Type
                        </MenuItem>
                        {options.map((item, ind)=>(
                        <MenuItem value={item} key={ind}>{item}</MenuItem>

                        ))}
                        
                    </Select>

                </Stack>
                

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: "1rem", marginBottom: "1rem" }}>
                    <Button variant="contained" color="primary" size='medium' fullWidth={false} onClick={handleSubmit} >Submit</Button>
                </div>
            </form>}
        </div>
    )
}

export default Form