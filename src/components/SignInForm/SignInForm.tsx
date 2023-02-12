import { useDispatch } from 'react-redux';
import { Form, Formik, FormikHelpers } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';
import classes from './SignInForm.module.scss';
import InputField from './InputField/InputField';
import { UserDataType } from '../../interface/types';
import { setUserSession } from '../../features/userSession/userSessionSlice';

interface SignInValuesType {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('אתה חמור'),
  password: Yup.string().required('אתה חמור'),
});

function SignInForm() {
  const [hasError, setHasError] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function signIn(userData: SignInValuesType) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/user/login`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const text = await response.json();
        throw Error(text.message);
      }
      return await response.json();
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
      setHasError(true);
    }
  }

  return (
    <div className={classes.errorContainer}>
      {hasError && (
        <div className={classes.errorMessage}>
          <h1>{errorMessage}</h1>
        </div>
      )}
      <div
        className={classes.formContainer}
        style={hasError ? { background: 'linear-gradient(264.3deg, #FF9E2F -168.03%, #FF2F2F 100%)' } : undefined}>
        <h1>כניסה</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignInSchema}
          onSubmit={(values: SignInValuesType, { setSubmitting }: FormikHelpers<SignInValuesType>) => {
            signIn(values).then(userData => {
              localStorage.setItem('token', userData.token);
              dispatch(setUserSession(userData.token));

              const { firstName, hasPaid, isAdmin } = userData.user;
              const user: UserDataType = { firstName, hasPaid, isAdmin };
              localStorage.setItem('user', JSON.stringify(user));

              setSubmitting(false);
              if (userData.token) navigate('/');
            });
          }}>
          {({ errors, touched }) => (
            <Form className={classes.form}>
              <InputField
                errors={errors.email}
                touched={touched.email}
                id="email"
                label="מייל"
                placeholder="beetrade@email.com"
                type="email"
              />
              <InputField
                errors={errors.password}
                touched={touched.password}
                id="password"
                placeholder="****************"
                type="password"
                label="סיסמה"
              />
              <Link to="/">בעיית כניסה?</Link>

              <button type="submit">להמשיך</button>
              <Link to="/signup">הירשם במקום</Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignInForm;
