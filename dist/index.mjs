"use client";
import "./chunk-6BSPRPK2.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import beautify from "beautify";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";
import { createPortal } from "react-dom";
function Overlay() {
  const [SSRHtml, setSSRHtml] = useState("");
  const [CSRHtml, setCSRHtml] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [hasHydrationMismatch, setHasHydrationMismatch] = useState(false);
  useEffect(() => {
    const ssrHtml = window.BUILDER_HYDRATION_OVERLAY.SSR_HTML;
    const newCSRHtml = window.BUILDER_HYDRATION_OVERLAY.CSR_HTML;
    if (!ssrHtml || !newCSRHtml) {
      return;
    }
    const newSSR = beautify(ssrHtml, { format: "html" });
    setSSRHtml(newSSR);
    const newCSR = beautify(newCSRHtml, { format: "html" });
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
  return createPortal(
    /* @__PURE__ */ jsx(
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
        children: /* @__PURE__ */ jsx(
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
            children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [
              /* @__PURE__ */ jsxs(
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
                    /* @__PURE__ */ jsx(
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
                    /* @__PURE__ */ jsx(
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
              /* @__PURE__ */ jsx("div", { style: { position: "relative", width: "100%" }, children: /* @__PURE__ */ jsx(
                ReactDiffViewer,
                {
                  oldValue: SSRHtml,
                  newValue: CSRHtml,
                  leftTitle: "Server-Side Render",
                  rightTitle: "Client-Side Render",
                  compareMethod: DiffMethod.WORDS
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    props.children,
    /* @__PURE__ */ jsx(Overlay, {})
  ] });
}
export {
  HydrationOverlay,
  Overlay
};
