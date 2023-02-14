import React, { useState } from 'react';
import { Field } from 'formik';
import classes from './SettingsInput.module.scss';
import ErrorMessage from '../../../ui/ErrorMessage/ErrorMessage';

interface SettingsInputProps {
  errors: string | undefined;
  touched: boolean | undefined;
  id: string;
  placeholder: string;
  type: string;
  label: string;
  canEdit: boolean;
  setCanEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function SettingsInput({ errors, touched, id, placeholder, type, label, canEdit, setCanEdit }: SettingsInputProps) {
  return (
    <div className={classes.settingsInput}>
      <label htmlFor={id}>{label}</label>
      <div className={canEdit ? classes.containerEditable : classes.inputContainer}>
        <Field
          id={id}
          name={id}
          placeholder={placeholder}
          type={type}
          readOnly={!canEdit}
          errors={errors}
          touched={touched?.toString()}
          style={errors && touched ? { border: '3px solid #ff2f2f', borderRadius: '8px' } : undefined}
        />

        {errors && touched && <ErrorMessage error={errors} />}
      </div>
    </div>
  );
}

export default SettingsInput;
