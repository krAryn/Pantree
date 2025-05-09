import React from 'react'

const Contact = () => {
    return (
        <div>
            <form className="flex flex-col items-center text-sm mt-12 px-6 md:px-16 lg:px-32">
                <p className="text-lg text-primary font-medium pb-2">Contact Us</p>
                <h1 className="text-4xl font-semibold text-slate-700 pb-4">Get in touch with us</h1>
                <p className="text-sm text-gray-500 text-center pb-10">Have questions, feedback, or a request? We're here to help—just reach out, <br /> and let’s keep your pantry stocked with ease!</p>

                <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
                    <div className="w-full">
                        <label className="text-black/70" htmlFor="name">Your Name</label>
                        <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-primary" type="text" required placeholder='Enter Full Name' />
                    </div>
                    <div className="w-full">
                        <label className="text-black/70" htmlFor="name">Your Email</label>
                        <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-primary" type="email" required placeholder='Enter Email address' />
                    </div>
                </div>

                <div className="mt-6 w-[350px] md:w-[700px]">
                    <label className="text-black/70" htmlFor="name">Message</label>
                    <textarea className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-primary" required placeholder='Type you Query here...'></textarea>
                </div>

                <button type="submit" className="mt-5 bg-primary hover:bg-primary-dull cursor-pointer text-white h-12 w-56 px-4 rounded active:scale-95 transition">Send Message</button>
            </form>
        </div>
    )
}

export default Contact
