import React, { useEffect, useState } from "react"
import "./homepage.css"
import Header from "../Header/header"
import Table from "../Table/table"
import ViewDetailModel from "./ViewDetailModel"
import axios from "axios";
import img1 from "../../images.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeHeader from "./header/homeHeader"
import { Box, LinearProgress, Typography } from "@mui/material"
import { PublishLoader } from "../PublishLoader/loader"


const Homepage = ({ user }) => {
    const [list, setList] = useState([])
    const [item, setItem] = useState({})
    const [view, setView] = useState(false)
    const [refetch, setRefetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        setLoading(true); // Set loading state to true before API call

        axios.get(`${window.location.origin}/getAllRecordSets`, {

            headers: {
                Authorization: `Bearer ${token}` // Include token in the request headers
            }
        })
            .then(res => {
                let dummy = [];
                res?.data?.records.map((item, index) => {
                    dummy.push({
                        id: index + 1,
                        // IP:item?.ResourceRecords,
                        ...item
                    })
                })

                setList(dummy);
                setFilteredData(dummy);
            })
            .catch(error => {
                console.error("Error:", error.message);
                toast("something goes wrong with Network!");
            })
            .finally(() => {
                setLoading(false); // Set loading state to false after API call completes
            });

    }, [refetch]);

    const [searchInput, setSearchInput] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const filtered = list.filter(item =>
            (item.email && typeof item.email === 'string' && item.email.toLowerCase().includes(searchInput.toLowerCase())) ||
            (typeof item.phone === 'number' && item.phone.toString().includes(searchInput.toLowerCase())) ||
            (item.name && typeof item.name === 'string' && item.name.toLowerCase().includes(searchInput.toLowerCase()))
        );

        setFilteredData(filtered);
    }, [searchInput]);

    const [sortType, setSortType] = useState(null);

    const handleSort = (type) => {
        setSortType(type);
    };

    // useEffect(() => {
    //     let sortedData = [...list];

    //     switch (sortType) {
    //         case 'A-Z':
    //             sortedData.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
    //             break;
    //         case 'Z-A':
    //             sortedData.sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1));
    //             break;

    //         default:
    //             break;
    //     }

    //     setFilteredData(sortedData);
    // }, [sortType]);
    const handleDelete = ({ item }) => {
        setItem(item);
        doDelete();
    }
    const doDelete = async (item) => {
       
        try {
            // setLoading(!loading);

            const response = await axios.delete(`${window.location.origin}/deleteRecord`, {
                data: {
                    ...item
                },
                headers: {
                    Authorization: `Bearer ${token}` // Include token in the request headers
                }
            });

            if (response.status === 200) {
                console.log('User deleted successfully:', response.data.message);
                setRefetch(!refetch);
                toast.success("Record Deleted successfully")
            } else if (response.status === 404) {
                console.log('User not found');
            } else {
                console.error('Error deleting user:', response.data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            console.log("loading",loading);
            setLoading(false); // Set loading state to false after API call completes (success or error)
        }
    };

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('storedList'));
        if (storedList) {
            setList(storedList);
        }
        const storedSortType = localStorage.getItem('storedSortType');
        if (storedSortType) {

            setSortType(storedSortType);

        }

    }, []);

    useEffect(() => {
        localStorage.setItem('storedList', JSON.stringify(list));

    }, [list]);

    useEffect(() => {
        localStorage.setItem('storedSortType', sortType);
    }, [sortType]);

    return (
        <div className="homepage">
            <Header user={user} />

            <div className="container">
                <ToastContainer />
                <HomeHeader filteredData={filteredData} />
                {/* <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    marginTop: 4,
                    marginBottom: 4,
                    alignItems: "flex-start",
                    width: "90%"
                }}>
                    <div style={{ display: "flex", }}>Sort By :</div>
                    <div style={{ display: "flex", flexDirection: "row", gap: 7 }}>
                        <button onClick={() => handleSort('A-Z')}>A-Z</button>
                        <button onClick={() => handleSort('Z-A')}>Z-A</button>
                    </div>
                </div> */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
                    {
                        filteredData.length > 0 ? <>
                            <div style={{ width: "95%", display: "flex", justifyContent: "center", flexDirection: "column", marginLeft: "2%" }}>
                                <Typography>Record Details -</Typography>
                                <Table filteredData={filteredData} setView={setView} setItem={setItem} doDelete={doDelete} loading={loading} setLoading={setLoading} />
                                <ViewDetailModel
                                    view={view}
                                    setView={setView}
                                    item={item}
                                    setItem={setItem}
                                    refetch={refetch}
                                    setRefetch={setRefetch} />
                            </div>
                        </> : loading ? <>
                            <PublishLoader open={loading} />
                        </> : <>
                            <div style={{ alignItems: "center", height: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <img src={img1} />
                                No data
                            </div>
                        </>
                    }
                </div>
            </div>



        </div>

    )
}

export default Homepage