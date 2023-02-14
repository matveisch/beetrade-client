import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import classes from '../SettingsForm.module.scss';
import EditButton from '../EditButton/EditButton';
import SettingsInput from '../SettingsInput/SettingsInput';
import { getUserData } from '../../../Layout';

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
  const [facebook, setFacebook] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const id = localStorage.getItem('id');

  useEffect(() => {
    if (id !== null) {
      getUserData(id).then(data => {
        console.log(data);
        setFacebook(data.facebook);
        setTelegram(data.telegram);
        setLinkedin(data.linkedin);
      });
    }
  }, []);

  return (
    <div className={classes.settingsForm}>
      <Formik
        enableReinitialize
        initialValues={{
          facebook,
          telegram,
          linkedin,
        }}
        validationSchema={SignInSchema}
        onSubmit={(values: SignInValuesType, { setSubmitting }: FormikHelpers<SignInValuesType>) => {
          console.log(values);
          setSubmitting(false);
        }}>
        {({ errors, touched, submitForm }) => (
          <Form className={classes.form}>
            <div className={`${classes.socialMedia} ${classes.containers}`}>
              <div className={classes.header}>
                <h2>מדיה חברתית</h2>
                <EditButton submitForm={submitForm} errors={errors} canEdit={canEdit} setCanEdit={setCanEdit} />
              </div>
              <SettingsInput
                errors={errors.facebook}
                touched={touched.facebook}
                id="facebook"
                placeholder="עמוד הפייסבוק שלך"
                type="text"
                label="Facebook"
                canEdit={canEdit}
                setCanEdit={setCanEdit}
              />
              <SettingsInput
                errors={errors.telegram}
                touched={touched.telegram}
                id="telegram"
                placeholder="עמוד הפייסבוק שלך"
                type="text"
                label="Telegram"
                canEdit={canEdit}
                setCanEdit={setCanEdit}
              />
              <SettingsInput
                errors={errors.linkedin}
                touched={touched.linkedin}
                id="linkedin"
                placeholder="עמוד הפייסבוק שלך"
                type="text"
                label="LinkedIn"
                canEdit={canEdit}
                setCanEdit={setCanEdit}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SettingsForm;
