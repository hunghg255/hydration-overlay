'use client';
// @ts-nocheck

import React, { useEffect, useState } from 'react';

import beautify from 'beautify';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import { createPortal } from 'react-dom';

export function Overlay() {
  const [SSRHtml, setSSRHtml] = useState('');
  const [CSRHtml, setCSRHtml] = useState('');

  const [showModal, setShowModal] = useState(true);
  const [hasHydrationMismatch, setHasHydrationMismatch] = useState(false);

  useEffect(() => {
    const ssrHtml = (window as any)?.BUILDER_HYDRATION_OVERLAY?.SSR_HTML;
    const newCSRHtml = (window as any)?.BUILDER_HYDRATION_OVERLAY?.CSR_HTML;

    if (!ssrHtml || !newCSRHtml) {
      return;
    }

    const newSSR = beautify(ssrHtml, { format: 'html' });
    setSSRHtml(newSSR);
    const newCSR = beautify(newCSRHtml, { format: 'html' });
    setCSRHtml(newCSR);

    setShowModal(true);
    if ((window as any)?.BUILDER_HYDRATION_OVERLAY?.ERROR) {
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

  return createPortal(
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999_998,
        background: 'rgba(0,0,0,0.5)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'monospace',
      }}
      onClick={hideModal}
    >
      <div
        style={{
          zIndex: 999_999,
          margin: '4rem 6rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          overflow: 'auto',
          cursor: 'auto',
          color: '#212529',
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid black',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              left: 0,
              backgroundColor: 'white',
              zIndex: 10,
            }}
          >
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                padding: '1rem',
              }}
            >
              Hydration Mismatch Occured
            </div>

            <button
              style={{
                all: 'unset',
                cursor: 'pointer',
                padding: '0.5rem',
                marginRight: '1rem',
                backgroundColor: '#212529',
                borderRadius: '0.25rem',
                color: 'white',
              }}
              onClick={hideModal}
            >
              CLOSE
            </button>
          </div>
          <div style={{ position: 'relative', width: '100%' }}>
            <ReactDiffViewer
              oldValue={SSRHtml}
              newValue={CSRHtml}
              leftTitle={'Server-Side Render'}
              rightTitle={'Client-Side Render'}
              compareMethod={DiffMethod.WORDS}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function HydrationOverlay(props: { children: React.ReactNode }) {
  return (
    <>
      {props.children}
      <Overlay />
    </>
  );
}
