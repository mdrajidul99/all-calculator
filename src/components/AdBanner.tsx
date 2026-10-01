import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

interface AdBannerProps {
  type: 'banner' | 'rectangle';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ type, className = '' }) => {
  const { language } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous ad content if any
    container.innerHTML = '';

    const adConfig =
      type === 'banner'
        ? {
            key: 'f4af6c08c26e54c25e3a0642c28e1b1b',
            format: 'iframe',
            height: 60,
            width: 468,
            scriptSrc: 'https://www.highrevenueformat.com/f4af6c08c26e54c25e3a0642c28e1b1b/invoke.js',
          }
        : {
            key: '394cea37247fdd9c69db164df3316129',
            format: 'iframe',
            height: 250,
            width: 300,
            scriptSrc: 'https://www.highrevenueformat.com/394cea37247fdd9c69db164df3316129/invoke.js',
          };

    // Create an iframe to safely isolate external ad scripts without DOM pollution
    const iframe = document.createElement('iframe');
    iframe.style.width = `${adConfig.width}px`;
    iframe.style.maxWidth = '100%';
    iframe.style.height = `${adConfig.height}px`;
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    iframe.title = 'Advertisement';

    container.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; overflow: hidden; background: transparent; }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              atOptions = {
                'key' : '${adConfig.key}',
                'format' : '${adConfig.format}',
                'height' : ${adConfig.height},
                'width' : ${adConfig.width},
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="${adConfig.scriptSrc}"></script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, [type]);

  const label = language === 'bn' ? 'বিজ্ঞাপন' : 'Advertisement';

  return (
    <div
      className={`my-6 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-slate-200/70 bg-slate-100/60 p-2 text-center dark:border-slate-800/80 dark:bg-slate-900/50 ${className}`}
    >
      <span className="mb-1.5 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {label}
      </span>
      <div
        ref={containerRef}
        className="flex w-full items-center justify-center overflow-x-auto no-scrollbar"
        style={{ minHeight: type === 'banner' ? '60px' : '250px' }}
      />
    </div>
  );
};
