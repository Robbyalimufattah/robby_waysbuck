import { useContext, useState } from "react";
import { API } from "../config/api";

import { UserContext } from "../contexts/UserContext";

export default function EditProfile() {
  const [message, setMessage] = useState(null);
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    fullname: state.user.fullname,
    email: state.user.email,
    phone: state.user.profile.phone ? state.user.profile.phone : "",
    address: state.user.profile.address ? state.user.profile.address : "",
  });

  const { fullname, email, phone, address } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.patch(`/user/${state.user.id}`, body, config);

      const alert = (
        <div
          className="bg-green-300 rounded-md text-center text-sm px-4 py-3 mt-4"
          role="alert"
        >
          <p>Changes saved.</p>
        </div>
      );
      setMessage(alert);
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="my-14 mx-4 lg:mx-40">
      <h3 className="text-3xl font-['Avenir-Black'] font-extrabold text-brand-red mb-8">
        Edit Profile
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6 mb-8">
          <input
            type="text"
            name="fullname"
            id="fullname"
            required
            onChange={handleChange}
            onInvalid={(e) => e.target.setCustomValidity("Name required.")}
            onInput={(e) => e.target.setCustomValidity("")}
            placeholder="Full Name"
            value={fullname}
            className="w-full p-3 outline outline-2 outline-red-500 focus:outline-red-700 rounded-md bg-pink-100"
          />
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={handleChange}
            onInvalid={(e) => e.target.setCustomValidity("Email required.")}
            onInput={(e) => e.target.setCustomValidity("")}
            placeholder="Email"
            value={email}
            className="w-full p-3 outline outline-2 outline-red-500 focus:outline-red-700 rounded-md bg-pink-100"
          />
          <input
            type="tel"
            name="phone"
            id="phone"
            onChange={handleChange}
            placeholder="Phone"
            value={phone}
            className="w-full p-3 outline outline-2 outline-red-500 focus:outline-red-700 rounded-md bg-pink-100"
          />
          <textarea
            name="address"
            id="address"
            onChange={handleChange}
            className="w-full p-3 outline outline-2 outline-red-500 focus:outline-red-700 rounded-md bg-pink-100"
            rows={5}
            placeholder="Address"
            value={address}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-md text-white text-center bg-brand-red"
        >
          Save Profile Changes
        </button>
        {message && message}
      </form>
    </div>
  );
}
