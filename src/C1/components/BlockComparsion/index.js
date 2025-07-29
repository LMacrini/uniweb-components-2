import React from 'react';
import { Icon } from '@uniwebcms/core-components';
import { twJoin } from '@uniwebcms/module-sdk';

export default function BlockComparison(props) {
    const { block } = props;

    const { pretitle, title, properties } = block.getBlockContent();

    const callout = properties?.callout || null;

    const items = block.getBlockItems();

    return (
        <section className="container-7xl">
            <div className="text-center max-w-2xl mx-auto">
                <p className="font-semibold text-primary-500 uppercase tracking-wide">{pretitle}</p>
                <h2 className="font-semibold text-4xl sm:text-5xl mt-4">{title}</h2>
            </div>
            <div className="mt-16 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {items.map((item, index) => {
                        const { title, lists } = item;
                        const list = lists[0] || [];

                        return (
                            <div key={index} className="bg-neutral-100 p-8 rounded-lg">
                                <h3 className="text-xl font-semibold">{title}</h3>
                                <ul className="mt-4 space-y-4">
                                    {list.map((item, idx) => (
                                        <li key={idx}>
                                            <p className="font-semibold">{item.paragraphs?.[0]}</p>
                                            <p className="text-text-color/80">
                                                {item.lists[0]?.[0]?.paragraphs?.[0]}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
                {callout && (
                    <div className="mt-12 bg-primary-500/10 p-8 rounded-lg border-l-4 border-primary-500 text-center max-w-4xl mx-auto">
                        <h4 className="text-xl font-semibold text-primary-500">{callout.title}</h4>
                        <p className="mt-2 leading-relaxed text-text-color/90">
                            {callout.description}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
