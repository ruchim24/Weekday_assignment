import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Modal from "./Modal";

function Jobs({data,state}) {
  const [Data,setData] = useState([]);
  const [modal,setModal] = useState({show:false,info:''});

     useEffect(() => {
            const filterData = [...data];
            const newData = filterData?.filter(d => {
                if((state['jobRole']?.length > 0 ? state['jobRole']?.includes(d.jobRole) : true)
                 && (state['minExp'] ? d.minExp == parseInt(state['minExp']) : true) 
                && (state['location'] ? d.location?.toUpperCase() === state['location']?.toUpperCase(): true)
               && (state['companyName'] ? d.companyName?.toUpperCase()?.includes(state['companyName']?.toUpperCase()) : true)) return true;
            })
            setData(newData);
       },[data,state]);

    return (
        <> 
            {Data?.map((d) => {
                return (
                    <Grid item md={4}>
                        <Cards info={d} setModal={setModal}/>
                    </Grid>
                )
            })}
            {Data?.length == 0 &&
            <h1>No Data Found</h1>
            }
            { 
             modal.show &&
              <Modal open={modal} setOpen={setModal} />
            }
        </>
    )
}

export default Jobs;