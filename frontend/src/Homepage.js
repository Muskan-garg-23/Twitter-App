import React, { useState } from "react";
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';
import ForYou from './ForYou';
import Connections from './Connections';
import './App.css';

const Homepage = ({ username }) => {

    const [activeTab, setActiveTab] = useState('ForYou');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (

        <div>
            <Leftbar />

            <div id="home" className="home">

                {/* <div>
                    {username ? (
                        <h4>Hi, {username}!</h4>
                    ) : (<p></p>)}
                </div> */}

                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'ForYou' ? 'active' : ''}`}
                        onClick={() => handleTabClick('ForYou')}
                    >
                        For You
                        {activeTab === 'ForYou' && <div className="active-line" />}
                    </div>
                    <div
                        className={`tab ${activeTab === 'Connections' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Connections')}
                    >
                        Connections
                        {activeTab === 'Connections' && <div className="active-line" />}
                    </div>
                    
                </div>

                <div className="tab-content">
                    {activeTab === 'ForYou' && <ForYou />}
                    {activeTab === 'Connections' && <Connections />}
                </div>

            </div>

            <Rightbar />
        </div>
    )
}

export default Homepage;