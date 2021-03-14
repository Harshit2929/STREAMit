import React from 'react';
const { networkInterfaces } = require('os');

const nets = networkInterfaces();



export default function ParentServer(){
  console.log(nets)
  return <>
  <a>Server Wi-Fi Ip Details</a>
  <table className="table-striped">
  <thead>
    <tr>
      <th>address</th>
      <th>netmask</th>
      <th>family</th>
      <th>mac</th>
      <th>internal</th>
      <th>cidr</th>
      <th>scopeid</th>
    </tr>
  </thead>
  <tbody>
    {nets["wlp3s0"].map(each=>{
      return <tr key={each.address}>
      <td>{each.address}</td>
        <td>{each.netmask}</td>
        <td>{each.family}</td>
        <td>{each.mac}</td>
        <td>{each.internal}</td>
        <td>{each.cidr}</td>
        <td>{each.scopeid}</td>
      </tr>
    })}

  </tbody>
</table>
  </>;
}
