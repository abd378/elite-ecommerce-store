import { useState } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../supabaseClient";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, name, email, role")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile) {
      toast.error("Profile not found");
      return;
    }

    const loggedUser = {
      id: data.user.id,
      name: profile.name || "User",
      email: data.user.email,
      role: profile.role || "user",
    };

    localStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);

    toast.success(`Login successful as ${loggedUser.role}`);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;