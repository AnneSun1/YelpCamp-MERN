import Form from 'react-bootstrap/Form';

const FormTextExample = ({text}) => {
  return (
    <>
      <Form.Label htmlFor="input">{text}</Form.Label>
      <Form.Control
        type="password"
      />
    </>
  );
}

export default FormTextExample;