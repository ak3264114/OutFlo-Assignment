import { Link } from "react-router-dom";


const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);


const LandingPage: React.FC = () => {
    return (
      <div className="landing-page">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl font-extrabold mb-4">Campaign Manager</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Streamline your lead generation process with our powerful campaign management platform
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/campaigns" 
                className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-lg hover:bg-indigo-50 transition duration-300"
              >
                View Campaigns
              </Link>
              <Link 
                to="/campaigns/new" 
                className="bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-700 transition duration-300"
              >
                Create Campaign
              </Link>
            </div>
          </div>
        </section>
  
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Powerful Campaign Features</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <ChartIcon />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Track Performance</h3>
                <p className="text-gray-600">
                  Monitor campaign progress with real-time analytics and comprehensive reporting tools.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <UsersIcon />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Manage Leads</h3>
                <p className="text-gray-600">
                  Easily organize and track potential leads with our intuitive interface.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <TargetIcon />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Target Accounts</h3>
                <p className="text-gray-600">
                  Focus your efforts on high-value accounts to maximize your conversion rates.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Stats Section */}
        <section className="py-16 bg-indigo-700 text-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-indigo-200">Campaigns Created</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-indigo-200">Leads Generated</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-indigo-200">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Ready to boost your lead generation?</h2>
            <Link 
              to="/message-generator" 
              className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-indigo-700 transition duration-300 inline-block"
            >
              Generate Personalize Messages
            </Link>
          </div>
        </section>
      </div>
    );
  };


  export default LandingPage;