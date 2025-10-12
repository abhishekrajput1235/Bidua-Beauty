import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, User, MessageSquare, X } from 'lucide-react';
import { toast } from 'react-toastify';

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !email || !message) {
      toast.error('Please fill all fields');
      setIsSubmitting(false);
      return;
    }

    // Simulate sending data
    setTimeout(() => {
      toast.success('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-16 relative flex flex-col items-center">
      {/* Background Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-36 sm:w-56 md:w-72 h-36 sm:h-56 md:h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-6 sm:mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
          Contact Us
        </h1>

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transform transition-all duration-300">
            <Phone className="w-8 h-8 text-amber-400 mb-3" />
            <h3 className="text-white font-bold mb-1">Phone</h3>
            <p className="text-gray-300 text-sm">+91 98765 43210</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transform transition-all duration-300">
            <Mail className="w-8 h-8 text-amber-400 mb-3" />
            <h3 className="text-white font-bold mb-1">Email</h3>
            <p className="text-gray-300 text-sm">support@biduabeauty.com</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transform transition-all duration-300">
            <MapPin className="w-8 h-8 text-amber-400 mb-3" />
            <h3 className="text-white font-bold mb-1">Address</h3>
            <p className="text-gray-300 text-sm">123 Business Street, City, State, India</p>
          </div>
        </div>

        {/* Contact Form + Map */}
        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-black/50 border border-gray-600 rounded-xl py-2.5 sm:py-3 pl-10 pr-4 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:border-amber-400 transition-colors duration-300"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full bg-black/50 border border-gray-600 rounded-xl py-2.5 sm:py-3 pl-10 pr-4 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:border-amber-400 transition-colors duration-300"
                  required
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message"
                  rows={4}
                  className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:border-amber-400 transition-colors duration-300 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-2.5 sm:py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-amber-400/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Google Map */}
          <div className="rounded-3xl overflow-hidden border border-gray-700/50">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019590235322!2d144.9630583153163!3d-37.81410797975126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f0e69d7f%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="min-h-[300px] sm:min-h-[400px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-400">
          You can also reach us at <a href="mailto:support@biduabeauty.com" className="text-amber-400 underline">support@biduabeauty.com</a>
        </div>
      </div>

      {/* Floating Quick Action Button for Mobile */}
      <div className="sm:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        {/* Toggle Button */}
        <button
          onClick={() => setShowQuickActions(!showQuickActions)}
          className="bg-amber-400 text-black w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform duration-300"
        >
          {showQuickActions ? <X size={24} /> : <Phone size={24} />}
        </button>

        {/* Action Buttons */}
        {showQuickActions && (
          <div className="flex flex-col items-end space-y-2 mt-2">
            <a
              href="tel:+919876543210"
              className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
              title="Call Us"
            >
              <Phone size={20} />
            </a>
            <a
              href="mailto:support@biduabeauty.com"
              className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
              title="Email Us"
            >
              <Mail size={20} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUsPage;
