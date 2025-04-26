const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p>&copy; {new Date().getFullYear()} Campaign Manager. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-indigo-400">Terms</a>
                        <a href="#" className="hover:text-indigo-400">Privacy</a>
                        <a href="#" className="hover:text-indigo-400">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;