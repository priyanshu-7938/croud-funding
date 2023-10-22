import React from "react";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils"

const FundCard = ({owner, title, description, target, deadline, amountCollected,  image, handelClick})=>{
    const remaningDays = daysLeft(deadline.toNumber());

    return ( 
        <div className="sm:w-[288px] ww-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handelClick}>
            <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]" />
            <div className="flex flex-col p-4">
                <div className="flex flex-row items-center mb-[18px]">
                    <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain" />
                    <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Education</p>
                </div>
                <div className="block">
                    <h3 className="text-[16px] text-white text-left leading-[26px] truncate font-epilogue">{title}</h3>
                    <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{description}</p>
                </div>
                <div className="flex justify-between flex-wrap mt-[15px] gap-2">
                    <div className="flex flex-col ">
                        <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{amountCollected}</h4>
                        <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Raised Of {target}</p>
                    </div>
                    <div className="flex flex-col ">
                        <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{remaningDays}</h4>
                        <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Days Left</p>
                    </div>
                </div>
                <div className="flex items-center gap-[12px] mt-[20px]">
                    <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]"><img src={thirdweb} alt="usser" className="w-1/2 h-1/2 object-contain" /></div>
                    <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{owner}</span></p>
                </div>
            </div>
        </div>
    )
}

export default FundCard;