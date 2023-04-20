import { Form, Formik, FormikHelpers } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import classes from '../SettingsForm.module.scss';
import EditButton from '../EditButton/EditButton';
import SettingsInput from '../SettingsInput/SettingsInput';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectUserData, setUserData } from '../../../features/userData/userDataSlice';
import { WindowWidthContext, WindowWidthContextType } from '../../../pages/Settings/Settings';
import { putData } from '../../../lib';
import { UserDataType } from '../../../interface/types';

export interface SignInValuesType {
  facebook: string;
  telegram: string;
  linkedin: string;
}

const SignInSchema = Yup.object().shape({
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
  const [canEdit, setCanEdit] = useState(false);
  const id = localStorage.getItem('id');
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const { windowWidth } = useContext(WindowWidthContext) as WindowWidthContextType;

  return (
    <div className={classes.settingsForm}>
      <Formik
        enableReinitialize
        initialValues={{
          facebook: userData?.facebook || '',
          telegram: userData?.telegram || '',
          linkedin: userData?.linkedin || '',
        }}
        validationSchema={SignInSchema}
        onSubmit={(values: SignInValuesType, { setSubmitting }: FormikHelpers<SignInValuesType>) => {
          if (
            id !== null &&
            (values.facebook !== userData?.facebook ||
              values.telegram !== userData?.telegram ||
              values.linkedin !== userData?.linkedin)
          )
            putData<UserDataType, SignInValuesType>(`user/${id}`, values).then(data => {
              dispatch(setUserData(data));
            });
          setSubmitting(false);
        }}>
        {({ errors, touched, submitForm }) => (
          <Form className={classes.form}>
            <div className={`${classes.socialMedia} ${classes.containers}`}>
              <div className={classes.header}>
                <h1>מדיה חברתית</h1>
                {windowWidth > 768 && (
                  <EditButton submitForm={submitForm} errors={errors} canEdit={canEdit} setCanEdit={setCanEdit} />
                )}
              </div>
              <SettingsInput
                errors={errors.facebook}
                touched={touched.facebook}
                id="facebook"
                placeholder="עמוד הפייסבוק שלך"
                type="text"
                label="Facebook"
                canEdit={canEdit}
              />
              <SettingsInput
                errors={errors.telegram}
                touched={touched.telegram}
                id="telegram"
                placeholder="עמוד הפייסבוק שלך"
                type="text"
                label="Telegram"
                canEdit={canEdit}
              />
              <SettingsInput
                errors={errors.linkedin}
                touched={touched.linkedin}
                id="linkedin"
                placeholder="עמוד הפייסבוק שלך"
                type="text"
                label="LinkedIn"
                canEdit={canEdit}
              />
              {windowWidth < 768 && (
                <EditButton submitForm={submitForm} errors={errors} canEdit={canEdit} setCanEdit={setCanEdit} />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SettingsForm;
