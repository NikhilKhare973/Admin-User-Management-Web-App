"use client";

export default function ContactPage() {
  async function handleSubmit(e: any) {
    e.preventDefault();
    alert("Message sent! (This is a demo)");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* LEFT SIDE: Contact Form */}
        <div className="p-8 md:w-1/2">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 w-full border p-2 rounded-md"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full border p-2 rounded-md"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                className="mt-1 w-full border p-2 rounded-md h-32"
                placeholder="How can we help?"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: Map Integration (Assignment Requirement) */}
        <div className="bg-gray-200 md:w-1/2 min-h-[300px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1770283195339!6m8!1m7!1sWmAEdlA6abJiQYe6Y5GzBA!2m2!1d22.72373482337552!2d75.88206153814531!3f252.71503!4f0!5f0.7820865974627469"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
