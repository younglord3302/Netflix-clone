import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-netflix-dark text-gray-400 py-16 px-6 mt-auto border-t border-gray-800/50">
            <div className="max-w-5xl mx-auto">
                <div className="flex gap-6 mb-8 text-white">
                    <Facebook className="cursor-pointer hover:text-gray-300 transition" size={24} />
                    <Instagram className="cursor-pointer hover:text-gray-300 transition" size={24} />
                    <Twitter className="cursor-pointer hover:text-gray-300 transition" size={24} />
                    <Youtube className="cursor-pointer hover:text-gray-300 transition" size={24} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-8">
                    <div className="flex flex-col gap-3">
                        <a href="#" className="hover:underline">Audio Description</a>
                        <a href="#" className="hover:underline">Investor Relations</a>
                        <a href="#" className="hover:underline">Legal Notices</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <a href="#" className="hover:underline">Help Center</a>
                        <a href="#" className="hover:underline">Jobs</a>
                        <a href="#" className="hover:underline">Cookie Preferences</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <a href="#" className="hover:underline">Gift Cards</a>
                        <a href="#" className="hover:underline">Terms of Use</a>
                        <a href="#" className="hover:underline">Corporate Information</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <a href="#" className="hover:underline">Media Center</a>
                        <a href="#" className="hover:underline">Privacy</a>
                        <a href="#" className="hover:underline">Contact Us</a>
                    </div>
                </div>

                <button className="border border-gray-400 px-4 py-2 text-sm hover:text-white hover:border-white transition mb-6">
                    Service Code
                </button>

                <div className="text-xs">
                    &copy; 1997-2024 Netflix, Inc.
                </div>
            </div>
        </footer>
    );
};
