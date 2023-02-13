import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import classes from './SettingsForm.module.scss';
import { UserDataType } from '../../interface/types';
import SettingsInput from './SettingsInput/SettingsInput';

interface SignInValuesType {
  firstName: string;
  secondName: string;
  facebook: string;
  telegram: string;
  linkedin: string;
}

const SignInSchema = Yup.object().shape({
  firstName: Yup.string(),
  secondName: Yup.string(),
  facebook: Yup.string().url(),
  telegram: Yup.string().url(),
  linkedin: Yup.string().url(),
});

function SettingsForm() {
  const userData: UserDataType = JSON.parse(localStorage.getItem('user') || '');

  return (
    <div className={classes.settingsForm}>
      <h1>הוסף מידע על עצמך</h1>
      <Formik
        initialValues={{
          firstName: userData.firstName,
          secondName: '',
          facebook: '',
          telegram: '',
          linkedin: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={(values: SignInValuesType, { setSubmitting }: FormikHelpers<SignInValuesType>) => {
          // signIn(values).then(userData => {
          //   localStorage.setItem('token', userData.token);
          //   dispatch(setUserSession(userData.token));
          //
          //   const { firstName, hasPaid, isAdmin } = userData.user;
          //   const user: UserDataType = { firstName, hasPaid, isAdmin };
          //   localStorage.setItem('user', JSON.stringify(user));
          //
          //   setSubmitting(false);
          //   if (userData.token) navigate('/');
          // });
          console.log(values);
          setSubmitting(false);
        }}>
        {({ errors, touched, submitForm }) => (
          <Form className={classes.form}>
            <SettingsInput
              errors={errors.firstName}
              touched={touched.firstName}
              id="firstName"
              label="שם"
              placeholder="לאוניד"
              type="text"
              submitForm={submitForm}
            />
            <SettingsInput
              errors={errors.secondName}
              touched={touched.secondName}
              id="secondName"
              placeholder="פריקול"
              type="text"
              label="שם משפחה"
              submitForm={submitForm}
            />
            <button type="submit">להמשיך</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SettingsForm;
