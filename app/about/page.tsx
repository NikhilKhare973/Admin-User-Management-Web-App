import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">About Galaxy System</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          We are dedicated to building secure, scalable, and user-friendly
          management solutions for the modern world.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto p-10 space-y-12">
        {/* Mission */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To empower organizations with intuitive tools that simplify
              complex workflows. We believe in "Technology for Humans" — making
              sure every pixel serves a purpose.
            </p>
          </div>
          <div className="flex-1 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            [ Mission Image Placeholder ]{/* photo add ^ */}
          </div>
        </div>

        {/* Vision */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To be the global standard for internal management dashboards,
              providing security and speed without compromise.
            </p>
          </div>
          <div className="flex-1 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            [ Vision Image Placeholder ]{/* photo add ^ */}
          </div>
        </div>
      </div>
    </div>
  );
}
