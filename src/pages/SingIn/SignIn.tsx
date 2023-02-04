import classes from './SignIn.module.scss';
import SignInForm from '../../components/SignInForm/SignInForm';

function SignIn() {
  return (
    <div className={classes.signIn}>
      <SignInForm />
    </div>
  );
}

export default SignIn;
