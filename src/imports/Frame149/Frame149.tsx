import svgPaths from "./svg-yre8wz8vtl";
import imgFrame76 from "./9270ea80d2a1f498092763a3047549844326b091.png";
import imgFrame77 from "./009e1b29e3389d3728686598552888d4596e99e6.png";

function Frame() {
  return (
    <div className="absolute h-[154px] left-[60px] top-[368px] w-[628px]">
      <div className="absolute capitalize font-['Satoshi:Black',sans-serif] leading-[0] left-0 not-italic text-[#fffff9] text-[104px] top-0 tracking-[-2.08px] whitespace-nowrap">
        <p className="mb-0">
          <span className="leading-[1.1]">{`Less `}</span>
          <span className="leading-[1.1] text-[#2c2c2c]">noise.</span>
        </p>
        <p>
          <span className="leading-[1.1]">{`More `}</span>
          <span className="leading-[1.1] text-[#2c2c2c]">impact.</span>
        </p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[120px] left-[1353px] top-[218px] w-[505px]">
      <div className="absolute font-['Satoshi:Regular',sans-serif] h-[127px] leading-[0] left-0 not-italic text-[#fffff9] text-[0px] top-0 w-[569px] whitespace-pre-wrap">
        <p className="leading-[44px] mb-0 text-[44px]">{`I Design products and brands that feel clear, human, and `}</p>
        <p className="font-['Satoshi:Bold',sans-serif] leading-[44px] text-[44px]">hard to forget.</p>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#f9f9f9] capitalize font-['Satoshi:Black',sans-serif] h-[1080px] leading-[1.1] left-1/2 not-italic text-[142.014px] top-0 tracking-[-2.8403px] w-[1920px] whitespace-nowrap" data-name="about section">
      <p className="absolute left-[-448.02px] text-[#2c2c2c] top-[262px]">Who</p>
      <p className="absolute left-[2060.12px] text-[#aeaeae] top-[262px]">I AM?</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[710px] left-1/2 top-1/2 w-[508px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgFrame76} />
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgFrame77} />
      </div>
    </div>
  );
}

function Layer() {
  return (
    <div className="h-[45px] relative shrink-0 w-[88.532px]" data-name="Layer_1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88.5325 45">
        <g clipPath="url(#clip0_1_2364)" id="Layer_1">
          <path d={svgPaths.p39c1b800} fill="var(--fill-0, #FFFFF9)" id="Vector" />
          <path d={svgPaths.p1e5e5400} fill="var(--fill-0, #FFFFF9)" id="Vector_2" />
          <path d={svgPaths.p19548c00} fill="var(--fill-0, #FFFFF9)" id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_1_2364">
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
          <p className="relative shrink-0 text-[#aeaeae]">Index</p>
          <p className="relative shrink-0 text-white">About</p>
          <p className="relative shrink-0 text-[#aeaeae]">Work</p>
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

export default function Frame3() {
  return (
    <div className="bg-[#030301] relative size-full">
      <Frame />
      <Frame1 />
      <AboutSection />
      <Frame2 />
      <NavBar />
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[56px] left-[1159px] not-italic opacity-0 text-[#fffff9] text-[40px] top-[328px] w-[691px] whitespace-pre-wrap">{`I’m Muhammad Usama  a Google-Certified UX Designer with 4+ years of experience designing products, brands, and digital experiences that feel clear, useful, and actually human.`}</p>
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[56px] left-[114px] not-italic opacity-0 text-[#fffff9] text-[40px] top-[736px] w-[813.05px]">Making complicated things feel ridiculously simple through thoughtful UX, product strategy, and visual systems built to reduce friction and create real impact.</p>
    </div>
  );
}