import React, { useEffect } from "react";

const Image = ({ src, alt, initClasses, classesToAdd }) => {
  const ref = React.createRef();

  useEffect(() => {
    const fadeInHandler = ()=> ref.current? ref.current.classList.add(classesToAdd): null;
    ref.current.addEventListener("load", fadeInHandler);
  }, []);

  return <img src={src} ref={ref} alt={alt} className={initClasses} />;
};

export default Image;
