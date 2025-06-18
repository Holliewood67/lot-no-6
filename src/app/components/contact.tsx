
const contactEmail = 'test@gmail.com';

export default function Contact() {
    return(
        <section id="contact" className="w-full flex flex-col items-center justify-center text-center px-4 py-12 border-b-2">
            <h1 className="text-3xl md:text-4xl py-6">Want To Get In Touch?</h1>
            <a href={`mailto:${contactEmail}?subject=SUBJECT&body=Hey Lot No. 6...`}  
            target="_blank"
            className="py-2 px-6 bg-gray-600/25 rounded-lg">
                Email Us
            </a>
        </section>
    )
}