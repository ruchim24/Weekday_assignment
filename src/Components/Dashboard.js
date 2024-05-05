import React, { useEffect, useRef, useState } from 'react';
import Cards from './Cards';
import { Container, Grid } from '@mui/material';

function Dashboard() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);

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
        const { scrollTop, clientHeight, scrollHeight} = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            fetchData();
          }
    };

    useEffect(() => {
        console.log(isLoading,"useEffect")
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

//     const newData = [];
//    useEffect(() => {
//     if(Object.keys(filters)?.length > 0){
//         const filterData = data?.filter(d => {
//             for(const filter in filters){
//                 if(d[filter] !== filters[filter]){
//                     return false;
//                 }
//                 return true;
//             }
//         })
//         newData.push(...filterData);
//     }
//    },[data]);
  

//     console.log(data, "data", typeof (data), page, isLoading, newData);
//     const finalData = newData?.length > 0 ? newData : data;
    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    {data?.map((d) => {
                        return (
                            <Grid item md={4}>
                                <Cards info={d} />
                            </Grid>
                        )
                    })}
                </Grid>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
            </Container>
        </>
    );
}

export default Dashboard;