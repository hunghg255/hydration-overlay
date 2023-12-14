"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var next_plugin_exports = {};
__export(next_plugin_exports, {
  withHydrationOverlay: () => withHydrationOverlay
});
module.exports = __toCommonJS(next_plugin_exports);
var import_webpack = __toESM(require("webpack"));
var import_path = __toESM(require("path"));
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
        const injectedScriptPath = import_path.default.join(
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
        new import_webpack.default.DefinePlugin({
          "window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR": JSON.stringify(appRootSelector)
        })
      ];
      return rawNewConfig;
    }
  };
  return Object.assign({}, nextConfig, extraConfig);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  withHydrationOverlay
});
