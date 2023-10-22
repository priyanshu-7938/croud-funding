import React,{ useState, useEffect } from "react";

import { useStateContext } from "../context";
import DisplayCampaigns from "../components/DisplayCampaigns";

const Profile=()=>{
    const [ isLoading, setIsLoading ] = useState(false);
    const [ myCampaigns ,setMyCampaigns ] = useState({});

    const { address ,contract ,getMyCampaigns } = useStateContext();
    const fetchCampaigns = async ()=>{
        setIsLoading(true);
        const data = await getMyCampaigns();
        setMyCampaigns(data);
        console.log(data);
        setIsLoading(false);
    }
    useEffect(()=>{
        if(contract!=undefined){
            fetchCampaigns();
        }
    },[contract]);
    
    return (
        <>  <DisplayCampaigns
                title="My Campaigns"
                isLoading={isLoading}
                campaigns={myCampaigns}
            />
        </>
    )
}
export default Profile;