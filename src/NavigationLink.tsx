import { Link, useLocation } from "react-router-dom"

interface IProps {
  children: React.ReactNode;
  to: string;
  className?: string;
  activeClassName?: string;
}

const NavigationLink = ({ children, to, className, activeClassName }: IProps) => {
  const location = useLocation();
  let classes = className;
  if (activeClassName && location.pathname === to) {
    classes += " "
    classes += activeClassName;
  }
  console.log('classes', classes, location.pathname, to, activeClassName);
  return <Link to={to} className={classes}>{children}</Link>
}

export default NavigationLink;