"use strict";
//@ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withHydrationOverlay = void 0;
const webpack_1 = __importDefault(require("webpack"));
const path_1 = __importDefault(require("path"));
// `entryPoint` can be a string, array of strings, or object whose `import` property is one of those two
const getEntryPoint = (entryPoint) => {
    if (typeof entryPoint === "string") {
        return [entryPoint];
    }
    else if (Array.isArray(entryPoint)) {
        return entryPoint;
    }
    else if (typeof entryPoint === "object" && "import" in entryPoint) {
        const entryImport = entryPoint.import;
        return Array.isArray(entryImport) ? entryImport : [entryImport];
    }
    else {
        console.error("[ReactHydrationOverlay]: Could not add hydration overlay script due to unexpected entry point: ", entryPoint);
        return null;
    }
};
function addScriptToEntryProperty(currentEntryProperty, buildContext) {
    return __awaiter(this, void 0, void 0, function* () {
        const { isServer } = buildContext;
        const newEntryProperty = typeof currentEntryProperty === "function"
            ? yield currentEntryProperty()
            : Object.assign({}, currentEntryProperty);
        // inject script into main app entry point
        for (const entryPointName in newEntryProperty) {
            const isBrowserMainAppEntryPoint = !isServer &&
                (entryPointName === "pages/_app" ||
                    // entrypoint for `/app` pages
                    entryPointName === "main-app");
            if (isBrowserMainAppEntryPoint) {
                const currentEntryPoint = newEntryProperty[entryPointName];
                const newEntryPoint = getEntryPoint(currentEntryPoint);
                const injectedScriptPath = path_1.default.join(__dirname, "hydration-overlay-initializer.js");
                if (!newEntryPoint || newEntryPoint.includes(injectedScriptPath)) {
                    return newEntryProperty;
                }
                // Dev mode breaks if you insert the entry point anywhere but at the very end.
                newEntryPoint.push(injectedScriptPath);
                newEntryProperty[entryPointName] = newEntryPoint;
            }
        }
        return newEntryProperty;
    });
}
const withHydrationOverlay = (_pluginOptions = {}) => (nextConfig = {}) => {
    const { appRootSelector = "#__next" } = _pluginOptions;
    const extraConfig = {
        webpack(config, ctx) {
            if (!ctx.dev) {
                console.warn("[ReactHydrationOverlay]: This plugin is only meant to be used in development mode. Please remove it from your next.config.js.");
            }
            let rawNewConfig = Object.assign({}, config);
            rawNewConfig.entry = () => __awaiter(this, void 0, void 0, function* () { return addScriptToEntryProperty(config.entry, ctx); });
            rawNewConfig.plugins = [
                ...(rawNewConfig.plugins || []),
                new webpack_1.default.DefinePlugin({
                    "window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR": JSON.stringify(appRootSelector),
                }),
            ];
            return rawNewConfig;
        },
    };
    return Object.assign({}, nextConfig, extraConfig);
};
exports.withHydrationOverlay = withHydrationOverlay;
