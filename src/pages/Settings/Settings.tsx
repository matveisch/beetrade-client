import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from './Settings.module.scss';
import PersonalForm from '../../components/SettingsForm/PersonalForm/PersonalForm';
import SocialForm from '../../components/SettingsForm/SocialForm/SocialForm';
import MailForm from '../../components/SettingsForm/MailForm/MailForm';
import PasswordForm from '../../components/SettingsForm/PasswordForm/PasswordForm';
import { selectUserData } from '../../features/userData/userDataSlice';
import { useAppSelector } from '../../hooks';

function Settings() {
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserData);
  const [currentTab, setCurrentTab] = useState('personal'); // or security

  useEffect(() => {
    if (!userData) navigate('/signin');
  }, []);

  return (
    <div className={classes.settings}>
      <aside className={classes.sidebar}>
        <h2>הגדרות</h2>
        <button
          type="button"
          style={currentTab === 'personal' ? { color: '#FF9E2F' } : undefined}
          onClick={() => setCurrentTab('personal')}>
          מידע אישי
        </button>
        <button
          type="button"
          style={currentTab === 'security' ? { color: '#FF9E2F' } : undefined}
          onClick={() => setCurrentTab('security')}>
          סיסמה ומייל
        </button>
      </aside>
      <div className={classes.formContainer}>
        <div style={currentTab === 'security' ? { display: 'none' } : undefined}>
          <PersonalForm />
          <SocialForm />
        </div>
        <div style={currentTab === 'personal' ? { display: 'none' } : undefined}>
          <MailForm />
          <PasswordForm />
        </div>
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
