import { useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'Yup';
import classes from './SignIn.module.scss';

interface SignInValuesType {
  email: string;
  password: string;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

function SignIn() {
  const [hasError, setHasError] = useState<boolean>();
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

      if (!response.ok) throw new Error('error');
      return await response.json();
    } catch (e) {
      setHasError(true);
    }
  }

  return (
    <div className={classes.signIn}>
      <div className={classes.formContainer}>
        <h1>כניסה</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values: SignInValuesType, { setSubmitting }: FormikHelpers<SignInValuesType>) => {
            signIn(values).then(userData => {
              localStorage.setItem('token', userData.token);
              setSubmitting(false);

              if (userData.token) navigate('/');
            });
          }}>
          {({ errors, touched }) => (
            <Form className={classes.form}>
              <label htmlFor="email">מייל</label>
              <Field
                id="email"
                name="email"
                placeholder="beetrade@email.com"
                type="email"
                errors={errors.email}
                touched={touched.email}
              />
              {errors.email && touched.email ? <p>{errors.email}</p> : null}
              <label htmlFor="password">סיסמה</label>
              <Field
                id="password"
                name="password"
                placeholder="****************"
                type="password"
                errors={errors.password}
                touched={touched.password}
              />
              {errors.password && touched.password ? <p>{errors.password}</p> : null}
              <Link to="/">בעיית כניסה?</Link>

              <button type="submit">להמשיך</button>
              <Link to="/">הירשם במקום</Link>
            </Form>
          )}
        </Formik>
        {hasError && <h2>Something is not right. Either email or password is wrong.</h2>}
      </div>
    </div>
  );
}

export default SignIn;
