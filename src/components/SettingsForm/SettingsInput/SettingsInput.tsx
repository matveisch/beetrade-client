import { useState } from 'react';
import { Field } from 'formik';
import classes from './SettingsInput.module.scss';
import ErrorMessage from '../../../ui/InputField/ErrorMessage/ErrorMessage';
import pencilIcon from '../../../assets/images/pencilIcon.svg';
import tickIcon from '../../../assets/images/tickIcon.svg';

interface SettingsInputProps {
  errors: string | undefined;
  touched: boolean | undefined;
  id: string;
  placeholder: string;
  type: string;
  label: string;
  submitForm: (() => Promise<void>) & (() => Promise<any>);
}

function SettingsInput({ errors, touched, id, placeholder, type, label, submitForm }: SettingsInputProps) {
  const [canEdit, setCanEdit] = useState(false);

  function getStyle() {
    if (canEdit && errors && touched) {
      return { border: '3px solid #ff2f2f', borderRadius: '8px', background: '#F9EEE3' };
    } else if (errors && touched) {
      return { border: '3px solid #ff2f2f', borderRadius: '8px' };
    } else if (canEdit) {
      return { background: '#F9EEE3' };
    }
  }

  return (
    <div className={classes.settingsInput}>
      <label htmlFor={id}>{label}</label>
      <div className={classes.inputContainer}>
        <Field
          id={id}
          name={id}
          placeholder={placeholder}
          type={type}
          readOnly={!canEdit}
          errors={errors}
          touched={touched?.toString()}
          style={getStyle()}
        />
        <img
          src={canEdit ? tickIcon : pencilIcon}
          alt=""
          onClick={() => setCanEdit(true)}
          style={canEdit ? { display: 'none' } : undefined}
        />
        <img
          src={tickIcon}
          alt=""
          style={!canEdit ? { display: 'none' } : undefined}
          onClick={() => {
            setCanEdit(false);
            submitForm();
          }}
        />
        {errors && touched && <ErrorMessage error={errors} />}
      </div>
    </div>
  );
}

export default SettingsInput;
