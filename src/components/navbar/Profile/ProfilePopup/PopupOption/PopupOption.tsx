import classes from './PopupOption.module.scss';

interface PopupOptionProps {
  text: string;
  img: string;
}
function PopupOption({ text, img }: PopupOptionProps) {
  return (
    <div className={classes.popupOption}>
      <img src={img} alt="" />
      <h1>{text}</h1>
    </div>
  );
}

export default PopupOption;
