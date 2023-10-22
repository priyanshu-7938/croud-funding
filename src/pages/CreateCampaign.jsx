import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { money ,createCampaignImg } from '../assets';
import { CustomButton, FormField } from "../components";
import { checkIfImage } from '../utils'
import { loader } from "../assets";
import Loader from "../components/Loader";

const CreateCampaign = ()=>{
    const e = useNavigate();
    const [ isLoading,setIsLoading ] = useState(false);
    const  { createCampaign } = useStateContext();
    const [ form,setForm ] = useState({
        name:'',
        title:'',
        description:'',
        target:'',
        deadline:'',
        image:''
    });

    const handelFormFieldChange = (fieldName,e) => {
        setForm((val)=>{return {...val ,[fieldName]:e.target.value}});
        console.log(form);
    }

    const handelSubmit = async (e)=>{
        e.preventDefault();
        console.log(form);
        checkIfImage(form.image ,async(exist) => {
            if(exist){
                setIsLoading(true);
                await createCampaign({...form,target: ethers.utils.parseUnits(form.target, 18)});
                setIsLoading(false);
            }
            else{
                alert("provide a valid image url")
                setForm({...form,image:''});
            }
        })

    }
    return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        {isLoading &&  <Loader/>}
        <div className ="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
            <h1 className='font-epilogue flex gap-2 font-bold text-white sm:text-[25px] text-[18px] leading-[38px]'>Start a Campaign <img src={createCampaignImg} alt="rocket"/></h1>
        </div>
        <form className="w-full mt-[65px] flex flex-col gap-[30px]" onSubmit={handelSubmit}>
            <div className="flex flex-wrap gap-[40px]">
                <FormField 
                    LabelName="Your Name *"
                    Placeholder="Jonny Depp"
                    inputType="text"
                    value={form.name}
                    handelChange={(e)=>{handelFormFieldChange('name',e)}}
                />
                <FormField 
                    LabelName="Campaign Title *"
                    Placeholder="Jonny Depp"
                    inputType="text"
                    value={form.title}
                    handelChange={(e)=>{handelFormFieldChange('title',e)}}
                />
            </div>
            <FormField 
                LabelName="Story"
                Placeholder="Write your story"
                isTextArea
                value={form.description}
                handelChange={(e)=>{handelFormFieldChange('description',e)}}
            />
            <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
                <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
                <h4 className="text-white font-bold font-epilogue text-[25px] ml-[20px]">You will get 100% of the raised amount</h4>
            </div>
            <div className="flex flex-wrap gap-[40px]">
                <FormField 
                    LabelName="Goal *"
                    Placeholder="ETH 0.50"
                    inputType="text"
                    value={form.target}
                    handelChange={(e)=>{handelFormFieldChange('target',e)}}
                />
                <FormField 
                    LabelName="End Date *"
                    Placeholder="End Date"
                    inputType="date"
                    value={form.deadline}
                    handelChange={(e)=>{handelFormFieldChange('deadline',e)}}
                />
            </div>
            <FormField 
                LabelName="Capmain Image URl *"
                Placeholder="image url"
                inputType="url"
                value={form.image}
                handelChange={(e)=>{handelFormFieldChange('image',e)}}
            />
            <div className="flex justify-center items-center mt-[40px]">
                <CustomButton
                    btnType="submit"
                    title="Submit New Campaign"
                    styles="bg-[#1dc071]"
                />
            </div>
        </form>  
    </div>        
   )
}
export default CreateCampaign;