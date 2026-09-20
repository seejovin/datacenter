import React from 'react';
import {createRoot} from 'react-dom/client';
import Explorer from './components/explorer';
import './app/globals.css';
createRoot(document.getElementById('root')!).render(<Explorer/>);
// Streamlit's v1 custom-component handshake. The standalone site needs no host.
if(window.parent!==window){
 const send=(type:string,data:Record<string,unknown>)=>window.parent.postMessage({isStreamlitMessage:true,type,...data},'*');
 send('streamlit:componentReady',{apiVersion:1});
 send('streamlit:setFrameHeight',{height:1050});
 window.addEventListener('message',event=>{if(event.source===window.parent&&event.data?.type==='streamlit:render')send('streamlit:setFrameHeight',{height:1050})});
}
