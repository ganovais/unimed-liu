import * as React from "react";

const navigation = [
  { name: "Solicitações Ativas", href: "#" },
  { name: "Histórico", href: "#" },
];

const NavigationLinks: React.FC = () => (
  <>
    {navigation.map((item) => (
      <a
        key={item.name}
        href={item.href}
        className="text-lg font-semibold leading-6 text-gray-100 hover:text-primaryLight transition-colors duration-300"
      >
        {item.name}
      </a>
    ))}
  </>
);

export default NavigationLinks;
