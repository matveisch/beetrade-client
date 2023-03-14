import { useContext, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import classes from '../SettingsForm.module.scss';
import EditButton from '../EditButton/EditButton';
import SettingsInput from '../SettingsInput/SettingsInput';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectUserData, setUserData } from '../../../features/userData/userDataSlice';
import { WindowWidthContext, WindowWidthContextType } from '../../../pages/Settings/Settings';

interface SignInValuesType {
  email: string;
  password: string;
}

export async function updateUserEmail(id: string, userData: any) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API}/user/${id}/updateEmail`, {
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

function MailForm() {
  const [canEdit, setCanEdit] = useState(false);
  const userData = useAppSelector(selectUserData);
  const id = localStorage.getItem('id');
  const dispatch = useAppDispatch();
  const { windowWidth } = useContext(WindowWidthContext) as WindowWidthContextType;

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .min(8, 'Must contain at least 8 chars')
      .when('email', (email, field) => (email === userData?.email ? field : field.required())),
  });

  return (
    <div className={classes.settingsForm}>
      <Formik
        enableReinitialize
        validateOnBlur
        initialValues={{
          email: userData?.email || '',
          password: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={(values: SignInValuesType, { setSubmitting, resetForm }: FormikHelpers<SignInValuesType>) => {
          if (values.email !== userData?.email) {
            if (id !== null) {
              updateUserEmail(id, values).then(data => {
                dispatch(setUserData(data));
                resetForm();
              });
            }
          }

          setSubmitting(false);
        }}>
        {({ errors, touched, submitForm, setFieldTouched }) => (
          <Form className={classes.form}>
            <div className={`${classes.personalInfo} ${classes.containers}`}>
              <div className={classes.header}>
                <h1>שינוי מייל</h1>
                {windowWidth > 768 && (
                  <EditButton
                    submitForm={submitForm}
                    errors={errors}
                    canEdit={canEdit}
                    setCanEdit={setCanEdit}
                    setFieldTouched={setFieldTouched}
                  />
                )}
              </div>
              <div className={classes.personalInputs} style={{ flexDirection: 'column' }}>
                <SettingsInput
                  errors={errors.email}
                  touched={touched.email}
                  id="email"
                  label="מייל"
                  placeholder=""
                  type="email"
                  canEdit={canEdit}
                />
                <SettingsInput
                  errors={errors.password}
                  touched={touched.password}
                  id="password"
                  placeholder=""
                  type="password"
                  label="אימות סיסמה"
                  canEdit={canEdit}
                />
                {windowWidth < 768 && (
                  <EditButton
                    submitForm={submitForm}
                    errors={errors}
                    canEdit={canEdit}
                    setCanEdit={setCanEdit}
                    setFieldTouched={setFieldTouched}
                  />
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MailForm;
