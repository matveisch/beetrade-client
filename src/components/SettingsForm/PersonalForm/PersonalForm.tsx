import { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import classes from '../SettingsForm.module.scss';
import EditButton from '../EditButton/EditButton';
import SettingsInput from '../SettingsInput/SettingsInput';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectUserData, setUserData } from '../../../features/userData/userDataSlice';

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

export async function updateUserData(id: string, userData: any) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API}/user/${id}`, {
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

function PersonalForm() {
  const [canEdit, setCanEdit] = useState(false);
  const id = localStorage.getItem('id');
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  return (
    <div className={classes.settingsForm}>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: userData?.firstName || '',
          secondName: userData?.secondName || '',
        }}
        validationSchema={SignInSchema}
        onSubmit={(values: SignInValuesType, { setSubmitting }: FormikHelpers<SignInValuesType>) => {
          if (id !== null)
            updateUserData(id, values).then(data => {
              dispatch(setUserData(data));
            });
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
