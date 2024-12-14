import React from 'react';

interface HelloProps {
  name: string;
}

const Hello: React.FC<HelloProps> = ({ name }) => {
  return <h1 className="text-2xl font-bold">Hello, {name}!</h1>;
};

export default Hello;
