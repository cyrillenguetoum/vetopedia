<?php

declare(strict_types=1);

namespace App;

/**
 * The configuration provider for the App module
 *
 * @see https://docs.laminas.dev/laminas-component-installer/
 */
class ConfigProvider
{
    /**
     * Returns the configuration array
     *
     * To add a bit of a structure, each section is defined in a separate
     * method which returns an array with its configuration.
     */
    public function __invoke(): array
    {
        return [
            'dependencies' => $this->getDependencies(),
            'templates'    => $this->getTemplates(),
            'assetic_configuration' => $this->getAssetsConfiguration(),
        ];
    }

    /**
     * Returns the container dependencies
     */
    public function getDependencies(): array
    {
        return [
            'invokables' => [
                Handler\PingHandler::class => Handler\PingHandler::class,
            ],
            'factories'  => [
                Handler\HomePageHandler::class => Handler\HomePageHandlerFactory::class,
            ],
        ];
    }

    /**
     * Return the asset management configuration
     */ 
    public function getAssetsConfiguration(): array
    {
        return [
            'debug' => true,
            'buildOnRequest' => true,

            'webPath' => __DIR__ . '/../../../public/assets',
            'basePath' => 'assets',

            'routes' => [
                'home' => [
                    '@base_js',
                    '@base_css',
                ],
            ],

            'modules' => [
                'application' => [
                    'root_path' => __DIR__ . '/../templates/assets',
                    'collections' => [
                        'base_css' => [
                            'assets' => [
                                'scss/styles.scss',
                            ],
                            'filters' => [
                                'CssRewriteFilter' => [
                                    'name' => 'Assetic\Filter\CssRewriteFilter'
                                ]
                            ],
                        ],

                        'base_js' => [
                            'assets' => [
                                'js/scripts.js',
                            ]
                        ],

                        'base_images' => [
                            'assets' => [
                                'img/*.png',
                                'img/*.ico',
                            ],
                            'options' => [
                                'move_raw' => true,
                            ]
                        ],
                    ],
                ],
            ],
        ];
    }

    /**
     * Returns the templates configuration
     */
    public function getTemplates(): array
    {
        return [
            'paths' => [
                'app'    => [__DIR__ . '/../templates/app'],
                'error'  => [__DIR__ . '/../templates/error'],
                'layout' => [__DIR__ . '/../templates/layout'],
            ],
        ];
    }
}
