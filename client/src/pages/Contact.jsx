import React from 'react'

const Contact = () => {
    return (
        <div>
            <form class="flex flex-col items-center text-sm mt-12 px-6 md:px-16 lg:px-32">
                <p class="text-lg text-primary font-medium pb-2">Contact Us</p>
                <h1 class="text-4xl font-semibold text-slate-700 pb-4">Get in touch with us</h1>
                <p class="text-sm text-gray-500 text-center pb-10">Have questions, feedback, or a request? We're here to help—just reach out, <br /> and let’s keep your pantry stocked with ease!</p>

                <div class="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
                    <div class="w-full">
                        <label class="text-black/70" for="name">Your Name</label>
                        <input class="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-primary" type="text" required placeholder='Enter Full Name' />
                    </div>
                    <div class="w-full">
                        <label class="text-black/70" for="name">Your Email</label>
                        <input class="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-primary" type="email" required placeholder='Enter Email address' />
                    </div>
                </div>

                <div class="mt-6 w-[350px] md:w-[700px]">
                    <label class="text-black/70" for="name">Message</label>
                    <textarea class="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-primary" required placeholder='Type you Query here...'></textarea>
                </div>

                <button type="submit" class="mt-5 bg-primary hover:bg-primary-dull cursor-pointer text-white h-12 w-56 px-4 rounded active:scale-95 transition">Send Message</button>
            </form>
        </div>
    )
}

export default Contact
