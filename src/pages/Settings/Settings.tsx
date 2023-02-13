import { useNavigate } from 'react-router-dom';
import classes from './Settings.module.scss';
import SettingsForm from '../../components/SettingsForm/SettingsForm';

function Settings() {
  const navigate = useNavigate();

  return (
    <div className={classes.settings}>
      <aside className={classes.sidebar}>
        <h2>הגדרות</h2>
        <button type="button">מידע אישי</button>
        <button type="button">סיסמה</button>
      </aside>
      <div className={classes.formContainer}>
        <SettingsForm />
        <div className={classes.buttonContainer}>
          <button type="button" onClick={() => navigate(-1)}>
            סיום
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
