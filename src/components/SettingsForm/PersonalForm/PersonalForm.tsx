import { useEffect, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import classes from '../SettingsForm.module.scss';
import EditButton from '../EditButton/EditButton';
import SettingsInput from '../SettingsInput/SettingsInput';
import { getUserData } from '../../../Layout';

interface SignInValuesType {
  firstName: string;
  secondName: string;
}

const SignInSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .max(40),
  secondName: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    .max(40),
});

function PersonalForm() {
  const [canEdit, setCanEdit] = useState(false);
  const [firstName, setFirstName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const id = localStorage.getItem('id');

  useEffect(() => {
    if (id !== null) {
      getUserData(id).then(data => {
        setFirstName(data.firstName);
        setSecondName(data.secondName);
      });
    }
  }, []);

  return (
    <div className={classes.settingsForm}>
      <Formik
        enableReinitialize
        initialValues={{
          firstName,
          secondName,
        }}
        validationSchema={SignInSchema}
        onSubmit={(values: SignInValuesType, { setSubmitting }: FormikHelpers<SignInValuesType>) => {
          console.log(values);
          setSubmitting(false);
        }}>
        {({ errors, touched, submitForm }) => (
          <Form className={classes.form}>
            <div className={`${classes.personalInfo} ${classes.containers}`}>
              <div className={classes.header}>
                <h1>הוסף מידע על עצמך</h1>
                <EditButton submitForm={submitForm} errors={errors} canEdit={canEdit} setCanEdit={setCanEdit} />
              </div>
              <div className={classes.personalInputs}>
                <SettingsInput
                  errors={errors.firstName}
                  touched={touched.firstName}
                  id="firstName"
                  label="שם"
                  placeholder="לאוניד"
                  type="text"
                  canEdit={canEdit}
                  setCanEdit={setCanEdit}
                />
                <SettingsInput
                  errors={errors.secondName}
                  touched={touched.secondName}
                  id="secondName"
                  placeholder="פריקול"
                  type="text"
                  label="שם משפחה"
                  canEdit={canEdit}
                  setCanEdit={setCanEdit}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PersonalForm;
