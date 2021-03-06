import { FieldProps } from 'formik';
import * as React from 'react';
import { Form, Message } from 'semantic-ui-react';

export const InputField: React.SFC<
  FieldProps<any> & { required: boolean; label: string; placeholder: string }
> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  required,
  placeholder,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  return (
    <Form.Field required={required} error={!!errorMsg}>
      {label && <label>{label}</label>}
      <input placeholder={placeholder || label} {...field} {...props} />
      {errorMsg && (
        <Message error={!!errorMsg} content={errorMsg ? errorMsg : false} />
      )}
    </Form.Field>
  );
};
