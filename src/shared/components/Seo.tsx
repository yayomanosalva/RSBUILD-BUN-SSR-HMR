import React, { ReactNode } from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

export function Seo({ title, description, children }: SeoProps) {
  return (
    <>
      <title>{title ? `${title} | Mi App` : 'Mi App'}</title>
      {description && <meta name="description" content={description} />}
      {children}
    </>
  );
}