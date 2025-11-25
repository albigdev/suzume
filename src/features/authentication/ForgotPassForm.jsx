import { useForgotPassword } from "./useForgotPassword";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";
import FormRow from "../../ui/FormRow";

function ForgotPassForm() {
  const { sendPasswordResetEmail, isLoading } = useForgotPassword();
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  function onSubmit({ email }) {
    sendPasswordResetEmail(email);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRowVertical>
      <FormRow type="regular">
        <Button variation="primary" disabled={isLoading}>
          {!isLoading ? "Send reset link" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default ForgotPassForm;
