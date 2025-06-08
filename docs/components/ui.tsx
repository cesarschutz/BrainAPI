
import React, { useState, useEffect, useCallback } from 'react';
import type { CodeBlockProps, ProcessStepItem, InteractiveDemoData } from '../types';

// Icons (Heroicons style)
export const BrainIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0V9A2.25 2.25 0 0 1 7.5 6.75h1.5M15 9H9" />
  </svg>
);

export const LightBulbIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.355a12.053 12.053 0 0 1-4.5 0M12 3c-2.485 0-4.5 2.015-4.5 4.5 0 .852.265 1.701.811 2.447L12 15.5l3.689-5.553A6.04 6.04 0 0 0 16.5 7.5C16.5 5.015 14.485 3 12 3Z" />
  </svg>
);

export const CodeBracketIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
);

export const PuzzlePieceIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.597.484-1.087 1.088-1.087h.003a1.087 1.087 0 0 1 1.087 1.087v1.821c0 .597-.484 1.087-1.088 1.087h-.003A1.087 1.087 0 0 1 15.338 7.91v-1.82Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.375v6.25A2.25 2.25 0 0 1 9.75 21h-3.5A2.25 2.25 0 0 1 4 18.75v-6.25m12-6.375v6.25c0 1.24-1.01 2.25-2.25 2.25H12M4 12.375h.008v.008H4v-.008Zm0 0c.004-.002.006-.004.008-.006H4Zm0 0c.002.002.004.004.006.006H4Zm0 0c.002-.002.004-.004.006-.006H4Zm0 0c-.002.002-.004.004-.006.006H4Zm0 0c.004.002.006.004.008.006H4Zm0 0H3.75v.375c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125-.504 1.125-1.125V12h-.375m-2.25 0H3.75m0 0h3.375M4 12.375c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125V12h-.375m-2.25 0H3.75m0 0h3.375m0 0c0 1.24-1.01 2.25-2.25 2.25h-1.5A2.25 2.25 0 0 1 4 12.375M12 12.375c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125-.504-1.125-1.125V12h.375m2.25 0H12m0 0h-3.375M12 12.375c0 1.24-1.01 2.25-2.25 2.25h-1.5A2.25 2.25 0 0 1 6 12.375m6 0V6.125A2.25 2.25 0 0 1 14.25 4h3.5A2.25 2.25 0 0 1 20 6.125v6.25m-12-6.375V6.125c0-1.24 1.01-2.25 2.25-2.25h1.5c1.24 0 2.25 1.01 2.25 2.25V12h-.375M8 12.375H7.992v.008H8v-.008Zm0 0c-.004-.002-.006-.004-.008-.006H8Zm0 0c-.002.002-.004.004-.006.006H8Zm0 0c-.002-.002-.004-.004-.006-.006H8Zm0 0c.002.002.004.004.006.006H8Zm0 0c-.004.002-.006.004-.008.006H8Zm0 0H8.25v.375c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125-.504-1.125-1.125V12h.375m2.25 0H8.25m0 0h-3.375M8 12.375c0-.621-.504-1.125-1.125-1.125h-1.5C4.629 11.25 4.125 11.754 4.125 12.375V12h.375m2.25 0H8.25m0 0h-3.375m0 0c0 1.24 1.01 2.25 2.25 2.25h1.5c1.24 0 2.25-1.01 2.25-2.25M12 12.375v-2.25m0 2.25v-6.375M12 12.375H8.25m3.75 0V8.25m0 4.125H12m0-4.125H8.25m3.75 4.125v6.25A2.25 2.25 0 0 1 9.75 21h-3.5A2.25 2.25 0 0 1 4 18.75v-6.25M16 12.375h.008v.008H16v-.008Zm0 0c.004-.002.006-.004.008-.006H16Zm0 0c.002.002.004.004.006.006H16Zm0 0c.002-.002.004-.004.006-.006H16Zm0 0c-.002.002-.004.004-.006.006H16Zm0 0c.004.002.006.004.008.006H16Zm0 0H15.75v.375c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125-.504 1.125-1.125V12h-.375m-2.25 0H15.75m0 0h3.375M16 12.375c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125V12h-.375m-2.25 0H15.75m0 0h3.375m0 0c0 1.24-1.01 2.25-2.25 2.25h-1.5a2.25 2.25 0 0 1-2.25-2.25" />
  </svg>
);

