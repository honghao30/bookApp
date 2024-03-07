import { useState, useEffect } from 'react';

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [showGotoTop, setShowGotoTop] = useState(false);
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollPosition = window.pageYOffset;
      if (newScrollPosition > prevScrollPosition) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setShowGotoTop(newScrollPosition > 400);

      setCurrentScrollPosition(newScrollPosition);
      setPrevScrollPosition(newScrollPosition);    
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPosition]);

  return { scrollDirection, showGotoTop, currentScrollPosition };
};

export default useScrollDirection;
