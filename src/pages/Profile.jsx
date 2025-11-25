import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useUser } from "../features/authentication/useUser";

function Profile() {
  const { user } = useUser();
  const userId = user?.id;

  if (userId === "74d57fea-dfc0-4a97-bf5c-1a194558a762")
    return (
      <>
        <Heading as="h1">Update your account</Heading>

        <Row type="vertical">
          <Heading as="h3">Update user data</Heading>
          <p>
            This is a demo account. Create an account to test the profile update
            (name, avatar) functionality.
          </p>
        </Row>

        <Row>
          <Heading as="h3">Update password</Heading>
          <p>
            This is a demo account. Create an account to test the password reset
            functionality.
          </p>
        </Row>
      </>
    );

  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row type="vertical">
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm internal={true} />
      </Row>
    </>
  );
}

export default Profile;
