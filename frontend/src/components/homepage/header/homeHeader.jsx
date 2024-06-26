import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Stack } from '@mui/material';
import ShowDetail from './showDetail';
import PieChart from './piecart';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export default function HomeHeader({filteredData}) {
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const handleAddSubdomain = () => {
        history.push('/add'); // Navigate to the /add path
    };

    return (
        <div style={{ display: 'flex', flexDirection: "column", gap: 16, width: "100%", marginTop: "1rem" }}>
            <Stack direction={"row"}  alignItems={"center"}>
                <div style={{
                    display:"flex",
                    marginLeft:"2%",
                    flexDirection:"row",
                    alignItems:"center",
                    gap:"3rem"
                }}>
                <div>

                    <div style={{
                        backgroundColor: "white",
                        display: "flex",
                        color: " #2b304b",
                        padding: "6px",
                        borderRadius: "15px",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "fit-content",
                        color: "#393285",
                        fontSize: "27px",
                        fontWeight: 600
                    }}>
                        1
                    </div>
                    <Typography sx={{
                        color: " #2b304b",
                        fontSize: "19px",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: 600
                    }}>
                        Hosted Zone
                    </Typography>
                </div>
                <div>

                  
                </div>
                </div>
                <Card sx={{
                    width: '30%',
                    backgroundColor: "white",
                    borderBottom: "none",
                    borderRadius:"1rem"
                    // alignSelf: "flex-end"
                }}>
                    <CardContent >
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <div>
                                <Typography variant="h6" component="div" sx={{
                                    color: " #2b304b",
                                    fontSize: "22px",
                                    alignItems: "center",
                                    display: "flex",
                                    fontWeight: 600

                                }}>
                                   mooo.com
                                </Typography>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: "space-between",
                                    color: " #2b304b",
                                    fontSize: "22px",
                                    fontWeight: 500,
                               
                                }}>
                                    <Typography  >
                                       Public
                                    </Typography>
                                    

                                    {/* <Button onClick={() => handleEdit(row)}>View</Button>
              <Button onClick={() => handleDelete(row)}>Delete</Button> */}
                                </div>
                            </div>
                            <div style={{
                                    background:"#f0f2f5",
                                padding: "4px",
                                borderRadius: "5px",
                                height: "fit-content",
                                cursor: "pointer",
                                color: " #2b304b",
                                fontSize: "1rem",
                                display: "flex",
                                alignSelf:"center",
                                fontWeight: 600
                            }} onClick={()=>setOpen(true)}>
                               Hosted zone details
                            </div>
                        </Stack>
                    </CardContent>
                </Card>
                <PieChart records={filteredData}/>
                <div className='flex flex-row  '>
                <Button  sx={{
                    alignSelf:"flex-end",
                    background:"white"
                }} onClick={handleAddSubdomain}>Add Subdomain +</Button>
                </div>
                <ShowDetail
                open={open} setOpen={setOpen}/>
            </Stack>
        </div>
    );
}
