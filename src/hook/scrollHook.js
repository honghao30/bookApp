import { useState, useEffect } from 'react';

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [showGotoTop, setShowGotoTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      if (currentScrollPosition > prevScrollPosition) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      // 스크롤 위치에 따라 gotoTop 버튼의 가시성 제어
      setShowGotoTop(currentScrollPosition > 400);

      setPrevScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPosition]);

  return { scrollDirection, showGotoTop }; // 수정된 반환 값
};

export default useScrollDirection;