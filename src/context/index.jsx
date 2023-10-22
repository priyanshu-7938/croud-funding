import React,{useContext, createContext, useEffect} from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react'; 
import { ethers } from "ethers";
import { ABI } from "../constants";

const StateContext = createContext();
export const StateContextProvider = ({children})=>{    
    const address = useAddress();
    const connect = useMetamask();
    const { contract, isLoading ,error} = useContract("0x1375030b9667c9AC35896Ab1d84F1157816c8459", ABI);
    const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign");
    const { mutateAsync: donateToCampaign } = useContractWrite(contract, "donateToCampaign")


    const publishCampaign = async (form)=>{
        try {
            console.log(form,parseInt(form.target._hex).toString(),new Date(form.date).getTime());
            const data = await createCampaign({ args: [
                address,//owner
                form.title,//title
                form.description,//description
                form.target,
                new Date(form.deadline).getTime(),//deadline
                form.image
            ] });
            console.log("The data : "+data);
        } catch (err) {
            console.log(err)
        }
    }
    const getCampaigns = async()=>{
        const camp = await contract.call("getCampaigns");
        console.log(camp);
        const parsedCampaign = camp.map((campaign,i)=>({
            owner: campaign.owner,
            title: campaign.title,
            deadline:campaign.deadline,
            description: campaign.description,
            donators:campaign.donators,
            donations: campaign.donations,
            target: ethers.utils.formatEther(campaign.target.toString()),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pid:i
        }))
        return parsedCampaign;
    }

    const donate = async (pid, amount) => {
        try {
            const data = await donateToCampaign({ 
                args: [pid],
                overrides: {
                    gasLimit: 1000000,
                    value: ethers.utils.parseEther(amount),
                }
            });
            console.info("contract call successs", data);
            return data;
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const getMyCampaigns = async()=>{
        const camp = await contract.call("getCampaigns");
        const filterdCamp = camp.filter((camp)=>camp.owner == address);
        console.log(filterdCamp);
        const parsedCampaign = filterdCamp.map((campaign,i)=>({
            owner: campaign.owner,
            title: campaign.title,
            deadline:campaign.deadline,
            description: campaign.description,
            donators:campaign.donators,
            donations: campaign.donations,
            target: ethers.utils.formatEther(campaign.target.toString()),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pid:i
        }))
        return parsedCampaign;
    }
    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaigns,
                getMyCampaigns,
                donate
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = ()=> useContext(StateContext);