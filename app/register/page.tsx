import PostForm from "@/components/register/post-form";
import { handleRegister } from "../actions/post-actions";

const RegisterPage = () => {
  return <PostForm action={handleRegister} />;
};

export default RegisterPage;
