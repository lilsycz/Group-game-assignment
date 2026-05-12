function Login() {
  return (
    <div className="login-page">

      <div className="logo">
        <span>Swedish Match</span>
      </div>

      <div className="login-card">
        <input type="username" placeholder="Username" className="text-body" />
        <input type="password" placeholder="Password" className="text-body" />
      </div>

      <div className="login-buttons">
        <button className="text-button btn-primary">Log in</button>
        <button className="text-button btn-secondary">Create account</button>
      </div>

    </div>
  )
}

export default Login