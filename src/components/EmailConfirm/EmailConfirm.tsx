import { Link } from 'react-router-dom';
import classes from './EmailConfirm.module.scss';

interface EmailConfirmProps {
  email: string;
}

function EmailConfirm({ email }: EmailConfirmProps) {
  return (
    <div className={classes.emailConfirm}>
      <h1>הרשמה</h1>
      <h2>{`שלחנו לך קישור אישור באימייל: ${email}`}</h2>
      <Link to="/signup">אימייל לא נכון? </Link>
      <h2>אנא עקוב אחריו כדי לאשר את האימייל שלך</h2>
      <Link to="/">המכתב לא הגיע?</Link>
    </div>
  );
}

export default EmailConfirm;