export const WrenchScrewdriverIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.475-2.475M11.42 15.17l-2.475 2.475M12 3v12.75M15 3.75V7.5M7.5 3.75V7.5m-3.75 0h10.5a2.25 2.25 0 0 0 2.25-2.25V3.75a2.25 2.25 0 0 0-2.25-2.25H3.75A2.25 2.25 0 0 0 1.5 3.75v1.5A2.25 2.25 0 0 0 3.75 7.5m6.25 0v2.25m0 0v2.25m0 0v2.25m0 0V15m0 0v-2.25m0 0l-2.475 2.475M15 12.75l-2.475-2.475" />
  </svg>
);

export const CogIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m1.5 0H3m1.5 0H3m13.5 0H21m-1.5 0H21m-1.5 0H21M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM12 15v2.25m0-9V3.75m0 9.75a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z" />
  </svg>
);

export const LinkIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>
);

export const PlayIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>
);

export const DocumentTextIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);

export const CommandLineIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

export const Card: React.FC<{children: React.ReactNode, className?: string, withGradientBorder?: boolean}> = ({ children, className = '', withGradientBorder = true }) => (
  <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl group ${className}`}>
    {withGradientBorder && <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-secondary-blue to-accent-teal group-hover:from-gold group-hover:to-amber-400 transition-all duration-300"></div>}
    <div className="pt-4">
      {children}
    </div>
  </div>
);

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title, className = '' }) => (
  <div className={`bg-brand-gray-800 rounded-lg shadow-md my-6 ${className}`}>
    {(title || language) && (
      <div className="flex justify-between items-center px-4 py-2 border-b border-brand-gray-700">
        {title && <span className="text-sm font-semibold text-brand-gray-300">{title}</span>}
        {language && <span className="text-xs font-mono bg-accent-teal text-white px-2 py-0.5 rounded">{language}</span>}
      </div>
    )}
    <pre className="p-4 text-sm text-brand-gray-100 overflow-x-auto font-mono whitespace-pre-wrap break-all">
      <code>{code.trim()}</code>
    </pre>
  </div>
);

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = 
  ({ children, onClick, variant = 'primary', className = '', type = "button", disabled }) => {
  let baseStyle = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-md hover:shadow-lg";
  if (variant === 'primary') {
    baseStyle += " bg-gradient-to-r from-secondary-blue to-accent-teal text-white hover:from-blue-600 hover:to-teal-700 focus:ring-secondary-blue";
  } else if (variant === 'secondary') {
    baseStyle += " bg-gold text-white hover:bg-amber-600 focus:ring-gold";
  } else if (variant === 'outline') {
    baseStyle += " border-2 border-secondary-blue text-secondary-blue hover:bg-secondary-blue hover:text-white focus:ring-secondary-blue";
  }
  if (disabled) {
    baseStyle += " opacity-50 cursor-not-allowed";
  }
  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

export const Tooltip: React.FC<{children: React.ReactNode, tip: string | React.ReactNode, className?: string}> = ({ children, tip, className }) => (
  <span className={`relative group ${className || ''}`}>
    {children}
    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs
                     bg-brand-gray-800 text-white text-xs rounded-md p-2
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 shadow-lg pointer-events-none">
      {tip}
    </span>
  </span>
);

export const ProcessFlowCard: React.FC<{step: ProcessStepItem, className?: string}> = ({ step, className }) => (
  <Card className={`text-center hover:-translate-y-1 ${className || ''}`} withGradientBorder={false}>
    {step.number && (
      <div className="mb-4 mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-secondary-blue to-accent-teal text-white flex items-center justify-center text-xl font-bold shadow-lg">
        {step.number}
      </div>
    )}
    {step.icon && !step.number && React.isValidElement(step.icon) && 
        <div className="mb-4 text-accent-teal mx-auto">
            {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10" })}
        </div>
    }
    <h3 className="text-xl font-semibold text-primary-blue mb-2">{step.title}</h3>
    <p className="text-brand-gray-600 text-sm">{step.description}</p>
  </Card>
);

export const InteractiveDemoBlock: React.FC<{ demo: InteractiveDemoData, className?: string }> = ({ demo, className }) => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState<string | React.ReactNode>(demo.initialOutput);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!inputValue.trim()) {
      setOutputValue("Por favor, digite algo!");
      return;
    }
    setIsLoading(true);
    setOutputValue("Processando...");
    try {
      const result = await demo.onSimulate(inputValue);
      setOutputValue(result);
    } catch (error) {
      setOutputValue(`Erro: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, demo]);

  return (
    <Card className={`my-8 border-2 border-dashed border-accent-teal ${className || ''}`} withGradientBorder={false}>
      <h3 className="text-2xl font-semibold text-primary-blue mb-4">{demo.title}</h3>
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={demo.inputPlaceholder}
        className="w-full p-3 border border-brand-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-accent-teal focus:border-accent-teal transition-shadow duration-300 h-24 resize-none"
        disabled={isLoading}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <Button onClick={handleSubmit} disabled={isLoading} className="w-full md:w-auto">
        {isLoading ? 'Enviando...' : demo.buttonText}
      </Button>
      <div className="mt-6 bg-primary-blue text-white p-4 rounded-lg font-mono text-sm min-h-[80px] overflow-x-auto whitespace-pre-wrap break-words">
        {outputValue}
      </div>
    </Card>
  );
};

