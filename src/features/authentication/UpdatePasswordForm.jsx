import { useEffect } from "react";
import supabase from "../../services/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import useUpdatePassword from "./useUpdatePassword";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdatePassword({ internal = false }) {
  const navigate = useNavigate();
  const { updatePassword, isLoading } = useUpdatePassword();
  const { register, formState, handleSubmit, getValues, reset } = useForm();

  const { errors } = formState;

  useEffect(() => {
    if (internal) return;
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event, session);
        if (!session || session === null) {
          toast.error("Password reset link expired or invalid.", {
            duration: 8000,
          });
          navigate("/login", { replace: true });
          return;
        }

        if (event === "PASSWORD_RECOVERY") {
          try {
            await supabase.auth.setSession({
              access_token: session.access_token,
              refresh_token: session.refresh_token,
            });
          } catch (error) {
            console.error("Error setting session:", error);
            toast.error(
              "Your reset link has expired. Please request a new one."
            );
            navigate("/login", { replace: true });
          }
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [navigate, internal]);

  function onSubmit({ password }) {
    updatePassword(password, {
      onSuccess: () => {
        reset();
        if (internal) return;
        navigate("/login", { replace: true });
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        type="regular"
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        type="regular"
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow type="regular">
        <Button>{isLoading ? <SpinnerMini /> : "Reset password"}</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePassword;
