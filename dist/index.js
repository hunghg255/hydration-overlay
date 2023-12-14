"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var src_exports = {};
__export(src_exports, {
  HydrationOverlay: () => HydrationOverlay,
  Overlay: () => Overlay
});
module.exports = __toCommonJS(src_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
var import_beautify = __toESM(require("beautify"));
var import_react_diff_viewer_continued = __toESM(require("react-diff-viewer-continued"));
var import_react_dom = require("react-dom");
function Overlay() {
  const [SSRHtml, setSSRHtml] = (0, import_react.useState)("");
  const [CSRHtml, setCSRHtml] = (0, import_react.useState)("");
  const [showModal, setShowModal] = (0, import_react.useState)(true);
  const [hasHydrationMismatch, setHasHydrationMismatch] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    const ssrHtml = window.BUILDER_HYDRATION_OVERLAY.SSR_HTML;
    const newCSRHtml = window.BUILDER_HYDRATION_OVERLAY.CSR_HTML;
    if (!ssrHtml || !newCSRHtml) {
      return;
    }
    const newSSR = (0, import_beautify.default)(ssrHtml, { format: "html" });
    setSSRHtml(newSSR);
    const newCSR = (0, import_beautify.default)(newCSRHtml, { format: "html" });
    setCSRHtml(newCSR);
    setShowModal(true);
    if (window.BUILDER_HYDRATION_OVERLAY.ERROR) {
      setHasHydrationMismatch(true);
    }
  }, []);
  const hideModal = () => {
    setShowModal(false);
  };
  const renderModal = showModal && hasHydrationMismatch && typeof document !== "undefined";
  console.log("renderModal", {
    showModal,
    hasHydrationMismatch,
    doc: typeof document !== "undefined",
    renderModal
  });
  if (!renderModal) {
    return null;
  }
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999998,
          background: "rgba(0,0,0,0.5)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          fontFamily: "monospace"
        },
        onClick: hideModal,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            style: {
              zIndex: 999999,
              margin: "4rem 6rem",
              backgroundColor: "white",
              borderRadius: "0.5rem",
              overflow: "auto",
              cursor: "auto",
              color: "#212529"
            },
            onClick: (e) => {
              e.stopPropagation();
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid black",
                    alignItems: "center",
                    position: "sticky",
                    top: 0,
                    left: 0,
                    backgroundColor: "white",
                    zIndex: 10
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "div",
                      {
                        style: {
                          fontSize: "2rem",
                          fontWeight: "bold",
                          padding: "1rem"
                        },
                        children: "Hydration Mismatch Occured"
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "button",
                      {
                        style: {
                          all: "unset",
                          cursor: "pointer",
                          padding: "0.5rem",
                          marginRight: "1rem",
                          backgroundColor: "#212529",
                          borderRadius: "0.25rem",
                          color: "white"
                        },
                        onClick: hideModal,
                        children: "CLOSE"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "relative", width: "100%" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_react_diff_viewer_continued.default,
                {
                  oldValue: SSRHtml,
                  newValue: CSRHtml,
                  leftTitle: "Server-Side Render",
                  rightTitle: "Client-Side Render",
                  compareMethod: import_react_diff_viewer_continued.DiffMethod.WORDS
                }
              ) })
            ] })
          }
        )
      }
    ),
    document.body
  );
}
function HydrationOverlay(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    props.children,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {})
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HydrationOverlay,
  Overlay
});
