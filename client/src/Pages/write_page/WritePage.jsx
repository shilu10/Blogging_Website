import React, { Component } from 'react';
import TextEditor from '../../Components/editor/Editor';
import './writepage.css';
import Topbar from '../../Components/topbar/Topbar';

const WritePage = () => {
    return(
        <div className="write-page">
            <Topbar />
            <TextEditor />
        </div>
    )
};
export default WritePage;