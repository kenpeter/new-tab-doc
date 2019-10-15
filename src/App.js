import React from "react";

export function convertDataToBinary(base64Data) {
  // win.atob === raw char
  const raw = window.atob(base64Data);
  // arr[unit_8][buffer]
  const array = new Uint8Array(new ArrayBuffer(raw.length));

  // arr[0]['a']
  // arr[1]['b']
  for (let i = 0; i < raw.length; i++) {
    array[i] = raw.charCodeAt(i);
  }

  // re
  return array;
}

// return blob
export function convertDataToBlob(data, mimeType) {
  // 1. data === base64
  // 2. mineType === application/pdf
  const arr = convertDataToBinary(data);
  // blob([2d_arr], mime_type)
  return new Blob([arr], {type: mimeType});
}

function openInNewTab(url) {
  let win = window.open(url, '_blank');
  win.focus();
}

function App() {


  const file = require('./file.json');
  const mimeType = 'application/pdf'; // proper
  const data = convertDataToBlob(file.data, mimeType);

  const url = window.URL.createObjectURL(data);

  return <div className="App">
    <div onClick={() => {openInNewTab(url)}}>Something To Click On</div>
  </div>;
}

export default App;
