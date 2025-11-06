
/*Componente Padre: Card */
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-visible w-80 flex flex-col relative">
      {children}
    </div>
  )
}

/* Componente Hijo: CardHeader*/
interface CardHeaderProps {
  children: React.ReactNode
}

const CardHeader = ({children}: CardHeaderProps) => {
  return (
    <div className="bg-gray-100 px-4 py-2 font-semibold text-gray-800">
      {children}
    </div>
  )
}

/* Componente Hijo: CardBody */
interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

const CardBody = ({ children, className = "" }: CardBodyProps) => {
  return <div className={`p-4 text-gray-700 ${className}`}>{children}</div>;
};

/* Componente Hijo: CardFooter */
interface CardFooterProps {
  children: React.ReactNode
}

const CardFooter = ({ children }: CardFooterProps) => {
  return (
    <div
      className={`absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3`}>
      {children}
    </div>
  );
};
/* Asignar los componentes*/
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;


export default Card;