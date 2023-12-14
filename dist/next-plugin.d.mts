import { NextConfig } from 'next';

type NextPluginOptions = {
    /**
     * The selector for the root element of your app. Defaults to `#__next`.
     */
    appRootSelector?: string;
};
declare const withHydrationOverlay: (_pluginOptions?: NextPluginOptions) => (nextConfig?: NextConfig) => NextConfig;

export { type NextPluginOptions, withHydrationOverlay };
