import React from 'react';
import { Code, Brain, GitBranch, Terminal } from 'lucide-react';

function Bullets() {
  return (
    <section>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-card rounded-lg p-5 text-text">
            <div className="flex items-center mb-4">
              <Code
                size={48}
                className="border-2 border-primary rounded-lg p-2 mr-4"
              />
              <h3 className="text-xl font-bold">
                Effortless coding assistance.
              </h3>
            </div>
            <p>
              TinyScript speeds up your workflow by providing smart,
              context-aware code suggestions, so you can focus on building.
            </p>
          </div>
          <div className="bg-card rounded-lg p-5 text-text">
            <div className="flex items-center mb-4">
              <Brain
                size={48}
                className="border-2 border-primary rounded-lg p-2 mr-4"
              />
              <h3 className="text-xl font-bold">Reduce cognitive load.</h3>
            </div>
            <p>
              Let TinyScript handle repetitive coding tasks, giving you more
              mental space to solve complex problems.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-5 text-text">
            <div className="flex items-center mb-4">
              <GitBranch
                size={48}
                className="border-2 border-primary rounded-lg p-2 mr-4"
              />
              <h3 className="text-xl font-bold">Code with confidence.</h3>
            </div>
            <p>
              TinyScript helps you catch errors and improve code quality,
              reducing bugs before they reach production.
            </p>
          </div>
          <div className="bg-card rounded-lg p-5 text-text">
            <div className="flex items-center mb-4">
              <Terminal
                size={48}
                className="border-2 border-primary rounded-lg p-2 mr-4"
              />
              <h3 className="text-xl font-bold">Stay in the flow.</h3>
            </div>
            <p>
              Maintain momentum in your coding sessions with TinyScript&apos;s
              on-demand guidance, keeping interruptions to a minimum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bullets;
