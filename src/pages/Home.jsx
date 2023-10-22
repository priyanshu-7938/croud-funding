import React,{ useState, useEffect } from "react";

import { useStateContext } from "../context";
import DisplayCampaigns from "../components/DisplayCampaigns";

const Home = ()=>{
    const [ isLoading, setIsLoading ] = useState(false);
    const [ campaigns ,setCampaigns ] = useState({});

    const { address ,contract ,getCampaigns } = useStateContext();
    const fetchCampaigns = async ()=>{
        setIsLoading(true);
        const data = await getCampaigns();
        setCampaigns(data);
        console.log(data);
        setIsLoading(false);
    }
    useEffect(()=>{
        if(contract!=undefined){
            fetchCampaigns();
        }
    },[contract]);

    return (
        <>  
            <DisplayCampaigns
                title="All Campaigns"
                isLoading={isLoading}
                campaigns={campaigns}
            />
        </>
    )
}
export default Home;