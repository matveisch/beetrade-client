import { useNavigate } from 'react-router-dom';
import { createContext, useEffect, useMemo, useState } from 'react';
import classes from './Settings.module.scss';
import PersonalForm from '../../components/SettingsForm/PersonalForm/PersonalForm';
import SocialForm from '../../components/SettingsForm/SocialForm/SocialForm';
import MailForm from '../../components/SettingsForm/MailForm/MailForm';
import PasswordForm from '../../components/SettingsForm/PasswordForm/PasswordForm';

export interface WindowWidthContextType {
  windowWidth: number;
}
export const WindowWidthContext = createContext<WindowWidthContextType | null>(null);

function Settings() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('personal'); // or security
  const token = localStorage.getItem('token');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const contextValue = useMemo(() => ({ windowWidth }), [windowWidth]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  useEffect(() => {
    if (token === null) navigate('/signin');
  }, []);

  return (
    <div className={classes.settings}>
      <aside className={classes.sidebar}>
        <h2>הגדרות</h2>
        <div className={classes.buttons}>
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
        </div>
      </aside>
      <div className={classes.formContainer}>
        <WindowWidthContext.Provider value={contextValue}>
          <div style={currentTab === 'security' ? { display: 'none' } : undefined}>
            <PersonalForm />
            <SocialForm />
          </div>
          <div style={currentTab === 'personal' ? { display: 'none' } : undefined}>
            <MailForm />
            <PasswordForm />
          </div>
        </WindowWidthContext.Provider>
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
