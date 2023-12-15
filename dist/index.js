"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydrationOverlay = exports.Overlay = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
// @ts-nocheck
const react_1 = require("react");
const beautify_1 = __importDefault(require("beautify"));
const react_diff_viewer_continued_1 = __importStar(require("react-diff-viewer-continued"));
const react_dom_1 = require("react-dom");
function Overlay() {
    const [SSRHtml, setSSRHtml] = (0, react_1.useState)('');
    const [CSRHtml, setCSRHtml] = (0, react_1.useState)('');
    const [showModal, setShowModal] = (0, react_1.useState)(true);
    const [hasHydrationMismatch, setHasHydrationMismatch] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const ssrHtml = window.BUILDER_HYDRATION_OVERLAY.SSR_HTML;
        const newCSRHtml = window.BUILDER_HYDRATION_OVERLAY.CSR_HTML;
        if (!ssrHtml || !newCSRHtml) {
            return;
        }
        const newSSR = (0, beautify_1.default)(ssrHtml, { format: 'html' });
        setSSRHtml(newSSR);
        const newCSR = (0, beautify_1.default)(newCSRHtml, { format: 'html' });
        setCSRHtml(newCSR);
        setShowModal(true);
        if (window.BUILDER_HYDRATION_OVERLAY.ERROR) {
            setHasHydrationMismatch(true);
        }
    }, []);
    const hideModal = () => {
        setShowModal(false);
    };
    const renderModal = showModal && hasHydrationMismatch && typeof document !== 'undefined';
    if (!renderModal) {
        return null;
    }
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)("div", { style: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999998,
            background: 'rgba(0,0,0,0.5)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'monospace',
        }, onClick: hideModal, children: (0, jsx_runtime_1.jsx)("div", { style: {
                zIndex: 999999,
                margin: '4rem 6rem',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                overflow: 'auto',
                cursor: 'auto',
                color: '#212529',
            }, onClick: (e) => {
                e.stopPropagation();
            }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid black',
                            alignItems: 'center',
                            position: 'sticky',
                            top: 0,
                            left: 0,
                            backgroundColor: 'white',
                            zIndex: 10,
                        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    padding: '1rem',
                                }, children: "Hydration Mismatch Occured" }), (0, jsx_runtime_1.jsx)("button", { style: {
                                    all: 'unset',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                    marginRight: '1rem',
                                    backgroundColor: '#212529',
                                    borderRadius: '0.25rem',
                                    color: 'white',
                                }, onClick: hideModal, children: "CLOSE" })] }), (0, jsx_runtime_1.jsx)("div", { style: { position: 'relative', width: '100%' }, children: (0, jsx_runtime_1.jsx)(react_diff_viewer_continued_1.default, { oldValue: SSRHtml, newValue: CSRHtml, leftTitle: 'Server-Side Render', rightTitle: 'Client-Side Render', compareMethod: react_diff_viewer_continued_1.DiffMethod.WORDS }) })] }) }) }), document.body);
}
exports.Overlay = Overlay;
function HydrationOverlay(props) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [props.children, (0, jsx_runtime_1.jsx)(Overlay, {})] }));
}
exports.HydrationOverlay = HydrationOverlay;
