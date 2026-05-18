import imgProject1 from "./a87e59cc7ec05396f0f1079d3c1da3a62bdbedd0.png";

function Frame2() {
  return (
    <div className="absolute h-[13.317px] left-[15.17px] top-[50.84px] w-[15.419px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Satoshi:Regular',sans-serif] justify-center leading-[0] left-[7.5px] not-italic text-[9.812px] text-center text-white top-[6.5px] whitespace-nowrap">
        <p className="leading-[normal]">(01)</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[84.165px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#8b8b8b] border-b-[0.506px] border-solid border-t-[0.506px] inset-0 pointer-events-none" />
      <Frame2 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] left-[44.86px] not-italic text-[50.463px] text-white top-[45.73px] tracking-[-1.8861px] whitespace-nowrap">
        <p className="leading-[normal]">Bytkey</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#8b8b8b] border-b-[0.506px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[14.664px] items-center px-[43.486px] py-[8.09px] relative size-full">
          <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.214px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">UX Design</p>
          </div>
          <div className="flex h-[13.147px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[13.147px]">
                <div className="absolute inset-[-0.51px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1468 0.505646">
                    <line id="Line 8" stroke="var(--stroke-0, white)" strokeWidth="0.505646" x2="13.1468" y1="0.252823" y2="0.252823" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.214px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">Finance Mobile App</p>
          </div>
          <div className="flex h-[13.147px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[13.147px]">
                <div className="absolute inset-[-0.51px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1468 0.505646">
                    <line id="Line 8" stroke="var(--stroke-0, white)" strokeWidth="0.505646" x2="13.1468" y1="0.252823" y2="0.252823" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.214px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">{` NotionCase Study`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Project() {
  return (
    <div className="content-stretch flex flex-col gap-[5.056px] items-start justify-end py-[24.777px] relative size-full" data-name="PROJECT1">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgProject1} />
        <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0" />
      </div>
      <Frame1 />
      <Frame />
    </div>
  );
}