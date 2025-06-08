
import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface Section {
  id: string;
  navLabel: string;
  mainTitle: string;
  subTitle?: string | React.ReactNode;
  heroImage?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface ProcessStepItem {
  id: string;
  number?: string | React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  icon?: React.ReactNode;
}

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export interface InteractiveDemoData {
  id: string;
  title: string;
  inputPlaceholder: string;
  buttonText: string;
  initialOutput: string | React.ReactNode;
  onSimulate: (input: string) => Promise<string | React.ReactNode>;
}
