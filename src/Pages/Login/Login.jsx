import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const {signIn} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) =>{
    console.log(data);
    signIn(data.email, data.password)
    .then(result =>{
      const loggedUser = result.user;
      console.log(loggedUser);
    })
    .catch(error =>{
      const message = error.message;
      console.log(message);
    })

  } 
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content">
        <div className="card w-full  shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", {
                  required: "Email Address is required",
                })}
                aria-invalid={errors.email ? "true" : "false"}
                className="input input-bordered"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-2" role="alert">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                })}
                aria-invalid={errors.password ? "true" : "false"}
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-sm text-red-500 mt-2" role="alert">
                  password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-sm text-red-500 mt-2" role="alert">
                  Password must be six characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-sm text-red-500 mt-2" role="alert"></p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-sm text-red-500 mt-2" role="alert">
                  Password must be at least one number and one special character
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
            <p className="text-sm">
              Don't have an Account?
              <Link to="/signup">
                <button className="btn btn-link">please Sign up</button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
