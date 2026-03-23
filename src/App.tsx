/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Chatbot from './components/Chatbot';
import { Sparkles, Activity, Smile, Shield, Syringe, CheckCircle2, MapPin, Phone, Mail, Crown } from 'lucide-react';

const Section = ({ id, title, children, className = "" }: { id?: string, title?: string, children: React.ReactNode, className?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`py-24 px-6 will-change-transform will-change-opacity ${className}`}
  >
    {title && <h2 className="text-5xl font-extrabold text-dentista-dark mb-16 text-center tracking-tight">{title}</h2>}
    {children}
  </motion.section>
);

const TreatmentCard = ({ title, desc, img, icon: Icon }: { title: string, desc: string, img: string, icon: React.ElementType }) => (
  <motion.div 
    whileHover={{ y: -15, boxShadow: "0 20px 40px rgba(242, 39, 126, 0.15)" }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 overflow-hidden group relative will-change-transform"
  >
    <div className="absolute top-6 right-6 bg-pink-50 p-3 rounded-full text-dentista-pink group-hover:bg-dentista-pink group-hover:text-white transition-colors duration-300">
      <Icon size={24} />
    </div>
    <div className="h-48 mb-6 overflow-hidden rounded-2xl">
      <img src={img} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
    </div>
    <h3 className="text-2xl font-bold text-dentista-dark mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </motion.div>
);

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-dentista-pink shadow-sm bg-white flex-shrink-0 flex items-center justify-center">
              <img src="/logo.png" alt="Dentista Logo" className="w-full h-full object-cover scale-[1.2]" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=D&background=F2277E&color=fff&rounded=true' }} />
            </div>
            <span className="text-2xl md:text-3xl font-extrabold text-dentista-teal tracking-tighter">Dentista</span>
          </div>
          <div className="hidden md:flex gap-8 font-medium text-gray-600">
            <a href="#home" className="hover:text-dentista-pink transition-colors">Home</a>
            <a href="#treatments" className="hover:text-dentista-pink transition-colors">Treatments</a>
            <a href="#about" className="hover:text-dentista-pink transition-colors">About</a>
            <a href="#contact" className="hover:text-dentista-pink transition-colors">Contact</a>
          </div>
          <a href="#book" className="bg-dentista-pink text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-semibold hover:bg-pink-600 transition-colors shadow-md hover:shadow-lg whitespace-nowrap">
            Book Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 min-h-screen flex items-center px-6 bg-gradient-to-br from-pink-50/50 via-white to-teal-50/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-left space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-teal-50 text-dentista-teal px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border border-teal-100"
            >
              <Crown size={16} className="text-dentista-pink" />
              Premium Dental Care
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-dentista-dark leading-tight tracking-tighter"
            >
              A confident smile begins with <span className="text-transparent bg-clip-text bg-gradient-to-r from-dentista-pink to-pink-400">healthy teeth.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-lg leading-relaxed"
            >
              Experience world-class dentistry with state-of-the-art technology and a gentle touch.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <a href="#book" className="inline-block bg-dentista-pink text-white px-8 py-4 md:px-10 md:py-5 rounded-full text-lg md:text-xl font-bold shadow-xl hover:bg-pink-600 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Book Appointment
              </a>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
          >
            <img src="https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?q=80&w=2000" alt="Modern Dental Clinic" fetchPriority="high" decoding="async" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-dentista-teal/20 to-transparent mix-blend-multiply"></div>
          </motion.div>
        </div>
      </section>

      {/* Treatments Section */}
      <Section id="treatments" title="Our Premium Services" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          <TreatmentCard icon={Sparkles} title="Teeth Cleaning" desc="Advanced ultrasonic cleaning for a brighter, healthier smile." img="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800" />
          <TreatmentCard icon={Activity} title="Root Canal" desc="Pain-free, expert root canal therapy to save your natural teeth." img="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800" />
          <TreatmentCard icon={Smile} title="Braces & Aligners" desc="Customized orthodontic solutions for perfectly aligned teeth." img="https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=800" />
          <TreatmentCard icon={Sparkles} title="Teeth Whitening" desc="Professional-grade whitening for a dazzling, confident smile." img="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800" />
          <TreatmentCard icon={Shield} title="Dental Implants" desc="State-of-the-art implants for a permanent, natural-looking solution." img="https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?q=80&w=800" />
          <TreatmentCard icon={Syringe} title="Oral Surgery" desc="Safe and comfortable surgical procedures by expert specialists." img="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800" />
        </div>
      </Section>

      {/* About Us Section */}
      <Section id="about" title="Meet Our Doctors" className="bg-pink-50/30">
        <div className="max-w-6xl mx-auto space-y-24">
          {/* Doctor 1 */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 h-[500px] rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white will-change-transform"
            >
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800" alt="Dr. Deval Naik" loading="lazy" decoding="async" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dentista-dark/80 to-transparent p-8">
                <p className="text-white font-bold text-2xl">Dr. Deval Naik</p>
                <p className="text-pink-200">Cosmetic & Restorative Dentist</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 space-y-6"
            >
              <h3 className="text-4xl font-bold text-dentista-teal">Dr. Deval Naik</h3>
              <p className="text-xl text-gray-700 leading-relaxed">
                Dr. Deval Naik earned her Bachelors in Dental Surgery from MGV Dental College & Hospital, Nasik in 2005 with an emphasis on Cosmetic & Restorative Dentistry.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                With over 18 years of clinical experience, Dr. Naik is dedicated to providing pain-free, aesthetic, and functional dental solutions. Her expertise lies in transforming smiles and restoring dental health with the latest techniques and compassionate care.
              </p>
              <div className="pt-6 flex gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 text-center">
                  <p className="text-4xl font-extrabold text-dentista-pink">18+</p>
                  <p className="text-gray-500 font-medium mt-1">Years Exp.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 text-center">
                  <p className="text-4xl font-extrabold text-dentista-pink">2005</p>
                  <p className="text-gray-500 font-medium mt-1">Graduation</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Doctor 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 h-[500px] rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white will-change-transform"
            >
              <img src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800" alt="Dr. Tejal Shah" loading="lazy" decoding="async" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dentista-dark/80 to-transparent p-8">
                <p className="text-white font-bold text-2xl">Dr. Tejal Shah</p>
                <p className="text-pink-200">Cosmetic & Restorative Dentist</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 space-y-6"
            >
              <h3 className="text-4xl font-bold text-dentista-teal">Dr. Tejal Shah</h3>
              <p className="text-xl text-gray-700 leading-relaxed">
                Dr. Tejal Shah is a co-founder & Dental Surgeon at Dentista. She obtained her Bachelor of Dental Surgery from Maharashtra University of Health Science (Nashik) in 2005.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                As a Cosmetic & Restorative Dentist, Dr. Shah brings her extensive experience and passion for creating beautiful, healthy smiles to every patient she treats.
              </p>
              <div className="pt-6 flex gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 text-center">
                  <p className="text-4xl font-extrabold text-dentista-pink">18+</p>
                  <p className="text-gray-500 font-medium mt-1">Years Exp.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 text-center">
                  <p className="text-4xl font-extrabold text-dentista-pink">2005</p>
                  <p className="text-gray-500 font-medium mt-1">Graduation</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Book Appointment Section */}
      <Section id="book" title="Book Your Consultation" className="bg-dentista-teal text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-2xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleBooking} 
                className="space-y-6 bg-white p-10 rounded-3xl shadow-2xl text-gray-800 border-t-8 border-dentista-pink"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-dentista-pink focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Phone Number</label>
                  <input required type="tel" placeholder="+91 98765 43210" className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-dentista-pink focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Preferred Date</label>
                  <input required type="date" className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-dentista-pink focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Preferred Time</label>
                  <input required type="time" className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-dentista-pink focus:border-transparent outline-none transition-all" />
                </div>
                <button type="submit" className="w-full bg-dentista-pink text-white py-5 rounded-2xl text-xl font-bold hover:bg-pink-600 hover:shadow-lg transition-all transform active:scale-95">
                  Confirm Appointment
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-16 rounded-3xl shadow-2xl text-center flex flex-col items-center justify-center space-y-6 border-t-8 border-dentista-teal"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                >
                  <CheckCircle2 className="text-dentista-teal w-24 h-24" />
                </motion.div>
                <h3 className="text-3xl font-bold text-dentista-dark">Booking Confirmed!</h3>
                <p className="text-gray-600 text-lg">Thank you. We will contact you shortly to confirm your time slot.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Visit Us" className="bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 mb-12">
          <div className="flex flex-row md:flex-col items-center text-left md:text-center p-5 md:p-8 bg-pink-50/50 rounded-2xl md:rounded-3xl border border-pink-100 gap-4 md:gap-0">
            <div className="bg-white p-3 md:p-4 rounded-full text-dentista-pink md:mb-4 shadow-sm flex-shrink-0"><MapPin className="w-6 h-6 md:w-8 md:h-8" /></div>
            <div>
              <h4 className="text-lg md:text-xl font-bold text-dentista-dark mb-1 md:mb-2">Location</h4>
              <p className="text-sm md:text-base text-gray-600">101, Premium Plaza, Sector 18<span className="md:hidden">, </span><br className="hidden md:block"/>Noida, UP 201301</p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col items-center text-left md:text-center p-5 md:p-8 bg-teal-50/50 rounded-2xl md:rounded-3xl border border-teal-100 gap-4 md:gap-0">
            <div className="bg-white p-3 md:p-4 rounded-full text-dentista-teal md:mb-4 shadow-sm flex-shrink-0"><Phone className="w-6 h-6 md:w-8 md:h-8" /></div>
            <div>
              <h4 className="text-lg md:text-xl font-bold text-dentista-dark mb-1 md:mb-2">Phone</h4>
              <p className="text-sm md:text-base text-gray-600">+91 98765 43210<span className="md:hidden"> | </span><br className="hidden md:block"/>Mon-Sat, 9am - 6pm</p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col items-center text-left md:text-center p-5 md:p-8 bg-pink-50/50 rounded-2xl md:rounded-3xl border border-pink-100 gap-4 md:gap-0">
            <div className="bg-white p-3 md:p-4 rounded-full text-dentista-pink md:mb-4 shadow-sm flex-shrink-0"><Mail className="w-6 h-6 md:w-8 md:h-8" /></div>
            <div>
              <h4 className="text-lg md:text-xl font-bold text-dentista-dark mb-1 md:mb-2">Email</h4>
              <p className="text-sm md:text-base text-gray-600">contact@dentista.in<span className="md:hidden"> | </span><br className="hidden md:block"/>support@dentista.in</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto w-full h-[400px] rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562064141641!2d77.3182803150821!3d28.57291198244111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45b00000000%3A0x727971faa6cb4807!2sSector%2018%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1621523000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy"
            title="Clinic Location"
          ></iframe>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-dentista-dark text-gray-400 py-12 text-center border-t-4 border-dentista-pink">
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-dentista-pink shadow-sm bg-white flex-shrink-0 flex items-center justify-center">
            <img src="/logo.png" alt="Dentista Logo" className="w-full h-full object-cover scale-[1.2]" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=D&background=F2277E&color=fff&rounded=true' }} />
          </div>
          <span className="text-3xl font-extrabold text-white tracking-tighter">Dentista</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Dentista Clinic. All rights reserved.</p>
      </footer>

      <Chatbot />
    </div>
  );
}