export const SectionHeader: React.FC<{title: string, subtitle?: string | React.ReactNode, imageUrl?: string, icon?: React.ReactNode}> = ({ title, subtitle, imageUrl, icon }) => (
  <div className="mb-12 text-center">
    {imageUrl && <img src={imageUrl} alt={title} className="mx-auto mb-6 rounded-lg shadow-lg h-40 md:h-56 object-contain animate-float-gentle" />}
    {icon && !imageUrl && React.isValidElement(icon) && 
        <div className="flex justify-center mb-4 text-primary-blue">
            {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-16 h-16" })}
        </div>
    }
    <h2 className="text-4xl md:text-5xl font-bold text-primary-blue mb-4 relative inline-block">
      {title}
      <span className="block w-32 h-1.5 bg-gradient-to-r from-secondary-blue via-accent-teal to-gold mx-auto mt-3 rounded-full"></span>
    </h2>
    {subtitle && <p className="text-lg md:text-xl text-brand-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
  </div>
);

export const IconTextItem: React.FC<{icon: string | React.ReactNode, children: React.ReactNode, className?: string}> = ({ icon, children, className }) => (
  <div className={`flex items-start space-x-3 my-3 ${className || ''}`}>
    <div className="flex-shrink-0 text-2xl mt-0.5">
      {typeof icon === 'string' ? <span>{icon}</span> : icon}
    </div>
    <div className="text-brand-gray-700">{children}</div>
  </div>
);

export const Pill: React.FC<{ children: React.ReactNode, color?: string, className?: string}> = ({ children, color = 'bg-accent-teal text-white', className }) => (
  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${color} ${className}`}>
    {children}
  </span>
);

export const Alert: React.FC<{children: React.ReactNode, type?: 'info' | 'warning' | 'success' | 'error', title?: string, className?: string}> = ({ children, type = 'info', title, className }) => {
  let colors = '';
  let IconComponent: React.FC<{className?: string}> | null = null;

  switch (type) {
    case 'info':
      colors = 'bg-blue-50 border-blue-500 text-blue-700';
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>;
      break;
    case 'warning':
      colors = 'bg-amber-50 border-amber-500 text-amber-700';
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>;
      break;
    case 'success':
      colors = 'bg-green-50 border-green-500 text-green-700';
       IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
      break;
    case 'error':
      colors = 'bg-red-50 border-red-500 text-red-700';
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>;
      break;
  }

  return (
    <div className={`border-l-4 p-4 my-6 rounded-r-lg ${colors} ${className || ''}`} role="alert">
      <div className="flex">
        {IconComponent && <div className="flex-shrink-0 mr-3"><IconComponent /></div>}
        <div>
          {title && <p className="font-bold mb-1">{title}</p>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const CharacterCard: React.FC<{imageUrl: string, altText: string, children: React.ReactNode, className?:string}> = ({ imageUrl, altText, children, className }) => (
  <Card className={`md:grid md:grid-cols-[180px_1fr] md:gap-10 md:items-center ${className || ''}`}>
    <img src={imageUrl} alt={altText} className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto mb-6 md:mb-0 animate-float-gentle" />
    <div className="prose prose-sm sm:prose max-w-none text-brand-gray-700">
      {children}
    </div>
  </Card>
);

export const MermaidCodeBlock: React.FC<{ code: string, title?: string, className?: string }> = ({ code, title, className }) => (
  <div className={`bg-brand-gray-50 border border-brand-gray-200 rounded-lg shadow-sm my-6 ${className}`}>
    {title && (
      <div className="px-4 py-2 border-b border-brand-gray-200">
        <span className="text-sm font-semibold text-brand-gray-700">{title}</span>
      </div>
    )}
    <pre className="p-4 text-sm text-brand-gray-700 overflow-x-auto font-mono whitespace-pre-wrap break-all">
      <code>{code.trim()}</code>
    </pre>
    <div className="px-4 py-2 border-t border-brand-gray-200 text-xs text-brand-gray-500">
      Este é um diagrama Mermaid. Para visualizá-lo, copie o código e cole em um editor compatível com Mermaid (ex: <a href="https://mermaid.live" target="_blank" rel="noopener noreferrer" className="text-secondary-blue hover:underline">Mermaid Live Editor</a>).
    </div>
  </div>
);

export const Table: React.FC<{headers: string[], rows: (string | React.ReactNode)[][], className?: string}> = ({ headers, rows, className }) => (
  <div className={`overflow-x-auto my-6 ${className || ''}`}>
    <table className="min-w-full divide-y divide-brand-gray-200 border border-brand-gray-200 rounded-lg shadow-sm">
      <thead className="bg-brand-gray-100">
        <tr>
          {headers.map((header, index) => (
            <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-brand-gray-200">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-brand-gray-50 transition-colors duration-150">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-brand-gray-700">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const FeatureList: React.FC<{items: {icon: React.ReactNode, title: string, description: string}[]}> = ({items}) => (
  <div className="grid md:grid-cols-2 gap-8 my-8">
    {items.map((item, index) => (
      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-brand-gray-100 transition-colors duration-200">
        {React.isValidElement(item.icon) && 
            <div className="flex-shrink-0 text-accent-teal mt-1">
             {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8"})}
            </div>
        }
        <div>
          <h4 className="text-lg font-semibold text-primary-blue">{item.title}</h4>
          <p className="text-brand-gray-600">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
);

export const ExternalLink: React.FC<{href: string, children: React.ReactNode, className?: string}> = ({href, children, className}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`text-secondary-blue hover:text-accent-teal hover:underline font-medium transition-colors duration-200 ${className || ''}`}>
    {children}
  </a>
);

export const Badge: React.FC<{children: React.ReactNode, variant?: 'java' | 'spring' | 'adk' | 'mcp' | 'node' | 'docker' | 'openapi', className?: string}> = ({children, variant, className}) => {
  let colors = 'bg-brand-gray-200 text-brand-gray-700';
  switch(variant) {
    case 'java': colors = 'bg-orange-500 text-white'; break;
    case 'spring': colors = 'bg-green-500 text-white'; break;
    case 'adk': colors = 'bg-red-500 text-white'; break;
    case 'mcp': colors = 'bg-purple-500 text-white'; break;
    case 'node': colors = 'bg-green-400 text-brand-gray-800'; break;
    case 'docker': colors = 'bg-blue-500 text-white'; break;
    case 'openapi': colors = 'bg-sky-500 text-white'; break;
  }
  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${colors} ${className || ''}`}>
      {children}
    </span>
  );
};
