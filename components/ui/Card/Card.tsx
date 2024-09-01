import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Card({ title, description, footer, children }: Props) {
  return (
    <div className="container">
      <div className="w-full m-auto my-8 rounded bg-card">
        <div className="px-5 py-4">
          <h3 className="mb-1 text-2xl font-medium">{title}</h3>
          <p>{description}</p>
          {children}
        </div>
        {footer && (
          <div className="p-4 border-t rounded-b-md border-zinc-700 bg-zinc-900 text-zinc-500">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
