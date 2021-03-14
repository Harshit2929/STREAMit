import React from 'react';
import BrandIcon from '../../assets/icon.png';
import './BrandNavbar.css';

export default function BrandNavbar(props) {

  return (
  <>
  <header className="toolbar toolbar-header">
  <h1 className="title">{props.appName}</h1>
  {props.children}
</header>
  </>
  );
}
