import { useState } from "react";
import { useAuthContext } from "../context/Auth-Context";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Authentication = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, login } = useAuthContext();

  const signUp = async () => {
    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await signup(username, email, password, "student");
      toast.success("Signed up successfully", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error: any) {
      const msg =
        error?.data?.error ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to sign up";
      toast.error(msg);
      console.error("Sign up error:", error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Signed in successfully", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error: any) {
      const msg =
        error?.data?.error ||
        error?.response?.data?.error ||
        "Incorrect email/password or server connection error";
      toast.error(msg);
      console.error("Sign in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-auth">
      {/* Features Section */}
      <div className="features-section-auth">
        <div className="features-card-overlay">
          <h2>Platform Features</h2>
          <ul>
            <li>✓ Collaborative Learning Environment</li>
            <li>✓ User-Friendly Resource Sharing</li>
            <li>✓ Class Creation and Participation</li>
            <li>✓ Access to a Diverse Range of Study Materials</li>
          </ul>
        </div>
      </div>

      {/* Login/Register Form Section */}
      <div className="form-section-auth">
        <div className="form-section-heading-auth">
          Collaborative Study Platform
        </div>

        {/* Toggle between Sign In and Sign Up */}
        <div className="form-toggle-auth">
          <button
            type="button"
            onClick={() => setIsSignIn(true)}
            className={isSignIn ? "active" : ""}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignIn(false)}
            className={!isSignIn ? "active" : ""}
            id="create-account"
          >
            Create Account
          </button>
        </div>

        {isSignIn ? (
          // Sign In Form
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await signIn();
            }}
            className="form-auth"
          >
            <h3>Welcome Back</h3>
            <p>Hello there, sign in to continue</p>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading} className="sign-in">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        ) : (
          // Sign Up Form
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await signUp();
            }}
            className="form-auth"
          >
            <h3>Create Account</h3>
            <p>Hello there, fill in below to create an account</p>
            <input
              type="text"
              placeholder="Username / Full Name"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-gray-600 mb-2">
              Password: 8-15 chars, uppercase, lowercase, number & symbol.
            </p>
            <button type="submit" disabled={loading} className="sign-up">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Authentication;
