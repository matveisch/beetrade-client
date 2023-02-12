import { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import InputField from '../../ui/InputField/InputField';
import classes from './SignUpForm.module.scss';
import BulletPoint from '../../ui/BulletPoint/BulletPoint';

function SignUpForm() {
  const [hasError, setHasError] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  interface SignUpValuesType {
    firstName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    hasPaid: boolean;
  }

  interface FormikValuesType extends SignUpValuesType {
    confirmPassword: string;
  }

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().min(1, 'Name is too short').required('required'),
    email: Yup.string().email('Invalid email').required('required'),
    password: Yup.string().min(8, 'Must contain at least 8 chars').required('required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Must match "password" field value')
      .required(),
  });

  async function signUp(userData: SignUpValuesType) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/user/signup`, {
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
          <h1 className={classes.h1}>{errorMessage}</h1>
        </div>
      )}
      <div
        className={classes.formContainer}
        style={hasError ? { background: 'linear-gradient(264.3deg, #FF9E2F -168.03%, #FF2F2F 100%)' } : undefined}>
        <h1 className={classes.h1}>הרשמה</h1>
        <Formik
          initialValues={{
            firstName: '',
            email: '',
            password: '',
            confirmPassword: '',
            hasPaid: false,
            isAdmin: false,
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values: FormikValuesType, { setSubmitting }: FormikHelpers<FormikValuesType>) => {
            // getting read of confirmPassword key
            const { firstName, email, password, hasPaid, isAdmin } = values;
            const trimmedValues: SignUpValuesType = { firstName, email, password, isAdmin, hasPaid };

            if (agreed) {
              signUp(trimmedValues).then(userData => {
                setSubmitting(false);
                if (userData) navigate('/signin');
              });
            } else {
              setHasError(true);
              setErrorMessage('Has to agree');
            }
          }}>
          {({ errors, touched }) => (
            <Form className={classes.form}>
              <InputField
                errors={errors.firstName}
                touched={touched.firstName}
                id="firstName"
                label="שם"
                placeholder="לאוניד"
                type="text"
              />
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
              <InputField
                errors={errors.confirmPassword}
                touched={touched.confirmPassword}
                id="confirmPassword"
                placeholder="****************"
                type="password"
                label="confirm password"
              />
              <div className={classes.agreement}>
                <BulletPoint isChecked={agreed} frameWidth="19px" fillWidth="11px" onClick={() => setAgreed(!agreed)} />
                <h1 className={classes.terms}>אני מסכים לתנאי השימוש ולהצעה הציבורית</h1>
              </div>
              <button type="submit">להמשיך</button>
              <Link to="/signin">להכנס במקום</Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUpForm;
