"use client";
import { useState } from "react";

export default function ContactFormPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrors("L'email è obbligatoria.");
      return;
    }
    // Qui puoi gestire l'invio o i dati
    setSubmitted(true);
    setErrors(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">Contatti</h2>

        {submitted ? (
          <p className="text-green-600 text-center">
            Modulo inviato con successo!
          </p>
        ) : (
          <>
            {errors && (
              <p className="text-red-500 text-sm text-center">{errors}</p>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Numero di telefono */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Numero di telefono
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Cognome */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cognome
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Sesso */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Sesso</p>
              <div className="flex justify-center space-x-6">
                {["Maschio", "Femmina", "Other"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={gender === option}
                      onChange={() =>
                        setGender(gender === option ? null : option)
                      }
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 text-center">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Invia
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
