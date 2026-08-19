import { supabase } from "../config/supabase.js";

const ALLOWED_EMAIL = "alifbrur16@gmail.com";

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");
const loginBtn = document.getElementById("loginBtn");

async function checkExistingSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    if (session.user.email !== ALLOWED_EMAIL) {
      await supabase.auth.signOut();
      return;
    }
    window.location.href = "/admin/panel.html";
  }
}

checkExistingSession();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";
  loginBtn.disabled = true;
  loginBtn.textContent = "Signing in...";

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      errorMsg.textContent = "Invalid email or password";
      return;
    }

    if (data.session) {
      if (data.session.user.email !== ALLOWED_EMAIL) {
        await supabase.auth.signOut();
        errorMsg.textContent = "Access denied";
        return;
      }
      window.location.href = "/admin/panel.html";
    }
  } catch (err) {
    errorMsg.textContent = "Connection error. Try again.";
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Sign In";
  }
});
