import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function Rightbar(){

    const trendings = [
        {name:"trend1",shares:"840k posts"},
        {name:"trend2",shares:"90k posts"},
        {name:"trend3",shares:"580k posts"}
    ]
    const [searchUser,setSearchUser] = useState('');

    return(
        <div className="rightbar" id="rightbar">
            <div className="search-bar">
                <div><FontAwesomeIcon icon={faSearch} /></div>
                <input
                    type="text"
                    name="searchUser"
                    placeholder="Search"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                ></input>
            </div>
            <div className="right-one">
                <h3>Subscribe to Premium</h3>
                <p>
                    Subscribe to unlock new features and if
                    eligible, receive a share of ads revenue.
                </p>
                <button>Subscribe</button>
            </div>
            <div className="right-one">
                <h3>What's happening</h3>
                <div className="single-trend">
                    {trendings.map((trending)=>(
                        <div>
                            <p>Trending in India</p>
                            <h4>#{trending.name}</h4>
                            <p>{trending.shares}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Rightbar;