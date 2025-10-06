
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../ui/Logo'; // Assuming Logo component is available

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', icon: '/icons/facebook.svg', href: '#' }, // Placeholder href
    { name: 'Twitter', icon: '/icons/twitter.svg', href: '#' },   // Placeholder href
    { name: 'YouTube', icon: '/icons/youtube.svg', href: '#' },   // Placeholder href
    { name: 'LinkedIn', icon: '/icons/linkedin.svg', href: '#' }, // Placeholder href
    { name: 'Instagram', icon: '/icons/instagram.svg', href: '#' }, // Placeholder href
  ];

  return (
    <footer className="bg-[#004705] text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section: White Logo */}
        <div className="flex-shrink-0 mb-4 md:mb-0">
          {/* Assuming Logo component can accept a prop for white version or handles it internally */}
          <Logo /> 
        </div>

        {/* Center Section: Copyright Text */}
        <div className="text-center mb-4 md:mb-0">
          <p className="text-sm">© {new Date().getFullYear()} نائبك. جميع الحقوق محفوظة.</p>
        </div>

        {/* Right Section: Social Media Icons */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
              <Image src={link.icon} alt={link.name} width={24} height={24} className="filter brightness-0 invert" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

