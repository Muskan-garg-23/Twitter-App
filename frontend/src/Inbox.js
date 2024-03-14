import React from "react";
import Leftbar from "./Leftbar";
import './App.css';

function Inbox() {
    return (
        <div>
            <Leftbar />
            <div className="inbox" id="inbox">
                <div className="inbox-one">
                    <h2>Messages</h2>
                    <h1>Welcome to your inbox!</h1>
                    <p>
                        Drop a line, share posts and more with private <br />
                        conversations between you and others on X.
                    </p>
                    <button className="post-button">Write a message</button>
                </div>
                <div className="inbox-two">
                    <h1>Select a message</h1>
                    <p>
                        Choose from existing conversations, start a <br/>
                        new one, or just keep swimming.
                    </p>
                    <button className="post-button">New message</button>
                </div>
            </div>
        </div>
    )
}

export default Inbox;