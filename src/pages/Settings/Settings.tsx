import classes from './Settings.module.scss';

function Settings() {
  return (
    <div className={classes.settings}>
      <aside className={classes.sidebar}>
        <h2>הגדרות</h2>
        <button type="button">מידע אישי</button>
        <button type="button">סיסמה</button>
      </aside>
      <div className={classes.formContainer}></div>
    </div>
  );
}

export default Settings;
