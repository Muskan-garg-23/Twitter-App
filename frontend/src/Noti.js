import React, {useState} from "react";
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';
import AllNoti from './AllNoti';
import './App.css';

function Noti(){

    const [activeTab, setActiveTab] = useState('All');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (

        <div>
            <Leftbar />

            <div id="noti" className="noti">
                <h2>Notifications</h2>
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'All' ? 'active' : ''}`}
                        onClick={() => handleTabClick('All')}
                    >
                        All
                        {activeTab === 'All' && <div className="active-line" />}
                    </div>
                    <div
                        className={`tab ${activeTab === 'Mentions' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Mentions')}
                    >
                        Mentions
                        {activeTab === 'Mentions' && <div className="active-line" />}
                    </div>
                    
                </div>

                <div className="tab-content">
                    {activeTab === 'All' && <AllNoti />}
                    {activeTab === 'Mentions' && <div></div>}
                </div>

            </div>

            <Rightbar />
        </div>
    )
}

export default Noti;