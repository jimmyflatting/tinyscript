import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container mx-auto">
        <div className="bg-card rounded-lg p-6 flex justify-center">
          <h3 className="text-lg font-normal text-primary">
            Tiny<span className="font-bold">Script</span>
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
