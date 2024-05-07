import React, { useEffect, useRef, useState } from 'react';
import Cards from './Cards';
import { Box, Container, Grid, TextField } from '@mui/material';
import SelectInput from './Select';
import Jobs from './Jobs';
import SingleSelect from './SingleSelect';


function Dashboard() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [state, setState] = useState({
        jobRole: [],
        companyName: '',
        minExp: '',
        location: '',
    });

    const filters = {
        minExp: 3,
        location: ['mumbai', 'delhi'],
        companyName: 'Intel'
    };

    const renderCalled = useRef(false);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const body = JSON.stringify({
                "limit": 10,
                "offset": page
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body
            };

            const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
            const result = await response.json();
            setData(prev => [...prev, ...result?.jdList]);
            setPage(prev => prev + 1);
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (renderCalled.current) {
            fetchData();
        }
        renderCalled.current = true;
    }, []);

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            fetchData();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

   
    const handleChange = (key, event) => {
        let value = event.target.value;
        if (key == 'jobRole') {
            let val = value[value.length - 1];
            if (state[key]?.includes(val)) {
                value = value.filter(y => y == val);
            }
        }
        setState({ ...state, [key]: value });
    }

    const locations = [
        {value:"",label:"Select Location"}, 
        {value:"Mumbai",label:"Mumbai"},
        {value:"Delhi ncr",label:"Delhi ncr"}, 
        {value:"Banglaore",label:"Banglore"}, 
        {value:"Chennai",label:"Chennai"},
        {value:"Remote",label:"Remote"}
    ];
    const exp = [
        {value:'',label:'Select Experience'},
        {value:1,label:'1'},
        {value:2,label:'2'},
        {value:3,label:'3'},
        {value:4,label:'4'},
        {value:5,label:'5'},
        {value:6,label:'6'},
        {value:7,label:'7'},
        {value:8,label:'8'},
        {value:9,label:'9'},
        {value:10,label:'10'}
    ];
    return (
        <>
            <Container>
                <Grid container spacing={2} sx={{ margin: '10px auto' }}>
                    <Grid items md={4}>
                        <SelectInput
                            label="Roles"
                            options={["frontend", "ios","tech lead","android","backend"]}
                            selectedValues={state}
                            index="jobRole"
                            setSelectedValues={setState}
                            handleChange={(e) => handleChange("jobRole", e)}
                            multiple={true}
                        />
                    </Grid>
                    <Grid items md={2}>
                        <SingleSelect
                            label="Minimum Experience"
                            options={exp}
                            value={state.minExp}
                            handleChange={(e) => handleChange("minExp", e)}
                        />
                    </Grid>
                    <Grid items md={2}>
                        <SingleSelect
                            label="Location"
                            options={locations}
                            value={state.location}
                            handleChange={(e) => handleChange("location", e)}
                        />
                    </Grid>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="name"
                                label="Company Name"
                                value={state.companyName}
                                onChange={(e) => handleChange("companyName",e)}
                            />
                        </div>
                    </Box>
                </Grid>
                <Grid container spacing={2} sx={{ margin: "20px auto" }}>
                    <Jobs data={data} state={state} />
                </Grid>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
            </Container>
        </>
    );
}

export default Dashboard;