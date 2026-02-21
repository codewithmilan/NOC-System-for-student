const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h2 className="text-2xl font-bold mb-4">
          Reset Password
        </h2>

        <input
          placeholder="Enter Email"
          className="w-full p-3 border rounded mb-4"
        />

        <button className="bg-blue-600 text-white w-full p-3 rounded">
          Send Reset Link
        </button>

      </div>

    </div>
  );
};

export default ForgotPassword;
