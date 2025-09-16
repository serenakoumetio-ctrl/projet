// import React, { useState } from 'react';

// function ContactForm() {
//   const [formData, setFormData] = useState({
//     nom: '',
//     email: '',
//     message: ''
//   });
//   const [feedback, setFeedback] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('http://localhost:5000/api/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setFeedback(data.error || 'Erreur lors de l\'envoi');
//       } else {
//         setFeedback(data.message);
//         setFormData({ nom: '', email: '', message: '' }); // Reset
//       }
//     } catch (err) {
//       setFeedback('Erreur réseau');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
//       <h2 className="text-3xl font-bold text-white mb-6">Contactez-nous</h2>
//       <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
//         <input
//           type="text"
//           name="nom"
//           placeholder="Nom"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-3 rounded bg-white/70"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-3 rounded bg-white/70"
//           required
//         />
//         <textarea
//           name="message"
//           placeholder="Votre message"
//           value={formData.message}
//           onChange={handleChange}
//           className="w-full p-3 rounded bg-white/70"
//           rows="4"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
//         >
//           Envoyer
//         </button>
//         {feedback && (
//           <p className="text-center text-white mt-2">{feedback}</p>
//         )}
//       </form>
//     </div>
//   );
// }

// export default ContactForm;
