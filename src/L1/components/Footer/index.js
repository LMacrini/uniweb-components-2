import React from 'react';
import { Link, Image, MediaIcon } from '@uniwebcms/core-components';
import { getPageProfile, stripTags } from '@uniwebcms/module-sdk';

const getMediaLinkType = (link) => {
    const pattern = {
        twitter: 'https://twitter.com',
        facebook: 'https://www.facebook.com',
        linkedin: 'https://www.linkedin.com',
        medium: 'https://medium.com',
        quora: 'https://www.quora.com',
        tumblr: 'https://www.tumblr.com',
        youtube: 'https://www.youtube.com',
        github: 'https://github.com',
        x: 'https://x.com',
        instagram: 'https://www.instagram.com',
    };

    const { label, href } = link;

    if (pattern.hasOwnProperty(label.toLowerCase())) {
        return label.toLowerCase();
    }

    if (Object.values(pattern).some((value) => href.toLowerCase().startsWith(value))) {
        return Object.keys(pattern).find((key) => href.toLowerCase().startsWith(pattern[key]));
    }
};

function FooterSection({ label, child_items }) {
    return (
        <div>
            <h3 className="text-sm font-semibold text-text-color tracking-wider uppercase">
                {label}
            </h3>
            <ul className="mt-4 space-y-3">
                {child_items.map((item, index) => (
                    <li key={index}>
                        <Link to={item.route} className="text-sm transition-colors">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Footer(props) {
    const { block } = props;

    const { banner, links, title, paragraphs } = block.getBlockContent();

    const navigation = block.getBlockLinks({ nested: true });

    const socialLinks = [],
        legalLinks = [];

    links.forEach((link) => {
        const type = getMediaLinkType(link);

        if (type) {
            link.type = type;
            socialLinks.push(link);
        } else {
            legalLinks.push(link);
        }
    });

    return (
        <footer className="border-t border-text-color/10">
            <div className="container-footer">
                <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div className="col-span-2 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2">
                            <Image
                                profile={getPageProfile()}
                                {...banner}
                                className="h-8 w-auto"
                                alt="Company Logo"
                            />
                        </Link>
                        <p className="mt-4 text-sm text-text-color/60 max-w-xs">{title}</p>
                        <div className="mt-6 flex space-x-6">
                            {socialLinks.map((link, index) => {
                                return (
                                    <Link key={index} href={link.href} target="_blank">
                                        <span className="sr-only">{link.label}</span>
                                        <MediaIcon
                                            type={link.type}
                                            className="w-5 h-5 text-link-color/80 hover:text-link-hover-color transition-colors"
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    {navigation.map((nav, index) => (
                        <FooterSection key={index} {...nav} />
                    ))}
                </div>

                <div className="py-6 border-t border-text-color/10">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-text-color/60">
                            &copy; {new Date().getFullYear()} {stripTags(paragraphs[0])}
                        </p>
                        <div className="flex space-x-6">
                            {legalLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.href}
                                    className="text-sm transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
