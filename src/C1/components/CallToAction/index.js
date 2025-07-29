import React from 'react';
import { Link, Icon } from '@uniwebcms/core-components';

export default function CallToAction(props) {
    const { block } = props;

    const { title, subtitle, links, icons } = block.getBlockContent();
    const [firstLink, secondLink] = links || [];
    const icon = icons[0];

    return (
        <section className="container-7xl">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-4xl font-semibold">{title}</h2>
                <p className="mt-4 text-lg text-heading-color/70">{subtitle}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    {firstLink && (
                        <Link
                            to={firstLink.href}
                            className="px-6 py-3 rounded-sm font-semibold text-base transition-all duration-200 ease-in-out inline-block text-center hover:-translate-y-0.5 bg-btn-color text-btn-text-color hover:bg-btn-hover-color hover:text-btn-hover-text-color "
                        >
                            <span className="flex items-center">
                                {firstLink.label}
                                {icon && <Icon icon={icon} className="w-4 h-4 ml-2" />}
                            </span>
                        </Link>
                    )}
                    {secondLink && (
                        <Link
                            to={secondLink.href}
                            className="px-6 py-3 rounded-sm font-semibold text-base transition-all duration-200 ease-in-out inline-block text-center bg-btn-alt-color text-btn-alt-text-color hover:bg-btn-alt-hover-color hover:text-btn-alt-hover-text-color outline outline-1 outline-btn-alt-text-color/50 hover:outline-btn-alt-text-color/80"
                        >
                            {secondLink.label}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
