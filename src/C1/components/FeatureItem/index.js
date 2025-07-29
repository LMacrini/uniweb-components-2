import React from 'react';
import { twJoin, getPageProfile } from '@uniwebcms/module-sdk';
import { Link, SafeHtml, Icon, Image } from '@uniwebcms/core-components';
import { LuArrowRight } from 'react-icons/lu';

export default function FeatureItem(props) {
    const { block, extra } = props;

    const { borderRoundness = 'none' } = extra || {};

    const { mode = 'content_centralized', with_border = false } = block.getBlockProperties();

    const { banner, title, subtitle, paragraphs, links, icons, lists, properties } =
        block.getBlockContent();

    const link = links[0];
    const icon = icons[0];
    const list = lists[0];

    const borderClass = twJoin(
        with_border && 'outline outline-1 outline-neutral-950/5 shadow-md',
        borderRoundness === 'small' ? 'rounded-sm' : '',
        borderRoundness === 'medium' ? 'rounded-md' : '',
        borderRoundness === 'large' ? 'rounded-lg' : ''
    );

    if (mode === 'content_aligned_left') {
        return (
            <div
                className={twJoin(
                    'w-full h-full flex flex-col',
                    borderClass,
                    with_border && 'p-6'
                    // 'transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1'
                )}
            >
                <div className="flex-grow">
                    <h3 className="font-bold">{title}</h3>
                    <p>{subtitle}</p>
                    {paragraphs.length > 0 && <SafeHtml value={paragraphs} className="mt-2 mb-6" />}
                </div>
                {link && (
                    <Link to={link.href} className="font-semibold flex items-center gap-2 group">
                        {link.label}
                        <LuArrowRight className="w-4 h-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1 text-link-color" />
                    </Link>
                )}
            </div>
        );
    } else if (mode === 'content_centralized') {
        return (
            <div
                className={twJoin(
                    'w-full h-full flex flex-col items-center text-center',
                    borderClass,
                    with_border && 'p-6'
                )}
            >
                {icon && (
                    <div className="w-12 h-12 bg-icon-color/10 rounded-full flex items-center justify-center mx-auto">
                        <Icon icon={icon} className="w-6 h-6" />
                    </div>
                )}
                {banner && (
                    <Image profile={getPageProfile()} {...banner} className="h-12 w-12 mx-auto" />
                )}
                <h3
                    className={twJoin(
                        icon || banner
                            ? 'text-base lg:text-lg font-semibold mt-4'
                            : 'text-lg lg:text-xl font-semibold'
                    )}
                >
                    {title}
                </h3>
                {paragraphs && <SafeHtml value={paragraphs} className="mt-2 mb-6" />}
                {link && (
                    <Link to={link.href} className="font-semibold flex items-center gap-2 group">
                        {link.label}
                        <LuArrowRight className="w-4 h-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1 text-link-color" />
                    </Link>
                )}
            </div>
        );
    } else if (mode === 'business_card') {
        return (
            <div className={twJoin('w-full h-full', borderClass, with_border && 'p-8')}>
                <div className="flex items-center gap-4">
                    <Icon icon={icon} className="w-8 h-8" />
                    <h3 className="text-2xl font-semibold">{title}</h3>
                </div>
                {paragraphs && <SafeHtml value={paragraphs} className="my-4" />}
                {link && (
                    <Link to={link.href} className="font-semibold flex items-center gap-2 group">
                        {link.label}
                        <LuArrowRight className="w-4 h-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1 text-link-color" />
                    </Link>
                )}
            </div>
        );
    } else if (mode === 'three_d_card') {
        return (
            <div
                className={twJoin(
                    'w-full h-full',
                    with_border && 'border border-primary-500 border-l-4 shadow-md p-8',
                    borderRoundness === 'small' ? 'rounded-sm' : '',
                    borderRoundness === 'medium' ? 'rounded-md' : '',
                    borderRoundness === 'large' ? 'rounded-lg' : ''
                )}
            >
                <div className="flex flex-col gap-4">
                    {icon && <Icon icon={icon} className="w-8 h-8" />}
                    {paragraphs && (
                        <SafeHtml value={paragraphs} className="text-xl italic leading-relaxed" />
                    )}
                </div>
            </div>
        );
    } else if (mode === 'list') {
        return (
            <div className={twJoin('w-full h-full', borderClass, with_border && 'p-8')}>
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                {list && (
                    <ul className="space-y-2">
                        {list.map((item, idx) => {
                            const icon = item.icons[0];
                            const feature = item.paragraphs[0];

                            return (
                                <li key={idx} className="flex items-start gap-3">
                                    <Icon icon={icon} className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            );
                        })}
                    </ul>
                )}
                {paragraphs[0] && (
                    <p className="mt-4 text-sm text-text-color/80 italic">{paragraphs[0]}</p>
                )}
            </div>
        );
    } else if (mode === 'list_with_theming') {
        return (
            <div className={twJoin('w-full h-full', borderClass, with_border && 'p-8')}>
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <div className="bg-primary-50 rounded-md p-4 font-mono text-xs leading-relaxed">
                    {list && (
                        <>
                            {list.map((item, idx) => {
                                const text = item.paragraphs[0];
                                return <SafeHtml key={idx} value={text} />;
                            })}
                        </>
                    )}
                </div>
                {paragraphs.length > 0 && (
                    <SafeHtml value={paragraphs} className="mt-4 text-text-color/70" />
                )}
            </div>
        );
    } else if (mode === 'mapping') {
        const [fromItem, toItem] = block.getBlockItems();

        const ItemBox = ({ item }) => (
            <div className="rounded-lg shadow outline outline-1 outline-neutral-950/5 p-6">
                {typeof item.properties === 'string' && (
                    <pre className="font-mono text-sm text-text-color/70">
                        <code>{item.properties}</code>
                    </pre>
                )}
                <ul className="space-y-2">
                    {item.lists[0]?.map((listItem, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                            {listItem.icons[0] && (
                                <Icon
                                    icon={listItem.icons[0]}
                                    className="w-5 h-5 flex-shrink-0 text-primary-500"
                                />
                            )}
                            <span className="text-text-color/80">{listItem.paragraphs[0]}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );

        return (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
                {fromItem && <ItemBox item={fromItem} />}
                {fromItem && toItem && (
                    <div className="flex items-center justify-center">
                        <LuArrowRight className="w-8 h-8 inline-block text-primary-500 rotate-90 md:rotate-0" />
                    </div>
                )}
                {toItem && <ItemBox item={toItem} />}
            </div>
        );
    } else if (mode === 'content_with_icon') {
        return (
            <div
                className={twJoin(
                    'w-full h-full',
                    borderClass,
                    with_border && 'p-4',
                    'flex items-center gap-4 transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1'
                )}
            >
                {icon && (
                    <div className="w-10 h-10 bg-primary-100 rounded-md flex items-center justify-center">
                        <Icon icon={icon} className="w-6 h-6 text-primary-600" />
                    </div>
                )}
                {paragraphs.length > 0 && (
                    <SafeHtml value={paragraphs} className="text-text-color/90 font-medium" />
                )}
            </div>
        );
    } else if (mode === 'code_block') {
        return (
            <div className={twJoin('w-full h-full', borderClass, 'border-l-4 border-primary-500')}>
                <pre className="p-6 font-mono tracking-tight overflow-x-auto">
                    <code className="text-sm">
                        {typeof properties === 'string' ? properties : ''}
                    </code>
                </pre>
            </div>
        );
    } else {
        return null; // Handle other modes or default case
    }
}
