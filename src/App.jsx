import React from "react";
import { Route , Routes } from 'react-router-dom';
import { Home , Profile, CreateCampaign, CampaignDetails } from "./pages";
import { Navbar, Sidebar } from './components';


export function App(){
    return (
        <div className="relative sm:-8 p-4 bg-[#131318] min-h-screen flex flex-row">
            <div className="sm:flex hidden mr-10 relative">
                <Sidebar/>
            </div> 
            <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path="/create-campaign" element={<CreateCampaign />}></Route>
                    <Route path="/campaign-detail/:id" element={<CampaignDetails />}></Route>
                    <Route path="/profile" element={<Profile/>}></Route>
                </Routes>
            </div>
        </div>
    )
}