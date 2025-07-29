import React from 'react';

/** Since it is difficult to universally input the expected data values in Docufolio,
 * this component is not generic and needs further improvement.
 */
export default function ArchitectureDiagram(props) {
    const { block, website } = props;

    const { pretitle, title, subtitle } = block.getBlockContent();

    const items = block.getBlockItems();

    return (
        <section className="container-7xl">
            <div className="text-center max-w-2xl mx-auto">
                <p className="font-semibold text-primary-500 uppercase tracking-wide">{pretitle}</p>
                <h2 className="font-semibold text-4xl sm:text-5xl mt-4">{title}</h2>
                {subtitle && <p className="mt-4 text-lg text-heading-color/70">{subtitle}</p>}
            </div>
            <div className="mt-16 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Traditional CMS Diagram */}
                    <div className="space-y-2">
                        <p className="text-xs uppercase font-semibold tracking-wider text-neutral-500">
                            {website.localize({
                                en: 'Traditional CMS',
                                fr: 'CMS Traditionnel',
                                zh: '传统CMS',
                                es: 'CMS Tradicional',
                            })}
                        </p>
                        <div className="border rounded-lg p-4 bg-neutral-50 flex flex-col items-center justify-center text-center h-32">
                            <p className="font-semibold text-dark">WordPress / Drupal</p>
                            <p className="text-sm text-text-color/60">
                                {website.localize({
                                    en: '(Code + Content Coupled)',
                                    fr: '(Code + Contenu Couplé)',
                                    zh: '(代码 + 内容耦合)',
                                    es: '(Código + Contenido Acoplado)',
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Headless CMS Diagram */}
                    <div className="space-y-2">
                        <p className="text-xs uppercase font-semibold tracking-wider text-neutral-500">
                            {website.localize({
                                en: 'Headless CMS',
                                fr: 'CMS Sans Tête',
                                zh: '无头CMS',
                                es: 'CMS Sin Cabeza',
                            })}
                        </p>
                        <div className="flex items-center justify-center h-32 gap-2">
                            <div className="border rounded-lg p-4 flex-1 text-center bg-text-color-0">
                                <p className="font-semibold">
                                    {website.localize({
                                        en: 'Frontend',
                                        fr: 'Frontend',
                                        zh: '前端',
                                        es: 'Frontend',
                                    })}
                                </p>
                                <p className="text-sm text-text-color/80">(Next.js)</p>
                            </div>
                            <p className="font-mono text-primary-500 text-sm">API</p>
                            <div className="border rounded-lg p-4 flex-1 text-center bg-text-color-0">
                                <p className="font-semibold">CMS</p>
                                <p className="text-sm text-text-color/80">
                                    {website.localize({
                                        en: '(Content)',
                                        fr: '(Contenu)',
                                        zh: '(内容)',
                                        es: '(Contenido)',
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Runtime Foundation Diagram */}
                    <div className="space-y-2">
                        <p className="text-xs uppercase font-semibold tracking-wider text-neutral-500">
                            {website.localize({
                                en: 'Unified CMS',
                                fr: 'CMS Unifié',
                                zh: '统一CMS',
                                es: 'CMS Unificado',
                            })}
                        </p>
                        <div className="border rounded-lg p-4 relative flex flex-col items-center justify-center text-center h-32 bg-primary-500/5 border-primary-500/30">
                            <p className="font-semibold">
                                {website.localize({
                                    en: 'Uniweb CMS App',
                                    fr: 'Application Uniweb CMS',
                                    zh: 'Uniweb CMS应用',
                                    es: 'Aplicación Uniweb CMS',
                                })}
                            </p>
                            <div className="border rounded-lg p-4 absolute -bottom-10 shadow-md bg-secondary-100/80 border-secondary-500/30 backdrop-blur-sm">
                                <p className="font-semibold text-sm">
                                    {website.localize({
                                        en: 'Foundation Module',
                                        fr: 'Module Fondamental',
                                        zh: '基础模块',
                                        es: 'Módulo de Fundación',
                                    })}
                                </p>
                                <p className="text-sm text-secondary-900/60 mt-1">
                                    {website.localize({
                                        en: 'One per website',
                                        fr: 'Un par site web',
                                        zh: '每个网站一个',
                                        es: 'Uno por sitio web',
                                    })}
                                </p>
                            </div>
                            <p className="absolute top-1 right-2 font-mono text-primary-500 text-xs">
                                {website.localize({
                                    en: 'Runtime',
                                    fr: 'Exécution',
                                    zh: '运行时',
                                    es: 'Tiempo de Ejecución',
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
