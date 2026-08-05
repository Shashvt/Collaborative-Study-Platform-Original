import { useState } from "react";
import { useAuthContext } from "../context/Auth-Context";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Authentication = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, login } = useAuthContext();

  const signUp = async () => {
    try {
      await signup(username, email, password, "student").then(() => {
        toast.success('Signed up Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
      );
    } catch (error: any) {
      toast.error(error.data.error);
      console.log(error.data.error);
    }
  };

  const signIn = async () => {
    try {
      await login(email, password);
      toast.success('Signed in Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    } catch (error) {
      console.log(error);
      toast.error("Incorrect credentials");
    }
  };

  return (
    <div className="container-auth">
      {/* Features Section */}
      <div className="features-section-auth">
        <h2>Features</h2>
        <ul>
          <li>Collaborative Learning Environment</li>
          <li>User-Friendly Resource Sharing</li>
          <li>Class Creation and Participation</li>
          <li>Access to a Diverse Range of Study Materials</li>
        </ul>
      </div>

      {/* Login/Register Form Section */}
      <div className="form-section-auth">
        <div className="form-section-heading-auth">
          Collaborative Study Platform
        </div>

        {/* Toggle between Sign In and Sign Up */}
        <div className="form-toggle-auth">
          <button
            onClick={() => setIsSignIn(true)}
            className={isSignIn ? "active" : ""}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            className={!isSignIn ? "active" : ""}
            id="create-account"
          >
            Create Account
          </button>
        </div>

        {isSignIn ? (
          // Sign In Form
          <div className="form-auth">
            <h3>Welcome Back</h3>
            <p>Hello there, sign in to continue</p>
            <input
              type="text"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={async () => {
                await signIn();
              }}
              className="sign-in"
            >
              Sign In
            </button>
          </div>
        ) : (
          // Sign Up Form
          <div className="form-auth">
            <h3>Create Account</h3>
            <p>Hello there, fill in below to create an account</p>
            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={async () => {
                await signUp();
                // console.log("I was clicked")
              }}
              className="sign-up"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authentication;
