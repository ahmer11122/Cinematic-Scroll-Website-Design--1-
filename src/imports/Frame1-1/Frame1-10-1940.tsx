import svgPaths from "./svg-prm9rwyk3k";
import imgImage2 from "./f86da7fd626a01ceb96b847d0ceddf1eb065f3fd.png";

function Layer() {
  return (
    <div className="h-[45px] relative shrink-0 w-[88.532px]" data-name="Layer_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88.5325 45">
        <g clipPath="url(#clip0_6_563)" id="Layer_1">
          <path d={svgPaths.p39c1b800} fill="var(--fill-0, #FFFFF9)" id="Vector" />
          <path d={svgPaths.p1e5e5400} fill="var(--fill-0, #FFFFF9)" id="Vector_2" />
          <path d={svgPaths.p19548c00} fill="var(--fill-0, #FFFFF9)" id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_6_563">
            <rect fill="white" height="45" width="88.5325" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Navigation() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Navigation">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex font-['Satoshi:Black',sans-serif] gap-[80px] items-center justify-end leading-[normal] not-italic pl-[167px] pr-[10px] relative size-full text-[16px] uppercase whitespace-nowrap">
          <p className="relative shrink-0 text-white">Index</p>
          <p className="relative shrink-0 text-[#dedddd]">About</p>
          <p className="relative shrink-0 text-[#dedddd]">Work</p>
          <p className="relative shrink-0 text-[#aeaeae]">Contact</p>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[60px] py-[48px] relative size-full">
          <Layer />
          <Navigation />
        </div>
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-0 top-0 w-[1920px]" data-name="nav bar">
      <Header />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[#030301] relative size-full">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1080px] left-1/2 top-1/2 w-[762px]" data-name="image 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
      <NavBar />
    </div>
  );
}