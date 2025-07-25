import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlobeIcon, HeartIcon, LinkedinIcon, TwitterIcon, GithubIcon } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Templates", path: "/templates" },
        { label: "Resume Builder", path: "/builder" },
        { label: "Pricing", path: "/pricing" },
        { label: "Features", path: "/features" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Resume Tips", path: "/tips" },
        { label: "Country Guides", path: "/guides" },
        { label: "FAQ", path: "/faq" },
        { label: "Blog", path: "/blog" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Contact", path: "/contact" },
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-muted py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="GlobeCraft Resume" className="h-10 w-auto" />
              <span className="font-semibold text-lg">GlobeCraft</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Build your international career with country-specific, ATS-friendly resumes.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon-sm" aria-label="Twitter">
                <TwitterIcon />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="LinkedIn">
                <LinkedinIcon />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="GitHub">
                <GithubIcon />
              </Button>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} GlobeCraft Resume. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <GlobeIcon className="h-4 w-4" />
            <span>Supporting job seekers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;