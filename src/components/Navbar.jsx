import React ,{ useLayoutEffect, useState }from "react";
import { Link, useNavigate } from 'react-router-dom'
import CustomButton from "./CustomButton";
import { useStateContext } from "../context";
import { logo, menu ,search ,thirdweb } from '../assets';
import { navlinks } from "../constants";
const Navbar = ()=>{
    const navigate = useNavigate('dashboard');
    const [ isActive ,setActive] = useState(false);
    const { connect, address } = useStateContext();
    const [ toggleDrawer,setToggleDrawer ] = useState(false);
    // const address = '0xfngbhmhu343';
    return (
        <div className="flex md:flex-row flex-row-reverse justify-between mb-[35px] gap-6">
            <div className="lg:flex-1 flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
                <div className="ww-[72px] h-full rounded-[20px] gb-[#4acd8d] flex justify-center items-center cursor-pointer">
                    <input type="text" placeholder="Serch For Capmaigns" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />
                    <img src={search} alt="sech"
                    className="w-[15px] h-[15px] object-contain" />
                </div>
            </div>
            <div className="sm:flex hidden flex-row justify-end gap-4">
                <CustomButton 
                    btnType='button'
                    title={address? 'Create an campaign':'Connect' }
                    styles={address? 'bg-[#1dc071]':'bg-[#8c6dfd]'}
                    handleClick={()=>{
                        if(address){
                            navigate('create-campaign')
                        }
                        else{
                            connect();
                        }
                    }}
                />
                <Link to="/profile">
                    <div className="w-[52px] h-[52px] rounded-full gb-[#2c2f32] flex justify-center items-center cursor-pointer">
                        <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
                    </div>
                </Link>
            </div>
            {/* smallscreen navigation */}
            <div className="sm:hidden flex justify-between items-center relative">
                <div className="w-[40px] h-[40px] rounded-[10px] gb-[#2c2f32] flex justify-center items-center cursor-pointer">
                    <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain"/>
                </div>
                <img src={menu} alt="menu" className="w-[34px] h-[34px] object-contain" onClick={()=>setToggleDrawer((prev)=>!prev)} />
                <div className={`absolute top-[60px] w-max right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? 'translate-y-[-100vh]':'translate-y-0'} transition-all duration-700`}>
                    <ul className='mp-4'>
                        {navlinks.map((link)=> 
                            <li key={link.name} className={`flex p-4 ${isActive===link.name && 'bg-[#3a3a43]'}`} onClick={()=>{
                                setActive(link.name);
                                setToggleDrawer(false);
                                navigate(link.link);
                            }}>
                            <img src={link.imgUrl} alt={link.name} />
                            <p className={`ml-[20px] font-epilogue text-semibold text-[14px] ${isActive===link.name ? 'text-[#1dc071]':'text-[#808191]'}`}>{link.name}</p>

                            </li>
                        )}
                    </ul>
                    <div className="flex mx-4 ">
                        <CustomButton 
                            btnType='button'
                            title={address? 'Create an campaign':'Connect' }
                            styles={address? 'bg-[#1dc071]':'bg-[#8c6dfd]'}
                            handleClick={()=>{
                                if(address){
                                    navigate('create-campaign')
                                }
                                else{
                                    connect();
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;