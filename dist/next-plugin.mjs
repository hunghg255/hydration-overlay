import {
  __async,
  __spreadValues
} from "./chunk-6BSPRPK2.mjs";
import webpack from "webpack";
import path from "path";
const getEntryPoint = (entryPoint) => {
  if (typeof entryPoint === "string") {
    return [entryPoint];
  } else if (Array.isArray(entryPoint)) {
    return entryPoint;
  } else if (typeof entryPoint === "object" && "import" in entryPoint) {
    const entryImport = entryPoint.import;
    return Array.isArray(entryImport) ? entryImport : [entryImport];
  } else {
    console.error(
      "[ReactHydrationOverlay]: Could not add hydration overlay script due to unexpected entry point: ",
      entryPoint
    );
    return null;
  }
};
function addScriptToEntryProperty(currentEntryProperty, buildContext) {
  return __async(this, null, function* () {
    const { isServer } = buildContext;
    const newEntryProperty = typeof currentEntryProperty === "function" ? yield currentEntryProperty() : __spreadValues({}, currentEntryProperty);
    for (const entryPointName in newEntryProperty) {
      const isBrowserMainAppEntryPoint = !isServer && (entryPointName === "pages/_app" || // entrypoint for `/app` pages
      entryPointName === "main-app");
      if (isBrowserMainAppEntryPoint) {
        const currentEntryPoint = newEntryProperty[entryPointName];
        const newEntryPoint = getEntryPoint(currentEntryPoint);
        const injectedScriptPath = path.join(
          __dirname,
          "hydration-overlay-initializer.js"
        );
        if (!newEntryPoint || newEntryPoint.includes(injectedScriptPath)) {
          return newEntryProperty;
        }
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
        console.warn(
          "[ReactHydrationOverlay]: This plugin is only meant to be used in development mode. Please remove it from your next.config.js."
        );
      }
      let rawNewConfig = __spreadValues({}, config);
      rawNewConfig.entry = () => __async(this, null, function* () {
        return addScriptToEntryProperty(config.entry, ctx);
      });
      rawNewConfig.plugins = [
        ...rawNewConfig.plugins || [],
        new webpack.DefinePlugin({
          "window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR": JSON.stringify(appRootSelector)
        })
      ];
      return rawNewConfig;
    }
  };
  return Object.assign({}, nextConfig, extraConfig);
};
export {
  withHydrationOverlay
};
