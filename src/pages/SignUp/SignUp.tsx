import classes from './SignUp.module.scss';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

function SignUp() {
  return (
    <div className={classes.signUp}>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
