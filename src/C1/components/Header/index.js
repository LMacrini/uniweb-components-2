import React from 'react';
import { Link, Image, Icon } from '@uniwebcms/core-components';
import { getPageProfile } from '@uniwebcms/module-sdk';
import { LuArrowUpRight } from 'react-icons/lu';
import NavigationMenu from './NavigationMenu';

export default function Header(props) {
    const { block } = props;

    const { banner, links } = block.getBlockContent();

    const navigation = block.childBlocks.map((childBlock) => {
        const { title, links } = childBlock.getBlockContent();
        const items = childBlock.getBlockItems();
        return {
            trigger: title,
            items: items.map((item) => ({
                icon: item.icons?.[0],
                title: item.title,
                description: item.subtitle,
                href: item.links?.[0]?.href || '#',
            })),
            href: links?.[0]?.href || '#',
        };
    });

    return (
        <>
            {/* header placeholder */}
            <div className="h-[65px]"></div>
            {/* Header */}
            <header className="fixed top-0 z-50 w-full border-b bg-bg-color backdrop-blur supports-[backdrop-filter]:bg-bg-color/60">
                <nav className="container-header">
                    {/* <nav className="w-full sm:max-w-[640px] md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8"> */}
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center gap-2">
                                <Image
                                    profile={getPageProfile()}
                                    {...banner}
                                    className="h-8 w-auto"
                                    alt="Company Logo"
                                />
                            </Link>
                        </div>

                        <div className="hidden md:flex md:items-center md:justify-center flex-1">
                            <NavigationMenu navigation={navigation} />
                        </div>

                        <div className="hidden md:flex items-center space-x-6">
                            {links.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.href}
                                    className="text-sm font-medium text-text-color/80 hover:text-primary-500 transition-colors duration-200 flex items-center gap-1"
                                >
                                    {link.label}
                                    <LuArrowUpRight className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>

                        <div className="md:hidden">
                            {/* Mobile menu logic would need to be updated to handle the new nested nav */}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
