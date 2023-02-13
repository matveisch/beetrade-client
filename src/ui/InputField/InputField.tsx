import { Field } from 'formik';
import classes from './InputField.module.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface InputFieldProps {
  errors: string | undefined;
  touched: boolean | undefined;
  id: string;
  placeholder: string;
  type: string;
  label: string;
}

function InputField({ errors, touched, id, placeholder, type, label }: InputFieldProps) {
  return (
    <div className={classes.inputField}>
      <label htmlFor={id}>{label}</label>
      <div className={classes.inputContainer}>
        <Field
          id={id}
          name={id}
          placeholder={placeholder}
          type={type}
          errors={errors}
          touched={touched?.toString()}
          style={errors && touched ? { border: '3px solid #ff2f2f', borderRadius: '8px' } : undefined}
        />
        {errors && touched && <ErrorMessage error={errors} />}
      </div>
    </div>
  );
}

export default InputField;
