import React, { useState } from 'react'
import Title from './Title'
import { Mail, MessageSquare, MapPin, Phone } from 'lucide-react'
import toast from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    // Simulate sending message
    toast.success("Message sent successfully! We will get back to you soon.");
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };
  return (
    <div id='contact' className='flex flex-col items-center my-20 px-4 scroll-mt-24'>
      <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 rounded-full px-6 py-1.5 font-medium border border-indigo-500/20 mb-4">
          <MessageSquare width={16}/>
          <span>Get in touch</span>
      </div>
      <Title title='Contact Us' description='Have questions about our resume builder? We are here to help you land your dream job.'/>

      <div className='grid md:grid-cols-2 gap-10 max-w-5xl w-full mt-12'>
        {/* Contact Info */}
        <div className='flex flex-col gap-6'>
          <div className='flex items-start gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800'>
            <div className='p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'>
              <Mail className='size-6' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-slate-800 dark:text-slate-100'>Email Us</h3>
              <p className='text-slate-600 dark:text-slate-400 mt-1'>We'll get back to you within 24 hours.</p>
              <a href="mailto:manishsingh10838@gmail.com" className='text-indigo-600 dark:text-indigo-400 font-medium mt-2 inline-block hover:underline'>manishsingh10838@gmail.com</a>
            </div>
          </div>

          <div className='flex items-start gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800'>
            <div className='p-3 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400'>
              <Phone className='size-6' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-slate-800 dark:text-slate-100'>WhatsApp</h3>
              <p className='text-slate-600 dark:text-slate-400 mt-1'>Chat with us directly.</p>
              <a href="https://wa.me/917970612646" target="_blank" rel="noreferrer" className='text-green-600 dark:text-green-400 font-medium mt-2 inline-block hover:underline'>+91 7970612646</a>
            </div>
          </div>

          <div className='flex items-start gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800'>
            <div className='p-3 rounded-lg bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400'>
              <MapPin className='size-6' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-slate-800 dark:text-slate-100'>Office Location</h3>
              <p className='text-slate-600 dark:text-slate-400 mt-1'>Come visit our friendly team.</p>
              <p className='text-slate-800 dark:text-slate-300 font-medium mt-2'>bhikhpur bagwanpur siwan Bihar 8412 36</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className='bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className='grid grid-cols-2 gap-5'>
              <div className='flex flex-col gap-1.5'>
                <label htmlFor="firstName" className='text-sm font-medium text-slate-700 dark:text-slate-300'>First Name *</label>
                <input type="text" id="firstName" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} placeholder="John" className='px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:text-white transition-all'/>
              </div>
              <div className='flex flex-col gap-1.5'>
                <label htmlFor="lastName" className='text-sm font-medium text-slate-700 dark:text-slate-300'>Last Name</label>
                <input type="text" id="lastName" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} placeholder="Doe" className='px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:text-white transition-all'/>
              </div>
            </div>

            <div className='flex flex-col gap-1.5'>
              <label htmlFor="email" className='text-sm font-medium text-slate-700 dark:text-slate-300'>Email Address *</label>
              <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className='px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:text-white transition-all'/>
            </div>

            <div className='flex flex-col gap-1.5'>
              <label htmlFor="message" className='text-sm font-medium text-slate-700 dark:text-slate-300'>Message *</label>
              <textarea id="message" rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="How can we help you?" className='px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:text-white resize-none transition-all'></textarea>
            </div>

            <button type="submit" className='mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/25 text-white font-medium py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 cursor-pointer'>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
