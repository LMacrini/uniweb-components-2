import React from 'react';
import { twJoin } from '@uniwebcms/module-sdk';
import { SafeHtml, Icon } from '@uniwebcms/core-components';

export default function Steps(props) {
    const { block } = props;

    const { pretitle, title, subtitle } = block.getBlockContent();

    const items = block.getBlockItems();

    return (
        <section className="container-7xl">
            <div className="text-center max-w-2xl mx-auto">
                <p className="font-semibold text-primary-500 uppercase tracking-wide">{pretitle}</p>
                <h2 className={twJoin('font-semibold text-4xl sm:text-5xl', pretitle && 'mt-4')}>
                    {title}
                </h2>
                {subtitle && (
                    <div className="mt-6 space-y-4 text-lg text-text-color max-w-prose mx-auto">
                        {subtitle}
                    </div>
                )}
            </div>
            <div className="mt-16 max-w-3xl mx-auto space-y-16">
                {items.map((item, index) => (
                    <div key={index}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary-500 text-bg-color font-semibold flex items-center justify-center">
                                {index + 1}
                            </div>
                            <h3 className="text-2xl font-semibold">{item.title}</h3>
                        </div>
                        <div className="pl-14 mt-4">
                            <p className="mb-6">{item.subtitle}</p>
                            {typeof item.properties === 'string' && (
                                <div className="bg-neutral-50 rounded-md text-sm outline outline-1 outline-neutral-950/5 border-l-4 border-primary-600">
                                    <pre className="p-6 font-mono tracking-tight text-dark/80 overflow-x-auto">
                                        <code>{item.properties}</code>
                                    </pre>
                                </div>
                            )}
                            {item.icons[0] || item.paragraphs.length > 0 ? (
                                <div className="bg-neutral-50 rounded-lg shadow outline outline-1 outline-neutral-950/5 p-8 flex flex-col items-center justify-center text-center">
                                    {item.icons[0] && (
                                        <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center">
                                            <Icon
                                                icon={item.icons[0]}
                                                className="w-8 h-8 text-primary-500"
                                            />
                                        </div>
                                    )}
                                    {item.paragraphs.length > 0 && (
                                        <div className="mt-4 text-text-color/80 font-medium">
                                            <SafeHtml value={item.paragraphs} />
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
