import React from 'react';
import { Link } from 'react-router-dom';
import classes from './PopupOption.module.scss';

interface PopupOptionProps {
  text: string;
  img: string;
  link: string;
  onCLick: React.MouseEventHandler;
}
function PopupOption({ text, img, link, onCLick }: PopupOptionProps) {
  return (
    <Link className={classes.popupOption} to={link} onClick={onCLick}>
      <img src={img} alt="" />
      <h1>{text}</h1>
    </Link>
  );
}

export default PopupOption;
