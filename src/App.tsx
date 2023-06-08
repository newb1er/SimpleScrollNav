import { MutableRefObject, useEffect, useRef, useState } from "react";
import "./App.css";

const ScrollNav = ({ currentTag }: { currentTag: number }) => {
  const onClick = (blockId: string) => {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      document.getElementById(blockId)?.scrollIntoView({ behavior: "smooth" });
    };
  };

  return (
    <div className="nav">
      <a
        href="#1"
        onClick={onClick("1")}
        className={currentTag === 1 ? "mark" : ""}
      >
        1
      </a>
      <a
        href="#2"
        onClick={onClick("2")}
        className={currentTag === 2 ? "mark" : ""}
      >
        2
      </a>
      <a
        href="#3"
        onClick={onClick("3")}
        className={currentTag === 3 ? "mark" : ""}
      >
        3
      </a>
    </div>
  );
};

const Blocks = ({
  refArray,
}: {
  refArray: MutableRefObject<HTMLDivElement[]>;
}) => {
  const refAdd = (el: HTMLDivElement | null) => {
    if (!el) return;
    refArray.current.push(el);
  };

  return (
    <>
      <div className="screen-block bg-beige" id="1" ref={refAdd}>
        1
      </div>
      <div className="screen-block bg-cyan" id="2" ref={refAdd}>
        2
      </div>
      <div className="screen-block bg-gray" id="3" ref={refAdd}>
        3
      </div>
    </>
  );
};

function App() {
  const [viewingBlock, setViewingBlock] = useState(1);

  const appearObserver = useRef(
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setViewingBlock(Number(entry.target.id));
      },
      { threshold: 0.4 }
    )
  );

  const blocks = useRef(new Array());

  useEffect(() => {
    blocks.current.forEach((el) => {
      appearObserver.current.observe(el);
    });

    return () => {
      blocks.current.forEach((el) => {
        appearObserver.current.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <Blocks refArray={blocks} />
      <ScrollNav currentTag={viewingBlock} />
    </>
  );
}

export default App;
