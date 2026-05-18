import imgProject1 from "./a87e59cc7ec05396f0f1079d3c1da3a62bdbedd0.png";

function Frame2() {
  return (
    <div className="absolute h-[19px] left-[21.64px] top-[72.54px] w-[22px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Satoshi:Regular',sans-serif] justify-center leading-[0] left-[11px] not-italic text-[14px] text-center text-white top-[9.5px] whitespace-nowrap">
        <p className="leading-[normal]">(01)</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[120.087px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#8b8b8b] border-b-[0.721px] border-solid border-t-[0.721px] inset-0 pointer-events-none" />
      <Frame2 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] left-[64px] not-italic text-[72px] text-white top-[65.24px] tracking-[-2.691px] whitespace-nowrap">
        <p className="leading-[normal]">Bytkey</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#8b8b8b] border-b-[0.721px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[20.922px] items-center px-[62.045px] py-[11.543px] relative size-full">
          <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">UX Design</p>
          </div>
          <div className="flex h-[18.758px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[18.758px]">
                <div className="absolute inset-[-0.72px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7578 0.721455">
                    <line id="Line 8" stroke="var(--stroke-0, white)" strokeWidth="0.721455" x2="18.7578" y1="0.360728" y2="0.360728" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">Finance Mobile App</p>
          </div>
          <div className="flex h-[18.758px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[18.758px]">
                <div className="absolute inset-[-0.72px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7578 0.721455">
                    <line id="Line 8" stroke="var(--stroke-0, white)" strokeWidth="0.721455" x2="18.7578" y1="0.360728" y2="0.360728" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
            <p className="leading-[normal]">{` NotionCase Study`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Project() {
  return (
    <div className="content-stretch flex flex-col gap-[7.215px] items-start justify-end py-[35.351px] relative size-full" data-name="PROJECT1">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgProject1} />
        <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0" />
      </div>
      <Frame1 />
      <Frame />
    </div>
  );
}