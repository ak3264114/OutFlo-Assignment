import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h1 className="text-xl font-bold text-indigo-600">Campaign Manager</h1>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link to="/campaigns" className="text-gray-700 hover:text-indigo-600 font-medium">
                Campaigns
              </Link>
              <Link to="/campaigns/new" className="text-gray-700 hover:text-indigo-600 font-medium">
                New Campaign
              </Link>
              <Link 
              to="/message-generator" 
              className="bg-indigo-800 text-white border-2 border-indigo-800 font-bold px-6 py-3 rounded-lg hover:bg-indigo-900 hover:border-indigo-900 transition duration-300"
            >
              Generate Messages
            </Link>
            </div>
            
            <div className="md:hidden">
              <button className="text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  export default Header;