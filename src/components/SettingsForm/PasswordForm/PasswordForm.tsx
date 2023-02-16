import { useEffect, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import classes from '../SettingsForm.module.scss';
import EditButton from '../EditButton/EditButton';
import SettingsInput from '../SettingsInput/SettingsInput';

interface SignInValuesType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

async function updateUserPassword(id: string, userData: any) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API}/user/${id}/changePassword`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const text = await response.json();
      throw Error(text.message);
    }

    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

function PasswordForm() {
  const [canEdit, setCanEdit] = useState(false);
  const [triggerError, setTriggerError] = useState(false);
  const [customError, setCustomError] = useState('');
  const id = localStorage.getItem('id');

  const SignInSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, 'Must contain at least 8 chars')
      .when('newPassword', (newPassword, field) => (newPassword ? field.required() : field)),
    newPassword: Yup.string().min(8, 'Must contain at least 8 chars'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Must match "new password" field value')
      .when('newPassword', (newPassword, field) => (newPassword ? field.required() : field)),
  });

  useEffect(() => {
    if (canEdit) {
      setTriggerError(false);
      setCustomError('');
    }
  }, [canEdit]);

  return (
    <div className={classes.settingsForm}>
      <Formik
        enableReinitialize
        validateOnBlur
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={(
          values: SignInValuesType,
          { setSubmitting, resetForm, setFieldError, setFieldTouched, setErrors }: FormikHelpers<SignInValuesType>,
        ) => {
          if (id !== null && values.oldPassword !== '' && values.newPassword !== '' && values.confirmPassword !== '') {
            updateUserPassword(id, values).then(data => {
              if (!data) {
                setTriggerError(true);
                setCustomError('Wrong password');
              } else {
                resetForm();
              }
            });
          }

          setSubmitting(false);
        }}>
        {({ errors, touched, submitForm }) => (
          <Form className={classes.form}>
            <div className={`${classes.personalInfo} ${classes.containers}`}>
              <div className={classes.header}>
                <h1>סיסמה</h1>
                <EditButton submitForm={submitForm} errors={errors} canEdit={canEdit} setCanEdit={setCanEdit} />
              </div>
              <div className={classes.personalInputs} style={{ flexDirection: 'column' }}>
                <SettingsInput
                  errors={errors.oldPassword}
                  touched={touched.oldPassword}
                  id="oldPassword"
                  label="סיסמה ישנה"
                  placeholder=""
                  type="password"
                  canEdit={canEdit}
                  triggerError={triggerError}
                  customError={customError}
                />
                <SettingsInput
                  errors={errors.newPassword}
                  touched={touched.newPassword}
                  id="newPassword"
                  placeholder=""
                  type="password"
                  label="סיסמה חדשה"
                  canEdit={canEdit}
                />
                <SettingsInput
                  errors={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  id="confirmPassword"
                  placeholder=""
                  type="password"
                  label="אימות סיסמה חדשה"
                  canEdit={canEdit}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PasswordForm;
