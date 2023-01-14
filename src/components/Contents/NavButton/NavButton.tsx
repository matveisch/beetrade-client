import classes from './NavButton.module.scss';

interface NavButtonProps {
  title: string;
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function NavButton({ title, isActive, onClick }: NavButtonProps) {
  return (
    <button
      type="button"
      className={classes.navButton}
      onClick={onClick}
      style={
        isActive
          ? { background: 'linear-gradient(264.3deg, #9e2fff -168.03%, #ff9e2f 100%)', color: '#09040f' }
          : { color: 'rgba(255, 255, 255, 0.85)' }
      }>
      {title}
    </button>
  );
}

export default NavButton;
