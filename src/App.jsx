import { useGSAP } from "@gsap/react";
import fitty from "fitty";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import CustomEase from "gsap/src/CustomEase";
import { SplitText } from "gsap/src/all";
gsap.registerPlugin(CustomEase, SplitText);
CustomEase.create("hop", "0.9,0,0.1,1");
CustomEase.create("glide", "0.8,0,0.2,1");
function App() {
  const titleRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const fitInstance = fitty(titleRef.current, { minSize: 10, maxSize: 2000 });
    document.fonts.ready.then(() => fitInstance.fit());
    return () => fitInstance.unsubscribe();
  }, []);

  useGSAP(() => {
    const split = new SplitText(titleRef.current, {
      type: "chars",
      mask: "chars",
    });
    gsap
      .timeline()
      .from(".main", {
        clipPath: "inset( 100% 0  0%  0)",
        ease: "power1.inOut",
        duration: 1,
      })
      .from(
        ".preloader",
        {
          clipPath: "inset(100% 0 0% 0)",
          ease: "power1.inOut",
          duration: 1,
        },
        "<",
      )
      .to(
        ".main",
        {
          scale: 1,
          ease: "power1.inOut",
          duration: 1,
        },
        "<0.9",
      )
      .to(
        ".preloader",
        {
          clipPath: "inset(0% 0 100% 0)",
          ease: "power1.out",
          duration: 1,
        },
        "<",
      )
      .from(split.chars, { y: "100%", stagger: 0.1 }, "<0.4");
  });
  return (
    <>
      <div className="main p-4 scale-70 h-screen overflow-hidden">
        {" "}
        <div
          ref={titleRef}
          className="pt-18 font-bold uppercase leading-[0.8] main-text"
        >
          zajno
        </div>
        <nav className="fixed top-2 left-0 px-4 flex justify-between items-center w-full">
          <div className="">zajno</div>
          <div className="">digital studio</div>
          <ul className="flex flex-col">
            <li>
              <a href="">work</a>
            </li>
            <li>
              <a href="">about</a>
            </li>
            <li>
              <a href="">contact</a>
            </li>
          </ul>
          <ul className="flex flex-col">
            <li>
              <a href="">twitter</a>
            </li>
            <li>
              <a href="">instagram</a>
            </li>
          </ul>
          <div className="">los angeles, ca</div>
        </nav>
        <div className="img-wrapper w-full h-[370px] mt-6">
          <img
            src="/b6d1a5e4-3a38-4fdb-8688-062fc3c226a5_0.avif"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="preloader fixed top-0 left-0 inset-0 bg-black"></div>
      </div>{" "}
    </>
  );
}

export default App;
