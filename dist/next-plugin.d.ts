import { type NextConfig } from "next";
export declare const DIR_DIST: any;
export type NextPluginOptions = {
    /**
     * The selector for the root element of your app. Defaults to `#__next`.
     */
    appRootSelector?: string;
};
export declare const withHydrationOverlay: (_pluginOptions?: NextPluginOptions) => (nextConfig?: NextConfig) => NextConfig;
