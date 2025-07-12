import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useLogin } from "../Api/LoginApi";
import { useContext } from "react";
import { MyContext } from "../../Context";


const schema = z.object({
  username: z.string().min(0, "/"),
  password: z.string().min(6, "Lozinka mora imati bar 6 karaktera"),
});

export function Login() {

  const { lightMode } = useContext(MyContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const formDataRef = useRef(null);

  const login = useLogin();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: () => login(formDataRef.current),
    enabled: false,
  });

  const onSubmit = (values) => {
    formDataRef.current = values;
    refetch();
  };

  return (
    <div id={lightMode ? "login-container-light" : "login-container-dark"}>
      <h2 
      className="login-heading"
      >Login</h2>

      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="form"
      >
        <label 
        className="username-label">Username:</label>
        <input 
        type="text" 
        className="username-input"
        {...register("username")} />
        {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}

        <label
        className="password-label"
        >Password:</label>
        <input 
        type="password"
        className="password-input" 
        {...register("password")} />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

        <button 
        type="submit" 
        disabled={isLoading} 
        className="subbmit-button">
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {data && (
        <div>
          ✅ Logged in successfully!
        </div>
      )}

      {error && (
        <p>
          ❌ Error: {error.message}
        </p>
      )}
    </div>
  );
}