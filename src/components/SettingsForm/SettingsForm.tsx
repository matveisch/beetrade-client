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
  firstName: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .max(40),
  secondName: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .max(40),
  facebook: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter correct url!',
  ),
  telegram: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter correct url!',
  ),
  linkedin: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter correct url!',
  ),
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
          console.log(values);
          setSubmitting(false);
        }}>
        {({ errors, touched, submitForm }) => (
          <Form className={classes.form}>
            <div className={classes.personalInfo}>
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
            </div>
            <h2>מדיה חברתית</h2>
            <div className={classes.socialMedia}>
              <SettingsInput
                errors={errors.facebook}
                touched={touched.facebook}
                id="facebook"
                placeholder="עמוד הפייסבוק שלך"
                type="text"
                label="Facebook"
                submitForm={submitForm}
              />
              <SettingsInput
                errors={errors.telegram}
                touched={touched.telegram}
                id="telegram"
                placeholder="עמוד הפייסבוק שלך"
                type="text"
                label="Telegram"
                submitForm={submitForm}
              />
              <SettingsInput
                errors={errors.linkedin}
                touched={touched.linkedin}
                id="linkedin"
                placeholder="עמוד הפייסבוק שלך"
                type="text"
                label="LinkedIn"
                submitForm={submitForm}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SettingsForm;
