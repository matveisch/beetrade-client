import { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import classes from '../SettingsForm.module.scss';
import EditButton from '../EditButton/EditButton';
import SettingsInput from '../SettingsInput/SettingsInput';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectUserData, setUserData } from '../../../features/userData/userDataSlice';

interface SignInValuesType {
  email: string;
  password: string;
}

// export async function updateUserData(id: string, userData: any) {
//   try {
//     const response = await fetch(`${import.meta.env.VITE_API}/user/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(userData),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     });
//
//     if (!response.ok) {
//       const text = await response.json();
//       throw Error(text.message);
//     }
//
//     return await response.json();
//   } catch (e) {
//     console.log(e);
//   }
// }

function PersonalForm() {
  const [canEdit, setCanEdit] = useState(false);
  const userData = useAppSelector(selectUserData);
  const id = localStorage.getItem('id');
  const dispatch = useAppDispatch();

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
        initialValues={{
          email: userData?.email || '',
          password: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={(values: SignInValuesType, { setSubmitting }: FormikHelpers<SignInValuesType>) => {
          if (values.email !== userData?.email && values.password.length < 1) {
            console.log('changed email, no password');
          } else {
            console.log('not submit');
          }
          console.log(values);

          // if (id !== null)
          //   updateUserData(id, values).then(data => {
          //     dispatch(setUserData(data));
          //   });

          setSubmitting(false);
        }}>
        {({ errors, touched, submitForm, setErrors }) => (
          <Form className={classes.form}>
            <div className={`${classes.personalInfo} ${classes.containers}`}>
              <div className={classes.header}>
                <h1>שינוי מייל</h1>
                <EditButton
                  submitForm={submitForm}
                  errors={errors}
                  canEdit={canEdit}
                  setCanEdit={setCanEdit}
                  setErrors={setErrors}
                />
              </div>
              <div className={classes.personalInputs}>
                <SettingsInput
                  errors={errors.email}
                  touched={touched.email}
                  id="email"
                  label="מייל"
                  placeholder=""
                  type="email"
                  canEdit={canEdit}
                  setCanEdit={setCanEdit}
                />
                <SettingsInput
                  errors={errors.password}
                  touched={touched.password}
                  id="password"
                  placeholder=""
                  type="password"
                  label="אימות סיסמה"
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
