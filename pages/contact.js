import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Loader from "../components/loader";

const Contact = () => {
  const [showError, setShowError] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        alert("Mesajul a fost trimis cu succes!");
      } else {
        setShowError(true);
      }
    } catch (error) {
      setError(error);
      console.log(error.message);
      setShowError(true);
    }

    setFormData(initialFormData);
    setLoading(false);
  };

  return (
    <section className="bg-zinc-900 text-stone-300 w-full flex items-center">
      <section className="container sm:mx-auto md:my-20">
        <div className="flex flex-col items-center md:items-start md:flex-row gap-20 justify-center ">
          {/* Formular de contact */}
          <div className="md:w-1/2">
            <h1 className="pl-2 block text-stone-300 text-lg font-black mb-2 uppercase">
              Formular de contact
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center justify-center gap-5 w-[300px] text-black ">
                <div className="p-2 w-full">
                  <label
                    htmlFor="name"
                    className="block text-stone-300 text-sm font-bold mb-2 uppercase"
                  >
                    Nume
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    minLength={3}
                    required={true}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    className="p-1 rounded-md w-full bg-stone-300"
                  />
                </div>
                <div className="p-2 w-full">
                  <label
                    htmlFor="email"
                    className="block text-stone-300 text-sm font-bold mb-2 uppercase"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required={true}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    className="p-1 rounded-md w-full bg-stone-300"
                  />
                </div>
                <div className="p-2 w-full">
                  <label
                    htmlFor="phone"
                    className="block text-stone-300 text-sm font-bold mb-2 uppercase"
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="[+ 0-9]{7,15}"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                    }}
                    className="p-1 rounded-md w-full bg-stone-300"
                  />
                </div>
                <div className="p-2 w-full">
                  <label
                    htmlFor="message"
                    className="block text-stone-300 text-sm font-bold mb-2 uppercase"
                  >
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required={true}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                    }}
                    className="contact-input h-32 w-full resize-none leading-6 p-1 rounded-md bg-stone-300"
                  ></textarea>
                </div>

                {/* todo: Handle errors */}

                {showError ? (
                  <div className="pb-2 px-2 w-full">
                    <p className="text-sm text-orange-600">{error}</p>
                  </div>
                ) : null}

                <button
                  className={
                    loading || error
                      ? "w-full border-2 border-gray-500 text-gray-500 rounded-xl p-2 hover: uppercase"
                      : "w-full border-2 border-blue-400 bg- text-blue-400 rounded-xl p-2 hover: cursor-pointer uppercase"
                  }
                  type="submit"
                  disabled={loading}
                >
                  Trimite
                </button>
              </div>
            </form>
          </div>
          {/* Informatii de contact */}
          <div className="md:w-1/3 flex flex-col items-center md:items-start gap-5 pb-5">
            <h1 className="block text-stone-300 text-lg font-black mb-2 uppercase">
              Informatii de contact
            </h1>
            <div className="flex flex-col gap-5">
              <div className="mb-4">
                <h2 className="block text-stone-300 text-sm font-bold mb-2 uppercase">
                  Email
                </h2>
                <a
                  href="mailto:contact@test.ro"
                  className="hover:text-blue-100 mb-5"
                >
                  drg.anamaria12@gmail.ro
                </a>
              </div>
              <div>
                <h2 className="block text-stone-300 text-sm font-bold mb-2 uppercase">
                  Phone
                </h2>
                <p className="leading-relaxed">+40 741 143 108</p>
              </div>
              <div className="text-stone-300">
                <div className="flex flex-col gap-5 items-center">
                  <FaMapMarkerAlt size={50} />
                  <h2 className="text-xl">Galati, Romania</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Contact;
