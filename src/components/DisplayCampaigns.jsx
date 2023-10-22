import React from "react";
import { useNavigate } from "react-router-dom";
import FundCard from "./FundCard";
import Loader from "./Loader";

const DisplayCampaigns = ({title, isLoading, campaigns})=>{
    const navigate = useNavigate();
    const handelNavigate = (campaign)=>{
        navigate(`/campaign-detail/${campaign.title}`,{ state:campaign});
    }
    return (
        <>
            <h1 className="font-epilogue font-semibold text-18 text-white text-left">{title}.. ({campaigns.length})</h1>
            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {isLoading && (
                    <Loader/>
                )}
                {(!isLoading && campaigns.length === 0) && (
                    <p className="font-epilogue font-semibold text-[14px] leadning-[30px] text-[#818183]">
                        You have Not created any Campaigns.
                    </p>
                )}
                {(!isLoading && campaigns.length > 0) && (
                    campaigns.map((campaign)=>
                        <FundCard
                            key={campaign.pid}
                            {...campaign}
                            handelClick={()=>handelNavigate(campaign)}
                        />
                    )
                )}

            </div>
        </>
    )
}

export default DisplayCampaigns;