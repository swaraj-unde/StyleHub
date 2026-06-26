import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();

    dispatch(loginUser(formData)).then((result) => {
      if (result?.payload?.success) {
        toast.success(result.payload.message);
      } else {
        toast.error(result?.payload?.message || "Login failed");
      }
    });
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Login
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Welcome back! Sign in to continue shopping.
          </p>
        </div>

        <CommonForm
          formControls={loginFormControls}
          buttonText="Sign In"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-white transition-colors hover:text-zinc-300"
          >
            Register
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-zinc-500">
          <span className="font-semibold">Admin Demo:</span>
          <br />
          Email:{" "}
          <span className="font-mono text-zinc-300">test1@gmail.com</span>
          <br />
          Password: <span className="font-mono text-zinc-300">test1</span>
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;
