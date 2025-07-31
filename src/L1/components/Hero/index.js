import React from 'react';
import { Link, SafeHtml, Icon } from '@uniwebcms/core-components';
import { twJoin } from '@uniwebcms/module-sdk';
import LineAnimation from './LineAnimation';
import { LuArrowUpRight } from 'react-icons/lu';

const BentoBoxTeaser = (info) => {
    const { icons, title, subtitle } = info;

    const icon = icons[0];

    return (
        <div className="absolute bottom-8 -left-12 bg-bg-color/70 backdrop-blur-md p-6 rounded-lg shadow-lg border outline-neutral-950/5">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary-500/10 text-secondary-500 rounded-md flex items-center justify-center">
                    {icon && <Icon icon={icon} className="w-6 h-6" />}
                </div>
                <div>
                    <p className="font-semibold text-text-color">{title}</p>
                    <p className="text-sm text-text-color/70">{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

const LinkGroup = ({ links }) => {
    const [firstLink, secondLink] = links || [];

    return (
        <div className="mt-10 flex flex-wrap items-center gap-4">
            {firstLink && (
                <Link
                    to={firstLink.href}
                    className="px-6 py-3 rounded-sm font-semibold text-base transition-all duration-200 ease-in-out inline-block text-center hover:-translate-y-0.5 bg-btn-color text-btn-text-color hover:bg-btn-hover-color hover:text-btn-hover-text-color "
                >
                    <span className="flex items-center">
                        {firstLink.label}
                        <LuArrowUpRight className="w-4 h-4 ml-2" />
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
    );
};

export default function Hero(props) {
    const { block } = props;
    const { pretitle, title, subtitle, links, paragraphs } = block.getBlockContent();

    console.log('subtitle', subtitle);

    const items = block.getBlockItems();

    const firstItem = items[0];

    const { with_line_animation = false } = block.getBlockProperties();

    const hasRightColumnContent = with_line_animation || !!firstItem;

    return (
        <section className="container">
            <div
                className={twJoin(
                    hasRightColumnContent &&
                        'relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
                )}
            >
                {/* Text Content */}
                <div
                    className={twJoin(
                        hasRightColumnContent
                            ? 'relative z-10 text-left'
                            : 'text-center max-w-3xl mx-auto'
                    )}
                >
                    {pretitle && (
                        <p className="text-sm font-semibold uppercase tracking-wider text-primary-500 mb-4">
                            {pretitle}
                        </p>
                    )}
                    <h1
                        className={twJoin(
                            'font-bold',
                            hasRightColumnContent
                                ? 'text-4xl md:text-5xl tracking-tighter'
                                : 'text-5xl md:text-6xl tracking-tight'
                        )}
                    >
                        {title}
                    </h1>
                    <SafeHtml
                        value={subtitle}
                        className={twJoin(
                            'mt-6 text-lg mx-auto',
                            hasRightColumnContent && 'max-w-xl',
                            'max-w-prose [&>p+p]:mt-4'
                        )}
                    />
                    {links.length > 0 && <LinkGroup links={links} />}
                    {paragraphs.length > 0 && (
                        <div className="mt-8">
                            <SafeHtml value={paragraphs} className="text-sm text-text-color/80" />
                        </div>
                    )}
                </div>

                {/* Visual Composition */}
                {hasRightColumnContent && (
                    <div className="relative h-[600px]">
                        {/* The Animation */}
                        {with_line_animation && (
                            <>
                                {/* Background Panel for the Animation */}
                                <div className="absolute inset-0 bg-neutral-50 rounded-2xl border border-neutral-400/10" />
                                <div className="absolute inset-10 flex items-center justify-center">
                                    <LineAnimation />
                                </div>
                            </>
                        )}

                        {/* Floating "Bento Box" Teaser */}
                        {firstItem && <BentoBoxTeaser {...firstItem} />}
                    </div>
                )}
            </div>
        </section>
    );
}
