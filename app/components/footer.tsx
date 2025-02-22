export default function Footer() {
    return (
      <footer className="bg-black text-white py-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Connect with Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-yellow-400 text-2xl">📘</a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 text-2xl">🐦</a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 text-2xl">📸</a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 text-2xl">💼</a>
            </div>
          </div>
  
          <div>
            <h3 className="text-2xl font-semibold mb-4">Message Us</h3>
            <form className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="Your Message..." 
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-yellow-400"
              />
              <button 
                type="submit" 
                className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition-all"
              >
                Send
              </button>
            </form>
          </div>
  
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400">Organization</a></li>
            </ul>
          </div>
        </div>
  
        <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4">
          &copy; 2025 RideOn. All rights reserved.
        </div>
      </footer>
    );
  }