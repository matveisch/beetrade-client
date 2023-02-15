import React from 'react';
import { FormikErrors } from 'formik';
import classes from './EditButton.module.scss';
import tickIcon from '../../../assets/images/tickIcon.svg';
import pencilIcon from '../../../assets/images/pencilIcon.svg';

interface EditButtonProps {
  canEdit: boolean;
  setCanEdit: React.Dispatch<React.SetStateAction<boolean>>;
  submitForm: (() => Promise<void>) & (() => Promise<any>);
  errors: FormikErrors<any>;
  setErrors: (errors: FormikErrors<{ email: string; password: string }>) => void;
}

function EditButton({ canEdit, setCanEdit, submitForm, errors, setErrors }: EditButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        if (canEdit && Object.keys(errors).length === 0) {
          setCanEdit(false);
          submitForm();
        } else {
          setCanEdit(true);
        }
        setErrors(errors);
      }}
      className={classes.editButton}
      style={canEdit ? { background: 'linear-gradient(262.83deg, #9E2FFF -65.65%, #2FFF9E 139.08%)' } : undefined}>
      {!canEdit ? 'לערוך' : 'שמור'}
      <img src={canEdit ? tickIcon : pencilIcon} alt="" style={canEdit ? { display: 'none' } : undefined} />
      <img src={tickIcon} alt="" style={!canEdit ? { display: 'none' } : undefined} />
    </button>
  );
}

export default EditButton;
