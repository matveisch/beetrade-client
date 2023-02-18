import { useState } from 'react';
import classes from './SignUp.module.scss';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import EmailConfirm from '../../components/EmailConfirm/EmailConfirm';

function SignUp() {
  const [email, setEmail] = useState('');

  return (
    <div className={classes.signUp}>
      {email.length < 1 && <SignUpForm setTempEmail={setEmail} />}
      {email.length > 0 && <EmailConfirm email={email} />}
    </div>
  );
}

export default SignUp;
