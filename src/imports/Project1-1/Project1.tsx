import imgProject1 from "./a87e59cc7ec05396f0f1079d3c1da3a62bdbedd0.png";

function Frame2() {
  return (
    <div className="absolute h-[20.388px] left-[23.23px] top-[77.84px] w-[23.607px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Satoshi:Regular',sans-serif] justify-center leading-[0] left-[11.5px] not-italic text-[15.023px] text-center text-white top-[10px] whitespace-nowrap">
        <p className="leading-[normal]">(01)</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[128.858px] opacity-0 relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#8b8b8b] border-b-[0.774px] border-solid border-t-[0.774px] inset-0 pointer-events-none" />
      <Frame2 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] left-[68.68px] not-italic text-[77.259px] text-white top-[69.96px] tracking-[-2.8876px] whitespace-nowrap">
        <p className="leading-[normal]">Bytkey</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="opacity-0 relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#8b8b8b] border-b-[0.774px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[22.45px] items-center px-[66.577px] py-[12.386px] relative size-full">
          <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17.169px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">UX Design</p>
          </div>
          <div className="flex h-[20.128px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[20.128px]">
                <div className="absolute inset-[-0.77px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.128 0.774153">
                    <line id="Line 8" stroke="var(--stroke-0, white)" strokeWidth="0.774153" x2="20.128" y1="0.387077" y2="0.387077" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17.169px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">Finance Mobile App</p>
          </div>
          <div className="flex h-[20.128px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[20.128px]">
                <div className="absolute inset-[-0.77px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.128 0.774153">
                    <line id="Line 8" stroke="var(--stroke-0, white)" strokeWidth="0.774153" x2="20.128" y1="0.387077" y2="0.387077" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17.169px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">{` NotionCase Study`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Project() {
  return (
    <div className="content-stretch flex flex-col gap-[7.742px] items-start justify-end py-[37.934px] relative size-full" data-name="PROJECT1">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgProject1} />
        <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0" />
      </div>
      <Frame1 />
      <Frame />
    </div>
  );
}