import React from 'react';
import { Image, Link, SafeHtml, Icon } from '@uniwebcms/core-components';
import { getPageProfile } from '@uniwebcms/module-sdk';
import { twJoin } from '@uniwebcms/module-sdk';
import { LuCircleCheck, LuGitBranch } from 'react-icons/lu';

export default function FeatureGridItem(props) {
    const { block, extra } = props;

    const { mode = 'large_feature' } = block.getBlockProperties();

    const { banner, title, subtitle, paragraphs, links, icons, lists, images, properties } =
        block.getBlockContent();

    const link = links[0];
    const icon = icons[0];
    const list = lists[0];
    const image = images[0];

    if (mode === 'large_feature') {
        return (
            <div className="bg-text-color-0 rounded-lg shadow outline outline-1 outline-neutral-950/10 p-6 flex flex-col justify-between md:col-span-6 lg:col-span-7 lg:row-span-2">
                <div className="h-full">
                    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                    <p className="mb-6 text-text-color/80">{subtitle}</p>
                    <div className="bg-text-color-0 rounded-lg shadow outline outline-1 outline-neutral-950/10 overflow-hidden">
                        <div className="h-9 bg-neutral-100 flex items-center px-4 gap-2 border-b border-neutral-950/5">
                            {Array.from({ length: 3 }, (_, index) => (
                                <span
                                    key={index}
                                    className="w-3 h-3 rounded-full bg-neutral-950/10"
                                />
                            ))}
                        </div>
                        <div className="p-4">
                            <div className="bg-light rounded-lg shadow outline outline-1 outline-neutral-950/10">
                                <Image
                                    profile={getPageProfile()}
                                    {...image}
                                    className="w-full h-auto rounded-lg object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (mode === 'stat_box') {
        return (
            <div className="bg-text-color-0 rounded-lg shadow outline outline-1 outline-neutral-950/10 p-6 flex flex-col md:col-span-3 lg:col-span-5 items-center justify-center">
                <div className="text-center">
                    <p className="text-5xl md:text-6xl font-bold text-primary-500">{title}</p>
                    <p className="text-sm uppercase tracking-wider text-text-color/70 mt-2">
                        {subtitle}
                    </p>
                </div>
            </div>
        );
    } else if (mode === 'inline_quote_box') {
        return (
            <div className="bg-text-color-0 rounded-lg shadow outline outline-1 outline-neutral-950/10 p-6 flex flex-col md:col-span-3 lg:col-span-5 items-center justify-center">
                <blockquote className="text-center">
                    <p className="text-xl md:text-2xl font-medium italic">"{title}"</p>
                    <p className="mt-4 block text-sm not-italic text-text-color/70">- {subtitle}</p>
                </blockquote>
            </div>
        );
    } else if (mode === 'medium_feature_with_list') {
        return (
            <div className="bg-text-color-0 rounded-lg shadow outline outline-1 outline-neutral-950/10 p-6 flex flex-col md:col-span-3 lg:col-span-4 justify-between">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-text-color/80 mt-1 mb-3">{subtitle}</p>
                <ul className="space-y-3">
                    {list.map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <LuCircleCheck className="w-5 h-5 text-accent-500" />
                            <span>{item.paragraphs[0]}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else if (mode === 'mini_code_block') {
        return (
            <div className="bg-text-color-0 rounded-lg shadow outline outline-1 outline-neutral-950/10 p-6 flex flex-col md:col-span-3 lg:col-span-4 justify-between">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-text-color/80 mt-1 mb-3">{subtitle}</p>
                <div className="bg-text-color text-text-color-0 p-4 rounded-md font-mono text-xs shadow-lg">
                    <pre>
                        <code>{typeof properties === 'string' ? properties : ''}</code>
                    </pre>
                </div>
            </div>
        );
    } else if (mode === 'simple_visual') {
        return (
            <div className="bg-text-color-0 rounded-lg shadow outline outline-1 outline-neutral-950/10 p-0 flex flex-col justify-between md:col-span-3 lg:col-span-4 overflow-hidden">
                {banner && (
                    <Image
                        profile={getPageProfile()}
                        {...banner}
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
        );
    } else if (mode === 'tall_feature') {
        return (
            <div className="bg-text-color-0 rounded-lg shadow outline outline-1 outline-neutral-950/10 p-6 flex flex-col justify-between md:col-span-3 lg:col-span-4 lg:row-span-2">
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <p className="text-text-color/80 mb-6">{subtitle}</p>
                <div className="flex-grow flex items-center justify-center">
                    {icon && <Icon icon={icon} className="w-48 h-48 text-primary-200" />}
                </div>
            </div>
        );
    } else if (mode === 'git_workflow') {
        return (
            <div className="bg-text-color-0 rounded-lg shadow outline outline-1 outline-neutral-950/10 p-6 flex flex-col justify-between md:col-span-3 lg:col-span-4 items-center text-center">
                <LuGitBranch className="w-16 h-16 text-primary-500" />
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-1 text-text-color/80">{subtitle}</p>
            </div>
        );
    } else if (mode === 'wide_feature') {
        return (
            <div className="bg-text-color-0 rounded-lg shadow outline outline-1 outline-neutral-950/10 p-6 flex flex-col justify-between md:col-span-6 lg:col-span-8">
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <p className="text-text-color/80">{subtitle}</p>
            </div>
        );
    }
}
