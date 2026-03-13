import { useId, useState } from 'react';
import { Link, Navigate, NavLink, Route, Routes, useSearchParams } from 'react-router-dom';
import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';

const pageClassName = 'relative min-h-screen overflow-hidden bg-[#1A1A1A]';
const containerClassName = 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8';
const cardClassName = 'rounded-[28px] border border-white/85 bg-[#151515]/95';
const modalCardClassName =
  'w-full max-w-[624px] rounded-[28px] border border-white/85 bg-[#151515]/98 px-5 py-9 sm:px-[48px] sm:py-11';
const inputClassName =
  'h-14 w-full rounded-xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05))] px-[18px] text-base text-[#FDFEFF] outline-none placeholder:text-white/35 focus:border-[#0EB8D2]';
const labelClassName = 'text-[15px] leading-[1.2] text-white/85';
const secondaryTextClassName = 'text-sm leading-[1.25] text-white/70';
const submitButtonClassName =
  'inline-flex min-h-14 items-center justify-center rounded-full bg-[#0A8EA7] px-6 py-4 text-lg font-semibold text-[#FDFEFF] outline-none transition duration-200 hover:-translate-y-px hover:bg-[#10A7C4] focus-visible:ring-2 focus-visible:ring-[#0EB8D2]/50';
const linkClassName =
  'font-medium underline underline-offset-3 outline-none transition-colors hover:text-[#FDFEFF] focus-visible:ring-2 focus-visible:ring-[#0EB8D2]/50';
const filterControlClassName =
  'flex h-12 items-center justify-between rounded-xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05))] px-4 text-sm text-white/55';

function TelegramCircleIcon({ className = 'h-[60px] w-[60px]' }: { className?: string }) {
  const gradientId = useId();
  const clipId = useId();

  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M30 0C22.0453 0 14.4094 3.16266 8.78906 8.78672C3.16299 14.413 0.00160992 22.0434 0 30C0 37.9533 3.16406 45.5892 8.78906 51.2133C14.4094 56.8373 22.0453 60 30 60C37.9547 60 45.5906 56.8373 51.2109 51.2133C56.8359 45.5892 60 37.9533 60 30C60 22.0467 56.8359 14.4108 51.2109 8.78672C45.5906 3.16266 37.9547 0 30 0Z"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M13.5791 29.6841C22.326 25.8741 28.1572 23.3622 31.0729 22.1485C39.4072 18.683 41.1369 18.0811 42.2666 18.0607C42.5151 18.0567 43.0682 18.1181 43.4291 18.4099C43.7291 18.656 43.8135 18.9888 43.8557 19.2225C43.8932 19.456 43.9447 19.988 43.9026 20.4033C43.4526 25.1471 41.4979 36.6586 40.5041 41.9719C40.0869 44.22 39.2572 44.9738 38.4557 45.0474C36.7119 45.2077 35.3901 43.8961 33.7026 42.7903C31.0635 41.0592 29.5729 39.982 27.0088 38.2931C24.0463 36.3413 25.9682 35.2683 27.6557 33.5152C28.0963 33.0563 35.7744 26.0742 35.9197 25.441C35.9385 25.3617 35.9572 25.0664 35.7791 24.9108C35.6057 24.7547 35.3479 24.8081 35.1604 24.8503C34.8932 24.9103 30.6791 27.6985 22.5041 33.2142C21.3088 34.0364 20.226 34.4372 19.251 34.4161C18.1822 34.3931 16.1197 33.8105 14.5869 33.3127C12.7119 32.7019 11.2166 32.3789 11.3479 31.3416C11.4135 30.8016 12.1588 30.2489 13.5791 29.6841Z"
          fill="#FDFEFF"
        />
      </g>
      <defs>
        <linearGradient id={gradientId} x1="3000" y1="0" x2="3000" y2="6000" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2AABEE" />
          <stop offset="1" stopColor="#229ED9" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function TelegramSmallIcon({ className = 'h-10 w-10' }: { className?: string }) {
  const gradientId = useId();
  const clipId = useId();

  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M20 0C14.6969 0 9.60625 2.10844 5.85938 5.85781C2.10866 9.6087 0.00107328 14.6956 0 20C0 25.3022 2.10938 30.3928 5.85938 34.1422C9.60625 37.8916 14.6969 40 20 40C25.3031 40 30.3937 37.8916 34.1406 34.1422C37.8906 30.3928 40 25.3022 40 20C40 14.6978 37.8906 9.60719 34.1406 5.85781C30.3937 2.10844 25.3031 0 20 0Z"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M9.05145 19.7881C14.8827 17.2481 18.7702 15.5735 20.7139 14.7643C26.2702 12.454 27.4233 12.0528 28.1764 12.0392C28.3421 12.0365 28.7108 12.0775 28.9514 12.272C29.1514 12.4361 29.2077 12.6579 29.2358 12.8137C29.2608 12.9693 29.2952 13.324 29.2671 13.6009C28.9671 16.7634 27.6639 24.4378 27.0014 27.98C26.7233 29.4787 26.1702 29.9812 25.6358 30.0303C24.4733 30.1371 23.5921 29.2628 22.4671 28.5256C20.7077 27.3715 19.7139 26.6534 18.0046 25.5275C16.0296 24.2262 17.3108 23.5109 18.4358 22.3421C18.7296 22.0362 23.8483 17.3815 23.9452 16.9593C23.9577 16.9065 23.9702 16.7096 23.8514 16.6059C23.7358 16.5018 23.5639 16.5375 23.4389 16.5656C23.2608 16.6056 20.4514 18.4643 15.0014 22.1415C14.2046 22.6896 13.4827 22.9568 12.8327 22.9428C12.1202 22.9275 10.7452 22.539 9.72332 22.2071C8.47332 21.8 7.47645 21.5846 7.56395 20.8931C7.6077 20.5331 8.10457 20.1646 9.05145 19.7881Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient id={gradientId} x1="2000" y1="0" x2="2000" y2="4000" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2AABEE" />
          <stop offset="1" stopColor="#229ED9" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SuccessStatusIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.5 20C1.5 9.78389 9.78389 1.5 20 1.5C30.2161 1.5 38.5 9.78389 38.5 20C38.5 30.2161 30.2161 38.5 20 38.5C9.78389 38.5 1.5 30.2161 1.5 20Z"
        fill="#34A853"
        stroke="#34A853"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7773 19.9998L17.944 26.1665L28.2218 15.8887"
        stroke="#FDFEFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorStatusIcon({ className = 'h-[39px] w-[39px]' }: { className?: string }) {
  const maskId = useId();

  return (
    <svg className={className} viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7.41016" y="7.12305" width="25.1608" height="23.9465" fill="#FDFEFF" />
      <mask
        id={maskId}
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="39"
        height="39"
      >
        <path
          d="M1 19.5C1 9.28389 9.28389 1 19.5 1C29.7161 1 38 9.28389 38 19.5C38 29.7161 29.7161 38 19.5 38C9.28389 38 1 29.7161 1 19.5Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5015 19.9897L24.6162 25.1045M19.5015 19.9897L14.3867 14.875M19.5015 19.9897L14.3867 25.1045M19.5015 19.9897L24.6162 14.875"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path d="M-5.16406 -5.16602H44.1693V44.1673H-5.16406V-5.16602Z" fill="#EB4335" />
      </g>
    </svg>
  );
}

function TelegramQrIcon({ className = 'h-[146px] w-[144px]' }: { className?: string }) {
  const clipId = useId();

  return (
    <svg className={className} viewBox="0 0 144 146" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath={`url(#${clipId})`}>
        <path d="M144 0H0V146H144V0Z" fill="#1A1A1A" />
        <path d="M54.6179 10.0693H49.6523V15.1038H54.6179V10.0693Z" fill="#FDFEFF" />
        <path d="M59.5866 10.0693H54.6211V15.1038H59.5866V10.0693Z" fill="#FDFEFF" />
        <path d="M79.446 10.0693H74.4805V15.1038H79.446V10.0693Z" fill="#FDFEFF" />
        <path d="M54.6179 15.1035H49.6523V20.138H54.6179V15.1035Z" fill="#FDFEFF" />
        <path d="M59.5866 15.1035H54.6211V20.138H59.5866V15.1035Z" fill="#FDFEFF" />
        <path d="M64.5515 15.1035H59.5859V20.138H64.5515V15.1035Z" fill="#FDFEFF" />
        <path d="M79.446 15.1035H74.4805V20.138H79.446V15.1035Z" fill="#FDFEFF" />
        <path d="M94.3444 15.1035H89.3789V20.138H94.3444V15.1035Z" fill="#FDFEFF" />
        <path d="M54.6179 20.1387H49.6523V25.1732H54.6179V20.1387Z" fill="#FDFEFF" />
        <path d="M79.446 20.1387H74.4805V25.1732H79.446V20.1387Z" fill="#FDFEFF" />
        <path d="M94.3444 20.1387H89.3789V25.1732H94.3444V20.1387Z" fill="#FDFEFF" />
        <path d="M54.6179 30.207H49.6523V35.2415H54.6179V30.207Z" fill="#FDFEFF" />
        <path d="M69.5163 30.207H64.5508V35.2415H69.5163V30.207Z" fill="#FDFEFF" />
        <path d="M74.4811 30.207H69.5156V35.2415H74.4811V30.207Z" fill="#FDFEFF" />
        <path d="M79.446 30.207H74.4805V35.2415H79.446V30.207Z" fill="#FDFEFF" />
        <path d="M84.4108 30.207H79.4453V35.2415H84.4108V30.207Z" fill="#FDFEFF" />
        <path d="M94.3444 30.207H89.3789V35.2415H94.3444V30.207Z" fill="#FDFEFF" />
        <path d="M69.5163 35.2422H64.5508V40.2767H69.5163V35.2422Z" fill="#FDFEFF" />
        <path d="M84.4108 35.2422H79.4453V40.2767H84.4108V35.2422Z" fill="#FDFEFF" />
        <path d="M54.6179 40.2764H49.6523V45.3109H54.6179V40.2764Z" fill="#FDFEFF" />
        <path d="M64.5515 40.2764H59.5859V45.3109H64.5515V40.2764Z" fill="#FDFEFF" />
        <path d="M74.4811 40.2764H69.5156V45.3109H74.4811V40.2764Z" fill="#FDFEFF" />
        <path d="M84.4108 40.2764H79.4453V45.3109H84.4108V40.2764Z" fill="#FDFEFF" />
        <path d="M94.3444 40.2764H89.3789V45.3109H94.3444V40.2764Z" fill="#FDFEFF" />
        <path d="M59.5866 45.3105H54.6211V50.345H59.5866V45.3105Z" fill="#FDFEFF" />
        <path d="M64.5515 45.3105H59.5859V50.345H64.5515V45.3105Z" fill="#FDFEFF" />
        <path d="M69.5163 45.3105H64.5508V50.345H69.5163V45.3105Z" fill="#FDFEFF" />
        <path d="M79.446 45.3105H74.4805V50.345H79.446V45.3105Z" fill="#FDFEFF" />
        <path d="M94.3444 45.3105H89.3789V50.345H94.3444V45.3105Z" fill="#FDFEFF" />
        <path d="M14.8952 50.3447H9.92969V55.3792H14.8952V50.3447Z" fill="#FDFEFF" />
        <path d="M29.7936 50.3447H24.8281V55.3792H29.7936V50.3447Z" fill="#FDFEFF" />
        <path d="M34.7585 50.3447H29.793V55.3792H34.7585V50.3447Z" fill="#FDFEFF" />
        <path d="M39.7233 50.3447H34.7578V55.3792H39.7233V50.3447Z" fill="#FDFEFF" />
        <path d="M44.6882 50.3447H39.7227V55.3792H44.6882V50.3447Z" fill="#FDFEFF" />
        <path d="M49.653 50.3447H44.6875V55.3792H49.653V50.3447Z" fill="#FDFEFF" />
        <path d="M54.6179 50.3447H49.6523V55.3792H54.6179V50.3447Z" fill="#FDFEFF" />
        <path d="M59.5866 50.3447H54.6211V55.3792H59.5866V50.3447Z" fill="#FDFEFF" />
        <path d="M69.5163 50.3447H64.5508V55.3792H69.5163V50.3447Z" fill="#FDFEFF" />
        <path d="M74.4811 50.3447H69.5156V55.3792H74.4811V50.3447Z" fill="#FDFEFF" />
        <path d="M84.4108 50.3447H79.4453V55.3792H84.4108V50.3447Z" fill="#FDFEFF" />
        <path d="M89.3796 50.3447H84.4141V55.3792H89.3796V50.3447Z" fill="#FDFEFF" />
        <path d="M99.3093 50.3447H94.3438V55.3792H99.3093V50.3447Z" fill="#FDFEFF" />
        <path d="M114.204 50.3447H109.238V55.3792H114.204V50.3447Z" fill="#FDFEFF" />
        <path d="M124.137 50.3447H119.172V55.3792H124.137V50.3447Z" fill="#FDFEFF" />
        <path d="M129.102 50.3447H124.137V55.3792H129.102V50.3447Z" fill="#FDFEFF" />
        <path d="M134.067 50.3447H129.102V55.3792H134.067V50.3447Z" fill="#FDFEFF" />
        <path d="M14.8952 55.3799H9.92969V60.4144H14.8952V55.3799Z" fill="#FDFEFF" />
        <path d="M34.7585 55.3799H29.793V60.4144H34.7585V55.3799Z" fill="#FDFEFF" />
        <path d="M54.6179 55.3799H49.6523V60.4144H54.6179V55.3799Z" fill="#FDFEFF" />
        <path d="M59.5866 55.3799H54.6211V60.4144H59.5866V55.3799Z" fill="#FDFEFF" />
        <path d="M64.5515 55.3799H59.5859V60.4144H64.5515V55.3799Z" fill="#FDFEFF" />
        <path d="M74.4811 55.3799H69.5156V60.4144H74.4811V55.3799Z" fill="#FDFEFF" />
        <path d="M84.4108 55.3799H79.4453V60.4144H84.4108V55.3799Z" fill="#FDFEFF" />
        <path d="M89.3796 55.3799H84.4141V60.4144H89.3796V55.3799Z" fill="#FDFEFF" />
        <path d="M114.204 55.3799H109.238V60.4144H114.204V55.3799Z" fill="#FDFEFF" />
        <path d="M119.173 55.3799H114.207V60.4144H119.173V55.3799Z" fill="#FDFEFF" />
        <path d="M124.137 55.3799H119.172V60.4144H124.137V55.3799Z" fill="#FDFEFF" />
        <path d="M129.102 55.3799H124.137V60.4144H129.102V55.3799Z" fill="#FDFEFF" />
        <path d="M24.8249 60.4141H19.8594V65.4485H24.8249V60.4141Z" fill="#FDFEFF" />
        <path d="M34.7585 60.4141H29.793V65.4485H34.7585V60.4141Z" fill="#FDFEFF" />
        <path d="M44.6882 60.4141H39.7227V65.4485H44.6882V60.4141Z" fill="#FDFEFF" />
        <path d="M49.653 60.4141H44.6875V65.4485H49.653V60.4141Z" fill="#FDFEFF" />
        <path d="M59.5866 60.4141H54.6211V65.4485H59.5866V60.4141Z" fill="#FDFEFF" />
        <path d="M89.3796 60.4141H84.4141V65.4485H89.3796V60.4141Z" fill="#FDFEFF" />
        <path d="M114.204 60.4141H109.238V65.4485H114.204V60.4141Z" fill="#FDFEFF" />
        <path d="M119.173 60.4141H114.207V65.4485H119.173V60.4141Z" fill="#FDFEFF" />
        <path d="M134.067 60.4141H129.102V65.4485H134.067V60.4141Z" fill="#FDFEFF" />
        <path d="M14.8952 65.4482H9.92969V70.4827H14.8952V65.4482Z" fill="#FDFEFF" />
        <path d="M19.86 65.4482H14.8945V70.4827H19.86V65.4482Z" fill="#FDFEFF" />
        <path d="M24.8249 65.4482H19.8594V70.4827H24.8249V65.4482Z" fill="#FDFEFF" />
        <path d="M34.7585 65.4482H29.793V70.4827H34.7585V65.4482Z" fill="#FDFEFF" />
        <path d="M84.4108 65.4482H79.4453V70.4827H84.4108V65.4482Z" fill="#FDFEFF" />
        <path d="M89.3796 65.4482H84.4141V70.4827H89.3796V65.4482Z" fill="#FDFEFF" />
        <path d="M94.3444 65.4482H89.3789V70.4827H94.3444V65.4482Z" fill="#FDFEFF" />
        <path d="M99.3093 65.4482H94.3438V70.4827H99.3093V65.4482Z" fill="#FDFEFF" />
        <path d="M109.239 65.4482H104.273V70.4827H109.239V65.4482Z" fill="#FDFEFF" />
        <path d="M119.173 65.4482H114.207V70.4827H119.173V65.4482Z" fill="#FDFEFF" />
        <path d="M124.137 65.4482H119.172V70.4827H124.137V65.4482Z" fill="#FDFEFF" />
        <path d="M129.102 65.4482H124.137V70.4827H129.102V65.4482Z" fill="#FDFEFF" />
        <path d="M134.067 65.4482H129.102V70.4827H134.067V65.4482Z" fill="#FDFEFF" />
        <path d="M14.8952 70.4834H9.92969V75.5179H14.8952V70.4834Z" fill="#FDFEFF" />
        <path d="M19.86 70.4834H14.8945V75.5179H19.86V70.4834Z" fill="#FDFEFF" />
        <path d="M29.7936 70.4834H24.8281V75.5179H29.7936V70.4834Z" fill="#FDFEFF" />
        <path d="M34.7585 70.4834H29.793V75.5179H34.7585V70.4834Z" fill="#FDFEFF" />
        <path d="M44.6882 70.4834H39.7227V75.5179H44.6882V70.4834Z" fill="#FDFEFF" />
        <path d="M59.5866 70.4834H54.6211V75.5179H59.5866V70.4834Z" fill="#FDFEFF" />
        <path d="M64.5515 70.4834H59.5859V75.5179H64.5515V70.4834Z" fill="#FDFEFF" />
        <path d="M74.4811 70.4834H69.5156V75.5179H74.4811V70.4834Z" fill="#FDFEFF" />
        <path d="M79.446 70.4834H74.4805V75.5179H79.446V70.4834Z" fill="#FDFEFF" />
        <path d="M89.3796 70.4834H84.4141V75.5179H89.3796V70.4834Z" fill="#FDFEFF" />
        <path d="M104.274 70.4834H99.3086V75.5179H104.274V70.4834Z" fill="#FDFEFF" />
        <path d="M134.067 70.4834H129.102V75.5179H134.067V70.4834Z" fill="#FDFEFF" />
        <path d="M14.8952 75.5176H9.92969V80.5521H14.8952V75.5176Z" fill="#FDFEFF" />
        <path d="M29.7936 75.5176H24.8281V80.5521H29.7936V75.5176Z" fill="#FDFEFF" />
        <path d="M49.653 75.5176H44.6875V80.5521H49.653V75.5176Z" fill="#FDFEFF" />
        <path d="M54.6179 75.5176H49.6523V80.5521H54.6179V75.5176Z" fill="#FDFEFF" />
        <path d="M59.5866 75.5176H54.6211V80.5521H59.5866V75.5176Z" fill="#FDFEFF" />
        <path d="M74.4811 75.5176H69.5156V80.5521H74.4811V75.5176Z" fill="#FDFEFF" />
        <path d="M79.446 75.5176H74.4805V80.5521H79.446V75.5176Z" fill="#FDFEFF" />
        <path d="M89.3796 75.5176H84.4141V80.5521H89.3796V75.5176Z" fill="#FDFEFF" />
        <path d="M94.3444 75.5176H89.3789V80.5521H94.3444V75.5176Z" fill="#FDFEFF" />
        <path d="M114.204 75.5176H109.238V80.5521H114.204V75.5176Z" fill="#FDFEFF" />
        <path d="M129.102 75.5176H124.137V80.5521H129.102V75.5176Z" fill="#FDFEFF" />
        <path d="M14.8952 80.5518H9.92969V85.5862H14.8952V80.5518Z" fill="#FDFEFF" />
        <path d="M19.86 80.5518H14.8945V85.5862H19.86V80.5518Z" fill="#FDFEFF" />
        <path d="M24.8249 80.5518H19.8594V85.5862H24.8249V80.5518Z" fill="#FDFEFF" />
        <path d="M39.7233 80.5518H34.7578V85.5862H39.7233V80.5518Z" fill="#FDFEFF" />
        <path d="M44.6882 80.5518H39.7227V85.5862H44.6882V80.5518Z" fill="#FDFEFF" />
        <path d="M49.653 80.5518H44.6875V85.5862H49.653V80.5518Z" fill="#FDFEFF" />
        <path d="M54.6179 80.5518H49.6523V85.5862H54.6179V80.5518Z" fill="#FDFEFF" />
        <path d="M74.4811 80.5518H69.5156V85.5862H74.4811V80.5518Z" fill="#FDFEFF" />
        <path d="M89.3796 80.5518H84.4141V85.5862H89.3796V80.5518Z" fill="#FDFEFF" />
        <path d="M94.3444 80.5518H89.3789V85.5862H94.3444V80.5518Z" fill="#FDFEFF" />
        <path d="M99.3093 80.5518H94.3438V85.5862H99.3093V80.5518Z" fill="#FDFEFF" />
        <path d="M114.204 80.5518H109.238V85.5862H114.204V80.5518Z" fill="#FDFEFF" />
        <path d="M119.173 80.5518H114.207V85.5862H119.173V80.5518Z" fill="#FDFEFF" />
        <path d="M124.137 80.5518H119.172V85.5862H124.137V80.5518Z" fill="#FDFEFF" />
        <path d="M129.102 80.5518H124.137V85.5862H129.102V80.5518Z" fill="#FDFEFF" />
        <path d="M134.067 80.5518H129.102V85.5862H134.067V80.5518Z" fill="#FDFEFF" />
        <path d="M14.8952 85.5869H9.92969V90.6214H14.8952V85.5869Z" fill="#FDFEFF" />
        <path d="M24.8249 85.5869H19.8594V90.6214H24.8249V85.5869Z" fill="#FDFEFF" />
        <path d="M39.7233 85.5869H34.7578V90.6214H39.7233V85.5869Z" fill="#FDFEFF" />
        <path d="M49.653 85.5869H44.6875V90.6214H49.653V85.5869Z" fill="#FDFEFF" />
        <path d="M64.5515 85.5869H59.5859V90.6214H64.5515V85.5869Z" fill="#FDFEFF" />
        <path d="M84.4108 85.5869H79.4453V90.6214H84.4108V85.5869Z" fill="#FDFEFF" />
        <path d="M99.3093 85.5869H94.3438V90.6214H99.3093V85.5869Z" fill="#FDFEFF" />
        <path d="M104.274 85.5869H99.3086V90.6214H104.274V85.5869Z" fill="#FDFEFF" />
        <path d="M109.239 85.5869H104.273V90.6214H109.239V85.5869Z" fill="#FDFEFF" />
        <path d="M119.173 85.5869H114.207V90.6214H119.173V85.5869Z" fill="#FDFEFF" />
        <path d="M124.137 85.5869H119.172V90.6214H124.137V85.5869Z" fill="#FDFEFF" />
        <path d="M134.067 85.5869H129.102V90.6214H134.067V85.5869Z" fill="#FDFEFF" />
        <path d="M14.8952 90.6211H9.92969V95.6556H14.8952V90.6211Z" fill="#FDFEFF" />
        <path d="M29.7936 90.6211H24.8281V95.6556H29.7936V90.6211Z" fill="#FDFEFF" />
        <path d="M34.7585 90.6211H29.793V95.6556H34.7585V90.6211Z" fill="#FDFEFF" />
        <path d="M39.7233 90.6211H34.7578V95.6556H39.7233V90.6211Z" fill="#FDFEFF" />
        <path d="M44.6882 90.6211H39.7227V95.6556H44.6882V90.6211Z" fill="#FDFEFF" />
        <path d="M54.6179 90.6211H49.6523V95.6556H54.6179V90.6211Z" fill="#FDFEFF" />
        <path d="M64.5515 90.6211H59.5859V95.6556H64.5515V90.6211Z" fill="#FDFEFF" />
        <path d="M69.5163 90.6211H64.5508V95.6556H69.5163V90.6211Z" fill="#FDFEFF" />
        <path d="M89.3796 90.6211H84.4141V95.6556H89.3796V90.6211Z" fill="#FDFEFF" />
        <path d="M94.3444 90.6211H89.3789V95.6556H94.3444V90.6211Z" fill="#FDFEFF" />
        <path d="M99.3093 90.6211H94.3438V95.6556H99.3093V90.6211Z" fill="#FDFEFF" />
        <path d="M104.274 90.6211H99.3086V95.6556H104.274V90.6211Z" fill="#FDFEFF" />
        <path d="M109.239 90.6211H104.273V95.6556H109.239V90.6211Z" fill="#FDFEFF" />
        <path d="M114.204 90.6211H109.238V95.6556H114.204V90.6211Z" fill="#FDFEFF" />
        <path d="M124.137 90.6211H119.172V95.6556H124.137V90.6211Z" fill="#FDFEFF" />
        <path d="M129.102 90.6211H124.137V95.6556H129.102V90.6211Z" fill="#FDFEFF" />
        <path d="M54.6179 95.6553H49.6523V100.69H54.6179V95.6553Z" fill="#FDFEFF" />
        <path d="M64.5515 95.6553H59.5859V100.69H64.5515V95.6553Z" fill="#FDFEFF" />
        <path d="M84.4108 95.6553H79.4453V100.69H84.4108V95.6553Z" fill="#FDFEFF" />
        <path d="M89.3796 95.6553H84.4141V100.69H89.3796V95.6553Z" fill="#FDFEFF" />
        <path d="M94.3444 95.6553H89.3789V100.69H94.3444V95.6553Z" fill="#FDFEFF" />
        <path d="M114.204 95.6553H109.238V100.69H114.204V95.6553Z" fill="#FDFEFF" />
        <path d="M124.137 95.6553H119.172V100.69H124.137V95.6553Z" fill="#FDFEFF" />
        <path d="M129.102 95.6553H124.137V100.69H129.102V95.6553Z" fill="#FDFEFF" />
        <path d="M54.6179 100.69H49.6523V105.725H54.6179V100.69Z" fill="#FDFEFF" />
        <path d="M69.5163 100.69H64.5508V105.725H69.5163V100.69Z" fill="#FDFEFF" />
        <path d="M79.446 100.69H74.4805V105.725H79.446V100.69Z" fill="#FDFEFF" />
        <path d="M89.3796 100.69H84.4141V105.725H89.3796V100.69Z" fill="#FDFEFF" />
        <path d="M94.3444 100.69H89.3789V105.725H94.3444V100.69Z" fill="#FDFEFF" />
        <path d="M104.274 100.69H99.3086V105.725H104.274V100.69Z" fill="#FDFEFF" />
        <path d="M114.204 100.69H109.238V105.725H114.204V100.69Z" fill="#FDFEFF" />
        <path d="M134.067 100.69H129.102V105.725H134.067V100.69Z" fill="#FDFEFF" />
        <path d="M54.6179 105.725H49.6523V110.759H54.6179V105.725Z" fill="#FDFEFF" />
        <path d="M59.5866 105.725H54.6211V110.759H59.5866V105.725Z" fill="#FDFEFF" />
        <path d="M64.5515 105.725H59.5859V110.759H64.5515V105.725Z" fill="#FDFEFF" />
        <path d="M69.5163 105.725H64.5508V110.759H69.5163V105.725Z" fill="#FDFEFF" />
        <path d="M79.446 105.725H74.4805V110.759H79.446V105.725Z" fill="#FDFEFF" />
        <path d="M89.3796 105.725H84.4141V110.759H89.3796V105.725Z" fill="#FDFEFF" />
        <path d="M94.3444 105.725H89.3789V110.759H94.3444V105.725Z" fill="#FDFEFF" />
        <path d="M114.204 105.725H109.238V110.759H114.204V105.725Z" fill="#FDFEFF" />
        <path d="M54.6179 110.759H49.6523V115.793H54.6179V110.759Z" fill="#FDFEFF" />
        <path d="M59.5866 110.759H54.6211V115.793H59.5866V110.759Z" fill="#FDFEFF" />
        <path d="M64.5515 110.759H59.5859V115.793H64.5515V110.759Z" fill="#FDFEFF" />
        <path d="M69.5163 110.759H64.5508V115.793H69.5163V110.759Z" fill="#FDFEFF" />
        <path d="M74.4811 110.759H69.5156V115.793H74.4811V110.759Z" fill="#FDFEFF" />
        <path d="M79.446 110.759H74.4805V115.793H79.446V110.759Z" fill="#FDFEFF" />
        <path d="M84.4108 110.759H79.4453V115.793H84.4108V110.759Z" fill="#FDFEFF" />
        <path d="M89.3796 110.759H84.4141V115.793H89.3796V110.759Z" fill="#FDFEFF" />
        <path d="M94.3444 110.759H89.3789V115.793H94.3444V110.759Z" fill="#FDFEFF" />
        <path d="M99.3093 110.759H94.3438V115.793H99.3093V110.759Z" fill="#FDFEFF" />
        <path d="M104.274 110.759H99.3086V115.793H104.274V110.759Z" fill="#FDFEFF" />
        <path d="M109.239 110.759H104.273V115.793H109.239V110.759Z" fill="#FDFEFF" />
        <path d="M114.204 110.759H109.238V115.793H114.204V110.759Z" fill="#FDFEFF" />
        <path d="M54.6179 115.794H49.6523V120.828H54.6179V115.794Z" fill="#FDFEFF" />
        <path d="M59.5866 115.794H54.6211V120.828H59.5866V115.794Z" fill="#FDFEFF" />
        <path d="M64.5515 115.794H59.5859V120.828H64.5515V115.794Z" fill="#FDFEFF" />
        <path d="M69.5163 115.794H64.5508V120.828H69.5163V115.794Z" fill="#FDFEFF" />
        <path d="M79.446 115.794H74.4805V120.828H79.446V115.794Z" fill="#FDFEFF" />
        <path d="M89.3796 115.794H84.4141V120.828H89.3796V115.794Z" fill="#FDFEFF" />
        <path d="M99.3093 115.794H94.3438V120.828H99.3093V115.794Z" fill="#FDFEFF" />
        <path d="M104.274 115.794H99.3086V120.828H104.274V115.794Z" fill="#FDFEFF" />
        <path d="M129.102 115.794H124.137V120.828H129.102V115.794Z" fill="#FDFEFF" />
        <path d="M134.067 115.794H129.102V120.828H134.067V115.794Z" fill="#FDFEFF" />
        <path d="M64.5515 120.828H59.5859V125.863H64.5515V120.828Z" fill="#FDFEFF" />
        <path d="M69.5163 120.828H64.5508V125.863H69.5163V120.828Z" fill="#FDFEFF" />
        <path d="M74.4811 120.828H69.5156V125.863H74.4811V120.828Z" fill="#FDFEFF" />
        <path d="M79.446 120.828H74.4805V125.863H79.446V120.828Z" fill="#FDFEFF" />
        <path d="M94.3444 120.828H89.3789V125.863H94.3444V120.828Z" fill="#FDFEFF" />
        <path d="M99.3093 120.828H94.3438V125.863H99.3093V120.828Z" fill="#FDFEFF" />
        <path d="M114.204 120.828H109.238V125.863H114.204V120.828Z" fill="#FDFEFF" />
        <path d="M119.173 120.828H114.207V125.863H119.173V120.828Z" fill="#FDFEFF" />
        <path d="M124.137 120.828H119.172V125.863H124.137V120.828Z" fill="#FDFEFF" />
        <path d="M129.102 120.828H124.137V125.863H129.102V120.828Z" fill="#FDFEFF" />
        <path d="M134.067 120.828H129.102V125.863H134.067V120.828Z" fill="#FDFEFF" />
        <path d="M59.5866 125.862H54.6211V130.897H59.5866V125.862Z" fill="#FDFEFF" />
        <path d="M74.4811 125.862H69.5156V130.897H74.4811V125.862Z" fill="#FDFEFF" />
        <path d="M84.4108 125.862H79.4453V130.897H84.4108V125.862Z" fill="#FDFEFF" />
        <path d="M104.274 125.862H99.3086V130.897H104.274V125.862Z" fill="#FDFEFF" />
        <path d="M109.239 125.862H104.273V130.897H109.239V125.862Z" fill="#FDFEFF" />
        <path d="M114.204 125.862H109.238V130.897H114.204V125.862Z" fill="#FDFEFF" />
        <path d="M124.137 125.862H119.172V130.897H124.137V125.862Z" fill="#FDFEFF" />
        <path d="M129.102 125.862H124.137V130.897H129.102V125.862Z" fill="#FDFEFF" />
        <path d="M134.067 125.862H129.102V130.897H134.067V125.862Z" fill="#FDFEFF" />
        <path d="M54.6179 130.896H49.6523V135.931H54.6179V130.896Z" fill="#FDFEFF" />
        <path d="M59.5866 130.896H54.6211V135.931H59.5866V130.896Z" fill="#FDFEFF" />
        <path d="M69.5163 130.896H64.5508V135.931H69.5163V130.896Z" fill="#FDFEFF" />
        <path d="M74.4811 130.896H69.5156V135.931H74.4811V130.896Z" fill="#FDFEFF" />
        <path d="M89.3796 130.896H84.4141V135.931H89.3796V130.896Z" fill="#FDFEFF" />
        <path d="M94.3444 130.896H89.3789V135.931H94.3444V130.896Z" fill="#FDFEFF" />
        <path d="M104.274 130.896H99.3086V135.931H104.274V130.896Z" fill="#FDFEFF" />
        <path d="M119.173 130.896H114.207V135.931H119.173V130.896Z" fill="#FDFEFF" />
        <path d="M134.067 130.896H129.102V135.931H134.067V130.896Z" fill="#FDFEFF" />
        <path d="M39.4745 10.0693H15.1435H9.92969V15.3555V40.0245V45.3107H15.1435H39.4745H44.6883V40.0245V15.3555V10.0693H39.4745ZM39.4745 40.0245H15.1435V15.3555H39.4745V40.0245Z" fill="#FDFEFF" />
        <path d="M128.853 10.0693H104.522H99.3086V15.3555V40.0245V45.3107H104.522H128.853H134.067V40.0245V15.3555V10.0693H128.853ZM128.853 40.0245H104.522V15.3555H128.853V40.0245Z" fill="#FDFEFF" />
        <path d="M39.4745 100.69H15.1435H9.92969V105.977V130.646V135.932H15.1435H39.4745H44.6883V130.646V105.977V100.69H39.4745ZM39.4745 130.646H15.1435V105.977H39.4745V130.646Z" fill="#FDFEFF" />
        <path d="M34.7559 20.1387H19.8594V35.2421H34.7559V20.1387Z" fill="#FDFEFF" />
        <path d="M124.135 20.1387H109.238V35.2421H124.135V20.1387Z" fill="#FDFEFF" />
        <path d="M34.7559 110.759H19.8594V125.862H34.7559V110.759Z" fill="#FDFEFF" />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="144" height="146" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute inset-x-[8%] bottom-[-20%] h-[55%] rounded-full bg-[#0EB8D2]/45 blur-[120px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[32%] bg-[linear-gradient(270deg,rgba(14,184,210,0.16),transparent_75%)]" />
    </>
  );
}

function DashboardCard({
  title,
  aside,
  children,
  className = '',
}: {
  title: string;
  aside?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`${cardClassName} p-5 sm:p-6 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-[20px] leading-none font-medium text-white">{title}</h2>
        {aside ? <span className="text-sm text-white/85">{aside}</span> : null}
      </div>
      <div className="mb-4 h-px w-full bg-white/15" />
      {children}
    </section>
  );
}

function PageTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="mb-4 flex items-center gap-4">
        <h1 className="text-[34px] leading-[0.95] font-semibold uppercase sm:text-[56px]">{title}</h1>
        <span className="h-2.5 w-2.5 rounded-full bg-[#0EB8D2]" />
        <span className="hidden h-px w-[160px] bg-[linear-gradient(90deg,#0EB8D2,transparent)] sm:block" />
      </div>

      <p className="max-w-[900px] text-base leading-[1.45] text-white/75 sm:text-[22px]">{description}</p>
    </div>
  );
}

function SupportSection() {
  return (
    <section className="pt-10 sm:pt-16">
      <div className="rounded-[28px] border border-white/85 bg-[linear-gradient(90deg,rgba(14,184,210,0.28),rgba(14,184,210,0.12)_55%,rgba(14,184,210,0.18))] px-5 py-7 sm:px-8 sm:py-9">
        <h2 className="mb-5 text-[28px] leading-[1] font-semibold uppercase text-white sm:text-[44px]">
          Остались вопросы?
        </h2>
        <p className="mb-5 text-base font-semibold leading-[1.4] text-white sm:text-[24px]">
          Напишите в службу поддержки и мы вам поможем
        </p>
        <p className="max-w-[980px] text-base leading-[1.45] text-white/85 sm:text-[20px]">
          В рамках тестового запуска web-версии сервиса для проверки контрагентов все пользователи получают неограниченный
          бесплатный доступ
        </p>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-4 sm:mt-10 sm:flex-row">
        <button className={`${submitButtonClassName} min-w-[260px]`} type="button">
          Написать в поддержку
        </button>
        <button className={`${submitButtonClassName} min-w-[260px]`} type="button">
          Запросить тестовый доступ
        </button>
      </div>
    </section>
  );
}

function PageLayout({ children }: { children: React.ReactNode }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className={pageClassName}>
      <BackgroundDecor />
      <div className="relative z-10 flex min-h-screen flex-col">
        <AppHeader onNotificationsClick={() => setShowNotifications(true)} />
        {children}
        <AppFooter />
      </div>

      {showNotifications && (
        <div
          className="fixed inset-0 z-40 flex items-start justify-center bg-black/40 px-4 py-8 sm:px-6 sm:py-12"
          onClick={() => setShowNotifications(false)}
        >
          <div
            className="mt-12 w-full max-w-[720px] rounded-[28px] border border-white/80 bg-[#151515]/98 p-4 sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="mb-4 flex items-center justify-between gap-4 border-b border-white/15 pb-3">
              <nav className="flex flex-wrap gap-2 text-sm">
                {['Все', 'Финансы', 'Тариф', 'Аккаунт', 'Сервис'].map((label, index) => (
                  <button
                    key={label}
                    className={`rounded-full px-3 py-1.5 ${
                      index === 0 ? 'bg-white text-[#151515]' : 'bg-white/5 text-white/80 hover:bg-white/10'
                    }`}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </nav>
              <button
                className="text-sm font-medium text-white/70 underline underline-offset-4 hover:text-white"
                type="button"
              >
                Очистить
              </button>
            </header>

            <div className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto pr-1">
              {[
                {
                  title: 'Добавлен новый сотрудник: Иванов Иван',
                  category: 'Аккаунт',
                  time: '11 февраля 2026 в 02:49',
                },
                {
                  title: 'Аккаунт user@company.ru заблокирован. Превышен лимит доступных проверок',
                  category: 'Аккаунт',
                  time: '11 февраля 2026 в 02:49',
                },
                {
                  title: 'Тарифный план учетной записи user@company.ru истекает через 3 дня',
                  category: 'Тариф',
                  time: '11 февраля 2026 в 02:49',
                  action: 'Продлить',
                },
                {
                  title: 'Списано 490 ₽ за проверку юр.лица «ООО УМНЫЙ РИТЕЙЛ»',
                  category: 'Финансы',
                  time: '11 февраля 2026 в 02:49',
                },
                {
                  title: 'Баланс успешно пополнен на 10 000 ₽',
                  category: 'Финансы',
                  time: '11 февраля 2026 в 02:49',
                },
                {
                  title: 'Тариф «Индивидуальный» активирован',
                  category: 'Тариф',
                  time: '11 февраля 2026 в 02:49',
                },
                {
                  title: 'Тариф «Индивидуальный» изменен',
                  category: 'Тариф',
                  time: '11 февраля 2026 в 02:49',
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl bg-[#131313] px-4 py-3 text-sm text-white/85 sm:px-5"
                >
                  <div className="mt-1 h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#393939]" />
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
                        {item.category}
                      </span>
                      <p className="m-0 text-[15px] leading-[1.3] text-white">{item.title}</p>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/55">
                      <span>{item.time}</span>
                      {item.action ? (
                        <button
                          className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white hover:bg-white/20"
                          type="button"
                        >
                          {item.action}
                        </button>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-1 flex shrink-0 flex-col items-center gap-3 text-[15px] text-white/65">
                    <button className="hover:text-white" type="button" aria-label="Повторить">
                      ↻
                    </button>
                    <button className="hover:text-white" type="button" aria-label="Удалить">
                      🗑
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CurrentTariffInfoModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-6 sm:px-6 sm:py-10"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[430px] rounded-[28px] border border-white/70 bg-[#151515] px-5 py-5 text-sm text-white/85 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] sm:px-6 sm:py-6"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Закрыть"
          className="absolute right-4 top-4 text-lg text-white/60 transition hover:text-white"
          onClick={onClose}
        >
          ×
        </button>

        <p className="mb-3 text-xs uppercase tracking-[0.12em] text-white/55">
          Текущий тарифный план
        </p>
        <p className="mb-4 text-[15px] leading-snug text-white">
          Ваш тарифный план «Индивидуальный» включает в себя следующие категории:
        </p>

        <ul className="mb-4 space-y-1.5 text-[15px] leading-snug">
          <li className="flex items-center gap-3 text-[#F45353]">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/45 bg-transparent" />
            <span>Упоминания в Telegram</span>
          </li>
          <li className="flex items-center gap-3 text-[#F45353]">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/45 bg-transparent" />
            <span>Упоминания в СМИ</span>
          </li>
          <li className="flex items-center gap-3 text-[#45C857]">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/45 bg-transparent" />
            <span>Все факторы проверок</span>
          </li>
        </ul>

        <p className="text-xs leading-snug text-white/60">
          Подробнее со всеми тарифными планами можно ознакомиться на странице «Тариф».
        </p>
      </div>
    </div>
  );
}

function DashboardPage() {
  const lastRequests = [
    ['23.12.2025', 'Юр.лицо', 'Telegram-бот', 'Успешно'],
    ['23.10.2025', 'Физ.лицо', 'Веб-сервис', 'Ошибка'],
    ['23.09.2025', 'Юр.лицо', 'Telegram-бот', 'Успешно'],
    ['23.09.2024', 'Юр.лицо', 'Веб-сервис', 'Ошибка'],
  ] as const;

  const [showCurrentTariffModal, setShowCurrentTariffModal] = useState(false);

  return (
    <PageLayout>
      <main className={`${containerClassName} pb-10 sm:pb-14`}>
          <div className={`${cardClassName} mb-4 flex items-center gap-3 px-4 py-4 text-sm text-white/90 sm:px-6`}>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#D89B1D] text-[#151515]">
              !
            </span>
            <p className="m-0">
              Тариф заканчивается через 3 дня. Пополните баланс или измените тариф, чтобы избежать отключения от сервиса
              проверки контрагентов «Trust Me».
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.05fr_1.35fr_0.78fr]">
            <DashboardCard title="Новая проверка" className="lg:row-span-1">
              <div className="mb-4 flex flex-col gap-2 text-sm text-white/85">
                <label className="flex items-center gap-2.5">
                  <span className="h-4 w-4 rounded-full border border-white/35 bg-transparent" />
                  Юридическое лицо
                </label>
                <label className="flex items-center gap-2.5">
                  <span className="h-4 w-4 rounded-full border border-white/35 bg-transparent" />
                  Физическое лицо
                </label>
              </div>

              <input className={inputClassName} placeholder="Введите ИНН / ОГРН / ФИО" />

              <button className={`${submitButtonClassName} mt-4 w-full`} type="button">
                Запустить проверку
              </button>

              <p className="mt-4 text-xs leading-[1.45] text-white/65">
                Стоимость проверки будет списана с баланса вашего аккаунта согласно текущему тарифу
              </p>
            </DashboardCard>

            <div className="flex flex-col gap-4">
              <DashboardCard title="Баланс" aside="История операций →">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex min-h-12 min-w-[160px] items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 text-[28px] font-semibold">
                    4 550 ₽
                  </div>
                  <button className={`${submitButtonClassName} min-w-[160px]`} type="button">
                    Пополнить
                  </button>
                </div>
              </DashboardCard>

              <DashboardCard title="Текущий тариф" aside="Что в тарифе ?">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex min-h-12 min-w-[180px] items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 text-lg font-medium">
                    Индивидуальный
                  </div>
                  <button
                    className={`${submitButtonClassName} min-w-[160px]`}
                    type="button"
                    onClick={() => setShowCurrentTariffModal(true)}
                  >
                    Изменить
                  </button>
                </div>
              </DashboardCard>
            </div>

            <DashboardCard title="Telegram-бот" className="lg:row-span-1">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <TelegramCircleIcon />
                </div>
                <p className="mb-5 max-w-[220px] text-sm leading-[1.45] text-white/80">
                  Привяжите Telegram-аккаунт, чтобы все отчёты отображались в одном месте.
                </p>
                <TelegramQrIcon className="h-auto w-[144px] max-w-full" />
              </div>
            </DashboardCard>

            <DashboardCard title="Последние запросы" aside="Вся история запросов →" className="lg:col-span-2">
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
                  <thead className="text-white/60">
                    <tr>
                      <th className="pr-6 font-normal">Дата / Время</th>
                      <th className="pr-6 font-normal">Категория</th>
                      <th className="pr-6 font-normal">Источник проверки</th>
                      <th className="pr-6 font-normal">Статус</th>
                      <th className="font-normal">Отчёт</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastRequests.map(([date, category, source, status]) => (
                      <tr className="border-t border-white/10 text-white/85" key={`${date}-${category}-${source}`}>
                        <td className="pr-6 pt-3">{date}</td>
                        <td className="pr-6 pt-3">{category}</td>
                        <td className="pr-6 pt-3">{source}</td>
                        <td className={`pr-6 pt-3 ${status === 'Ошибка' ? 'text-[#FF7A7A]' : 'text-[#77D877]'}`}>{status}</td>
                        <td className="pt-3">
                          <button className="inline-flex min-h-10 min-w-[112px] items-center justify-center rounded-full border border-white/40 px-4 text-sm text-white transition hover:bg-white/5" type="button">
                            Открыть
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashboardCard>

            <DashboardCard title="Статистика проверок">
              <div className="mb-4 flex justify-end">
                <button className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/25 px-4 text-sm text-white/85" type="button">
                  Сортировать по
                </button>
              </div>

              <div className="mx-auto mb-5 flex h-[170px] w-[170px] items-center justify-center rounded-full border-[10px] border-[#0EB8D2] border-t-white border-r-[#1A1A1A]">
                <span className="text-lg font-medium">Отчёты</span>
              </div>

              <div className="space-y-2 text-sm text-white/80">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full bg-white" />
                    Физическое лицо
                  </span>
                  <span>15 отчётов</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full bg-[#0EB8D2]" />
                    Юридическое лицо
                  </span>
                  <span>75 отчётов</span>
                </div>
              </div>
            </DashboardCard>
          </div>
        {showCurrentTariffModal ? (
          <CurrentTariffInfoModal onClose={() => setShowCurrentTariffModal(false)} />
        ) : null}
      </main>
    </PageLayout>
  );
}

type HistoryItem = {
  type: string;
  name: string;
  dotColor: string;
  document: string;
  birthDate?: string;
  checkedAt: string;
  duration: string;
  source: 'telegram' | 'web';
  success: boolean;
};

type HistoryCategoryFilter = 'all' | 'legal' | 'individual';
type HistorySourceFilter = 'all' | 'telegram' | 'web';
type HistoryStatusFilter = 'all' | 'success' | 'error';

type HistoryFilterPanel = 'period' | 'category' | 'source' | 'status' | null;

function HistoryRequestCard({ item, onOpenReport }: { item: HistoryItem; onOpenReport?: () => void }) {
  return (
    <article className={`${cardClassName} p-4 sm:p-5`}>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="inline-flex min-h-9 items-center rounded-full border border-white/40 px-3 text-sm text-white/85">
            {item.type}
          </span>
          <div className="mt-4 flex items-center gap-2">
            <h3 className="text-[24px] leading-[1.1] font-semibold uppercase text-white sm:text-[30px]">{item.name}</h3>
            <span className={`h-2.5 w-2.5 rounded-full ${item.dotColor}`} />
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-start">
          {item.source === 'telegram' ? (
            <TelegramSmallIcon />
          ) : (
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#151515]">
              web
            </span>
          )}
          {item.success ? <SuccessStatusIcon /> : <ErrorStatusIcon />}
        </div>
      </div>

      <div className="grid gap-4 text-sm text-white/80 sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <p className="mb-2 text-white/45">Документ</p>
          <p className="m-0">{item.document}</p>
        </div>
        {item.birthDate ? (
          <div>
            <p className="mb-2 text-white/45">Дата рождения</p>
            <p className="m-0">{item.birthDate}</p>
          </div>
        ) : null}
        <div>
          <p className="mb-2 text-white/45">Дата и время проверки</p>
          <p className="m-0">{item.checkedAt}</p>
        </div>
        <div>
          <p className="mb-2 text-white/45">Длительность проверки</p>
          <p className="m-0">{item.duration}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className={`${submitButtonClassName} min-w-[196px]`}
            type="button"
            onClick={onOpenReport}
          >
            Открыть отчёт
          </button>
          <button className={`${submitButtonClassName} min-w-[196px]`} type="button">
            Скачать отчёт
          </button>
        </div>

        <button className="text-sm text-white/80 transition-colors hover:text-white" type="button">
          Удалить
        </button>
      </div>
    </article>
  );
}

function ReportContent({ item }: { item: HistoryItem }) {
  return (
    <>
      <header className="border-b border-white/15 bg-[#101010] px-5 pb-4 pt-5 sm:px-7">
        <div className="mb-4 h-10 w-full rounded-[18px] bg-[#1F1F1F]" />
        <p className="text-xs uppercase tracking-[0.12em] text-white/55">Отчёт по организации</p>
        <h2 className="mt-2 text-[22px] leading-tight font-semibold text-white sm:text-[26px]">{item.name}</h2>
      </header>

      <section className="space-y-6 px-5 py-5 sm:px-7 sm:py-6">
        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Основная информация</h3>
          <div className="grid gap-3 text-xs text-white/80 sm:grid-cols-3">
            <div className="space-y-1.5">
              <p className="text-white/45">Статус</p>
              <div className="inline-flex min-h-8 items-center rounded-full bg-[#1E2D21] px-3 text-xs text-[#45C857]">
                Действует
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-white/45">Документ</p>
              <p className="m-0">{item.document}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-white/45">Руководитель</p>
              <p className="m-0">Иванов Иван Иванович</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-white/45">Адрес</p>
              <p className="m-0">г. Москва, ул. Примерная, д. 1</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-white/45">Учредители</p>
              <div className="inline-flex min-h-8 items-center rounded-full border border-white/25 bg-transparent px-3 text-xs">
                Место под кнопку
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Финансовый отчёт</h3>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
            <div className="flex items-center justify-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-[#0EB8D2] border-r-[#2A2A2A] border-t-[#2A2A2A]">
                <span className="text-xs text-white/75">2022 год</span>
              </div>
            </div>
            <div className="space-y-3 text-xs text-white/80">
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
                  <p className="text-white/55">Выручка</p>
                  <p className="mt-1 text-sm font-semibold text-white">68,19 млрд ₽</p>
                  <p className="mt-1 text-[11px] text-[#45C857]">+92,96% к прошлому году</p>
                </div>
                <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
                  <p className="text-white/55">Прибыль</p>
                  <p className="mt-1 text-sm font-semibold text-white">10,69 млрд ₽</p>
                  <p className="mt-1 text-[11px] text-[#45C857]">+11,39% к прошлому году</p>
                </div>
              </div>
              <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
                <p className="text-white/55">Уставной капитал</p>
                <p className="mt-1 text-sm font-semibold text-white">1,1 млн ₽</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Арбитражные суды</h3>
          <div className="grid gap-4 text-xs text-white/80 sm:grid-cols-2">
            <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
              <p className="text-white/55">За последний год</p>
              <p className="mt-1">Исков: 10,02 млн ₽</p>
              <p className="mt-1">Ответчик: 22,65 млн ₽</p>
            </div>
            <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
              <p className="text-white/55">За всё время</p>
              <p className="mt-1">Исков: 44,3 млн ₽</p>
              <p className="mt-1">Ответчик: 36,8 млн ₽</p>
            </div>
          </div>
        </section>

        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Экспресс-отчёт</h3>
          <div className="mb-4 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center rounded-full bg-[#1F1F1F] px-3 py-1 text-white/80">
              Отрицательные факторы: 2
            </span>
            <span className="inline-flex items-center rounded-full bg-[#1F1F1F] px-3 py-1 text-[#45C857]">
              Положительные факторы: 18
            </span>
          </div>
          <div className="space-y-4 text-xs text-white/80">
            <div>
              <p className="mb-3 text-white/55">Отрицательные факторы</p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
                  <p className="text-sm text-white">Исполнительные производства</p>
                  <p className="mt-1 text-white/70">Найдены 39/72 тыс.</p>
                </div>
                <div className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
                  <p className="text-sm text-white">Количество арбитражных дел</p>
                  <p className="mt-1 text-white/70">5,21 млн ₽</p>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-3 text-white/55">Положительные факторы</p>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="rounded-[12px] bg-[#1C1C1C] px-3 py-2">
                    <p className="text-sm text-white">Фактор #{index + 1}</p>
                    <p className="mt-1 text-white/70">Не найдено</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Упоминания в Telegram</h3>
          <div className="space-y-3 text-xs text-white/80">
            {Array.from({ length: 2 }).map((_, index) => (
              <article key={index} className="rounded-[14px] bg-[#1C1C1C] px-3 py-3">
                <div className="mb-2 flex items-center gap-2 text-[11px] text-[#0EB8D2]">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#111111]" />
                  <span>https://t.me/example_{index + 1}</span>
                </div>
                <p className="mb-2 text-[11px] leading-snug text-white/80">
                  Место под текст сообщения с упоминанием компании. Здесь будет отображаться полный текст публикации из Telegram.
                </p>
                <div className="flex items-center justify-between text-[11px] text-white/55">
                  <span>30.07.2024, 15:25</span>
                  <span className="inline-flex h-5 items-center rounded-full border border-white/35 px-2">Кнопка перехода</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Упоминания в СМИ</h3>
          <div className="space-y-3 text-xs text-white/80">
            <article className="rounded-[14px] bg-[#1C1C1C] px-3 py-3">
              <div className="mb-2 flex items-center gap-2 text-[11px] text-[#0EB8D2]">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#111111]" />
                <span>@example_media</span>
              </div>
              <p className="mb-2 text-[11px] leading-snug text-white/80">
                Место под текст публикации в СМИ. Здесь будет отображаться часть статьи c упоминанием компании.
              </p>
              <div className="flex items-center justify-between text-[11px] text-white/55">
                <span>12.10.2025, 07:49</span>
                <span className="inline-flex h-5 items-center rounded-full border border-white/35 px-2">Кнопка перехода</span>
              </div>
            </article>
          </div>
        </section>

        <section className="rounded-[20px] border border-white/15 bg-[#151515] p-4 sm:p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Итоговая оценка</h3>
          <p className="mb-3 text-xs text-white/75">
            На основании проведённого анализа организация имеет низкий уровень риска. Обнаружено 2 отрицательных фактора в 18 положительных показателях.
          </p>
          <div className="inline-flex min-h-9 items-center rounded-full bg-[#1E2D21] px-4 text-xs text-[#45C857]">
            Низкий уровень риска
          </div>
          <p className="mt-4 text-[11px] text-white/50">
            Отчёт сгенерирован: 27.10.2025 09:32. Система анализа юридических лиц «TrustMe».
          </p>
        </section>
      </section>
    </>
  );
}

function HistoryReportModal({ item, onClose }: { item: HistoryItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-3 py-6 sm:px-6 sm:py-10" onClick={onClose}>
      <div
        className="relative flex h-full max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-white/70 bg-[#151515] text-sm text-white/85 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Закрыть"
          className="absolute right-5 top-4 z-10 text-xl text-white/70 transition hover:text-white"
          onClick={onClose}
        >
          ×
        </button>

        <div className="flex-1 overflow-y-auto">
          <ReportContent item={item} />
        </div>
      </div>
    </div>
  );
}

function HistoryPage() {
  const historyItems: HistoryItem[] = [
    {
      type: 'Юридическое лицо',
      name: 'ООО «УМНЫЙ РИТЕЙЛ»',
      dotColor: 'bg-[#F45353]',
      document: 'ИНН: 7711771234',
      checkedAt: '30.01.2025, 19:00',
      duration: '2 минуты',
      source: 'telegram',
      success: true,
    },
    {
      type: 'Физическое лицо',
      name: 'ГОЛЬДМАН РОМАН ГЕННАДЬЕВИЧ',
      dotColor: 'bg-[#45C857]',
      document: 'ИНН: 7711771234',
      birthDate: '09.11.1975',
      checkedAt: '27.10.2025, 09:32',
      duration: '5 минут',
      source: 'telegram',
      success: true,
    },
    {
      type: 'Юридическое лицо',
      name: 'ООО «ТУФЕЛЬКА»',
      dotColor: 'bg-[#E6B344]',
      document: 'ИНН: 8800553535',
      checkedAt: '22.01.2026, 22:44',
      duration: '1 минута',
      source: 'web',
      success: false,
    },
    {
      type: 'Физическое лицо',
      name: 'МИХАЙЛОВ АЛЕКСЕЙ АЛЕКСЕЕВИЧ',
      dotColor: 'bg-[#45C857]',
      document: 'ИНН: 7711881234',
      birthDate: '10.10.1980',
      checkedAt: '28.12.2025, 07:32',
      duration: '3 минуты',
      source: 'web',
      success: true,
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<HistoryCategoryFilter>('all');
  const [sourceFilter, setSourceFilter] = useState<HistorySourceFilter>('all');
  const [statusFilter, setStatusFilter] = useState<HistoryStatusFilter>('all');
  const [sortOrder, setSortOrder] = useState<'new' | 'old'>('new');
  const [openPanel, setOpenPanel] = useState<HistoryFilterPanel>(null);
  const [openedReportItem, setOpenedReportItem] = useState<HistoryItem | null>(null);

  const resetFilters = () => {
    setSearchQuery('');
    setDateFrom('');
    setDateTo('');
    setCategoryFilter('all');
    setSourceFilter('all');
    setStatusFilter('all');
    setSortOrder('new');
    setOpenPanel(null);
  };

  const togglePanel = (panel: HistoryFilterPanel) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  const parseHistoryDate = (value: string) => {
    const [datePart] = value.split(',');
    const parts = datePart.trim().split('.');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts.map((part) => Number(part));
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  };

  const parseInputDate = (value: string) => {
    if (!value) return null;
    const parts = value.split('-').map((part) => Number(part));
    if (parts.length !== 3) return null;
    const [year, month, day] = parts;
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  };

  const fromDate = parseInputDate(dateFrom);
  const toDate = parseInputDate(dateTo);

  const filteredAndSortedItems = historyItems
    .filter((item) => {
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        const haystack = `${item.name} ${item.document}`.toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }

      if (categoryFilter === 'legal' && item.type !== 'Юридическое лицо') {
        return false;
      }
      if (categoryFilter === 'individual' && item.type !== 'Физическое лицо') {
        return false;
      }

      if (sourceFilter !== 'all' && item.source !== sourceFilter) {
        return false;
      }

      if (statusFilter === 'success' && !item.success) {
        return false;
      }
      if (statusFilter === 'error' && item.success) {
        return false;
      }

      const itemDate = parseHistoryDate(item.checkedAt);
      if (itemDate) {
        if (fromDate && itemDate < fromDate) {
          return false;
        }
        if (toDate && itemDate > toDate) {
          return false;
        }
      }

      return true;
    })
    .slice()
    .sort((a, b) => {
      const aDate = parseHistoryDate(a.checkedAt);
      const bDate = parseHistoryDate(b.checkedAt);
      if (!aDate || !bDate) return 0;
      return sortOrder === 'new' ? bDate.getTime() - aDate.getTime() : aDate.getTime() - bDate.getTime();
    });

  const activeChips: Array<{ id: string; label: string; clear: () => void }> = [];

  if (searchQuery.trim()) {
    activeChips.push({
      id: 'search',
      label: `Поиск: «${searchQuery.trim()}»`,
      clear: () => setSearchQuery(''),
    });
  }

  if (dateFrom || dateTo) {
    activeChips.push({
      id: 'period',
      label: `Период: ${dateFrom || '—'} — ${dateTo || '—'}`,
      clear: () => {
        setDateFrom('');
        setDateTo('');
      },
    });
  }

  if (categoryFilter !== 'all') {
    activeChips.push({
      id: 'category',
      label:
        categoryFilter === 'legal'
          ? 'Категория: юридическое лицо'
          : 'Категория: физическое лицо',
      clear: () => setCategoryFilter('all'),
    });
  }

  if (sourceFilter !== 'all') {
    activeChips.push({
      id: 'source',
      label: sourceFilter === 'telegram' ? 'Источник: Telegram-бот' : 'Источник: веб-сервис',
      clear: () => setSourceFilter('all'),
    });
  }

  if (statusFilter !== 'all') {
    activeChips.push({
      id: 'status',
      label: statusFilter === 'success' ? 'Статус: успешно' : 'Статус: ошибка',
      clear: () => setStatusFilter('all'),
    });
  }

  if (sortOrder !== 'new') {
    activeChips.push({
      id: 'sort',
      label: 'Сортировка: сначала старые',
      clear: () => setSortOrder('new'),
    });
  }

  return (
    <PageLayout>
      <main className={`${containerClassName} pb-10 sm:pb-14`}>
        <section className="pt-10 sm:pt-16">
          <PageTitle
            title="История запросов"
            description="Все выполненные проверки из Telegram-бота и веб-сервиса «Trust Me»"
          />

          <div className="mb-4 grid gap-3 lg:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))]">
            <label className={`${filterControlClassName} gap-3`}>
              <span className="text-white/35">⌕</span>
              <input
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                placeholder="Поиск"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </label>
            <button
              className={filterControlClassName}
              type="button"
              onClick={() => togglePanel('period')}
            >
              <span>Период</span>
              <span className="text-white/35">▾</span>
            </button>
            <button
              className={filterControlClassName}
              type="button"
              onClick={() => togglePanel('category')}
            >
              <span>Категория</span>
              <span className="text-white/35">▾</span>
            </button>
            <button
              className={filterControlClassName}
              type="button"
              onClick={() => togglePanel('source')}
            >
              <span>Источник</span>
              <span className="text-white/35">▾</span>
            </button>
            <button
              className={filterControlClassName}
              type="button"
              onClick={() => togglePanel('status')}
            >
              <span>Статус</span>
              <span className="text-white/35">▾</span>
            </button>
          </div>

          {openPanel === 'period' ? (
            <section className={`${cardClassName} mb-5 p-4 sm:p-5`}>
              <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <div className="space-y-2 text-sm text-white/85">
                  <p className="mb-1 text-xs uppercase tracking-[0.12em] text-white/50">Период</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="flex flex-col gap-1">
                      <span className="text-xs text-white/55">c</span>
                      <input
                        className={`${inputClassName} h-10 bg-[#181818]`}
                        type="date"
                        value={dateFrom}
                        onChange={(event) => setDateFrom(event.target.value)}
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-xs text-white/55">по</span>
                      <input
                        className={`${inputClassName} h-10 bg-[#181818]`}
                        type="date"
                        value={dateTo}
                        onChange={(event) => setDateTo(event.target.value)}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-white/85">
                  <p className="mb-1 text-xs uppercase tracking-[0.12em] text-white/50">
                    Сортировка
                  </p>
                  <div className="space-y-2">
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left ${
                        sortOrder === 'new'
                          ? 'bg-white text-[#151515]'
                          : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                      }`}
                      onClick={() => setSortOrder('new')}
                    >
                      <span>Сначала новые</span>
                    </button>
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left ${
                        sortOrder === 'old'
                          ? 'bg-white text-[#151515]'
                          : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                      }`}
                      onClick={() => setSortOrder('old')}
                    >
                      <span>Сначала старые</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {openPanel === 'category' ? (
            <section className={`${cardClassName} mb-5 p-4 sm:p-5`}>
              <p className="mb-3 text-xs uppercase tracking-[0.12em] text-white/50">Категория</p>
              <div className="flex flex-wrap gap-3 text-sm text-white/85">
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    categoryFilter === 'legal'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setCategoryFilter('legal')}
                >
                  Юридическое лицо
                </button>
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    categoryFilter === 'individual'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setCategoryFilter('individual')}
                >
                  Физическое лицо
                </button>
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    categoryFilter === 'all'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setCategoryFilter('all')}
                >
                  Все
                </button>
              </div>
            </section>
          ) : null}

          {openPanel === 'source' ? (
            <section className={`${cardClassName} mb-5 p-4 sm:p-5`}>
              <p className="mb-3 text-xs uppercase tracking-[0.12em] text-white/50">Источник</p>
              <div className="flex flex-wrap gap-3 text-sm text-white/85">
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    sourceFilter === 'telegram'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setSourceFilter('telegram')}
                >
                  Telegram-бот
                </button>
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    sourceFilter === 'web'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setSourceFilter('web')}
                >
                  Веб-сервис
                </button>
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    sourceFilter === 'all'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setSourceFilter('all')}
                >
                  Все
                </button>
              </div>
            </section>
          ) : null}

          {openPanel === 'status' ? (
            <section className={`${cardClassName} mb-5 p-4 sm:p-5`}>
              <p className="mb-3 text-xs uppercase tracking-[0.12em] text-white/50">Статус</p>
              <div className="flex flex-wrap gap-3 text-sm text-white/85">
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    statusFilter === 'success'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setStatusFilter('success')}
                >
                  Успешно
                </button>
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    statusFilter === 'error'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setStatusFilter('error')}
                >
                  Ошибка
                </button>
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    statusFilter === 'all'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setStatusFilter('all')}
                >
                  Все
                </button>
              </div>
            </section>
          ) : null}

          {activeChips.length > 0 ? (
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {activeChips.map((chip) => (
                  <button
                    type="button"
                    key={chip.id}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#181818] px-3 py-1 text-xs text-white/80 hover:bg-[#222222]"
                    onClick={chip.clear}
                  >
                    <span>{chip.label}</span>
                    <span className="text-white/50">×</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-2 text-xs font-medium text-white/75 underline underline-offset-4 hover:text-white"
                onClick={resetFilters}
              >
                Сбросить фильтры
              </button>
            </div>
          ) : null}

          <div className="space-y-4 sm:space-y-5">
            {filteredAndSortedItems.map((item) => (
              <HistoryRequestCard
                item={item}
                key={`${item.name}-${item.checkedAt}`}
                onOpenReport={() => setOpenedReportItem(item)}
              />
            ))}
          </div>

          {openedReportItem ? (
            <HistoryReportModal item={openedReportItem} onClose={() => setOpenedReportItem(null)} />
          ) : null}
        </section>
      </main>
    </PageLayout>
  );
}

function NewCheckPage() {
  const [personType, setPersonType] = useState<'legal' | 'individual'>('legal');
  const [legalQuery, setLegalQuery] = useState('');
  const [fio, setFio] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [individualInn, setIndividualInn] = useState('');

  const [reportState, setReportState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [showInlineReport, setShowInlineReport] = useState(false);

  const reportItem: HistoryItem = personType === 'legal'
    ? {
        type: 'Юридическое лицо',
        name: 'ООО «УМНЫЙ РИТЕЙЛ»',
        dotColor: 'bg-[#45C857]',
        document: 'ИНН: 7811657720',
        checkedAt: '27.10.2025, 09:32',
        duration: 'до 10 минут',
        source: 'web',
        success: reportState !== 'error',
      }
    : {
        type: 'Физическое лицо',
        name: (fio || 'ИВАНОВ ИВАН ИВАНОВИЧ').toUpperCase(),
        dotColor: 'bg-[#45C857]',
        document: `ИНН: ${individualInn || '7711771234'}`,
        birthDate: birthDate ? birthDate.split('-').reverse().join('.') : '09.11.1975',
        checkedAt: '27.10.2025, 09:32',
        duration: 'до 10 минут',
        source: 'web',
        success: reportState !== 'error',
      };

  const canSubmit =
    personType === 'legal'
      ? legalQuery.trim().length > 0
      : fio.trim().length > 0 && birthDate.trim().length > 0 && individualInn.trim().length > 0;

  const handleCheck = () => {
    setShowInlineReport(false);

    if (!canSubmit) {
      setReportState('error');
      return;
    }

    setReportState('loading');
    window.setTimeout(() => {
      setReportState('ready');
    }, 1200);
  };

  return (
    <PageLayout>
      <main className={`${containerClassName} pb-10 sm:pb-14`}>
        <section className="pt-10 sm:pt-16">
          <PageTitle
            title="Новая проверка"
            description="Проверка осуществляется в рамках текущего тарифа. Стоимость проверки будет списана с вашего баланса"
          />

          <div className={`${cardClassName} px-4 py-5 sm:px-6 sm:py-6`}>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <button
                type="button"
                className="inline-flex items-center gap-2.5 text-sm text-white/85"
                onClick={() => setPersonType('legal')}
              >
                <span
                  className={`h-4 w-4 rounded-full border ${
                    personType === 'legal' ? 'border-white bg-white/15' : 'border-white/35 bg-transparent'
                  }`}
                />
                Юридическое лицо
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2.5 text-sm text-white/85"
                onClick={() => setPersonType('individual')}
              >
                <span
                  className={`h-4 w-4 rounded-full border ${
                    personType === 'individual' ? 'border-white bg-white/15' : 'border-white/35 bg-transparent'
                  }`}
                />
                Физическое лицо
              </button>
            </div>

            {personType === 'legal' ? (
              <div className="flex flex-col gap-4 xl:flex-row">
                <label className={`${filterControlClassName} h-14 flex-1 justify-start gap-3 px-4`}>
                  <span className="text-white/35">⌕</span>
                  <input
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                    placeholder="ИНН (ЮЛ, ФЛ) / ОГРН"
                    value={legalQuery}
                    onChange={(event) => setLegalQuery(event.target.value)}
                  />
                </label>

                <button className={`${submitButtonClassName} min-w-[188px]`} type="button" onClick={handleCheck}>
                  Проверить
                </button>
              </div>
            ) : (
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_188px]">
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.12em] text-white/45">ФИО</span>
                  <input className={inputClassName} placeholder="Введите ФИО" value={fio} onChange={(e) => setFio(e.target.value)} />
                </label>
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.12em] text-white/45">Дата рождения</span>
                  <input className={inputClassName} type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                </label>
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.12em] text-white/45">ИНН</span>
                  <input className={inputClassName} placeholder="Введите ИНН" value={individualInn} onChange={(e) => setIndividualInn(e.target.value)} />
                </label>

                <button className={`${submitButtonClassName} h-12 self-end`} type="button" onClick={handleCheck}>
                  Проверить
                </button>
              </div>
            )}

            <button
              className="mt-4 inline-flex items-center gap-2 text-sm text-white/85 transition-colors hover:text-white"
              type="button"
            >
              Подробнее
              <span>▾</span>
            </button>
          </div>
        </section>

        {reportState !== 'idle' ? (
          <section className="pt-4 sm:pt-6">
            <div className={`${cardClassName} px-4 py-6 sm:px-6 sm:py-8`}>
              {reportState === 'loading' ? (
                <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                  <h2 className="text-lg font-semibold text-white">Формируем отчет</h2>
                  <p className="m-0 text-sm text-white/65">Ожидайте, формирование отчета может занять до 10 минут</p>
                  <div className="mt-4 h-10 w-10 rounded-full border-2 border-white/15 border-t-[#0EB8D2]" />
                </div>
              ) : null}

              {reportState === 'ready' ? (
                <div className="flex flex-col items-center justify-center gap-3 py-2 text-center">
                  <h2 className="text-lg font-semibold text-white">Отчет готов</h2>
                  <p className="m-0 text-sm text-white/65">Отчет успешно сформирован. Вы можете посмотреть или скачать его</p>
                  <div className="mt-3 inline-flex min-h-10 min-w-[260px] items-center justify-center rounded-[10px] border border-[#2C6B3B] bg-[#1E2D21] px-4 text-xs font-medium text-[#45C857]">
                    Успешно
                  </div>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button
                      className={`${submitButtonClassName} min-w-[196px]`}
                      type="button"
                      onClick={() => setShowInlineReport(true)}
                    >
                      Открыть отчет
                    </button>
                    <button className={`${submitButtonClassName} min-w-[196px]`} type="button">
                      Скачать отчет
                    </button>
                  </div>
                </div>
              ) : null}

              {reportState === 'error' ? (
                <div className="flex flex-col items-center justify-center gap-3 py-2 text-center">
                  <h2 className="text-lg font-semibold text-white">Ошибка генерации отчета</h2>
                  <p className="m-0 max-w-[520px] text-sm text-white/65">
                    Отчет не удалось сформировать. Вы можете попробовать еще раз или написать в поддержку
                  </p>
                  <div className="mt-3 inline-flex min-h-10 min-w-[260px] items-center justify-center rounded-[10px] border border-[#7A2F2F] bg-[#2A1B1B] px-4 text-xs font-medium text-[#FF7A7A]">
                    Ошибка
                  </div>
                  <p className="mt-4 text-xs text-white/65">
                    Что-то пошло не так?{' '}
                    <button type="button" className="font-medium text-white/85 underline underline-offset-4 hover:text-white">
                      Написать в поддержку
                    </button>
                  </p>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {reportState === 'ready' && showInlineReport ? (
          <section className="pt-6 sm:pt-8">
            <div className={`${cardClassName} overflow-hidden`}>
              <ReportContent item={reportItem} />
            </div>
          </section>
        ) : null}

        <SupportSection />
      </main>
    </PageLayout>
  );
}

type TariffPlan = {
  title: string;
  oldPrice: string;
  price: string;
  per: string;
  features: Array<{ label: string; included: boolean }>;
};

function TariffPlanCard({ plan }: { plan: TariffPlan }) {
  return (
    <article className={`${cardClassName} flex h-full flex-col p-4 sm:p-5`}>
      <h3 className="mb-5 text-[24px] leading-[1.05] font-semibold text-white">{plan.title}</h3>
      <div className="mb-2 flex flex-wrap items-end gap-x-3 gap-y-1">
        <span className="text-[22px] font-semibold text-white/55 line-through sm:text-[34px]">{plan.oldPrice}</span>
        <span className="text-[28px] font-semibold text-white sm:text-[40px]">{plan.price}</span>
        <span className="pb-1 text-lg text-white/90">/ {plan.per}</span>
      </div>
      <p className="mb-4 text-sm text-white/70">15% скидка новому пользователю</p>
      <div className="mb-5 h-px w-full bg-white/15" />

      <div className="mb-8 space-y-3 text-sm text-white/85">
        {plan.features.map((feature) => (
          <div className="flex items-center gap-3" key={feature.label}>
            <span className={`text-[18px] ${feature.included ? 'text-[#0EB8D2]' : 'text-white/65'}`}>
              {feature.included ? '✓' : '⌂'}
            </span>
            <span>{feature.label}</span>
          </div>
        ))}
      </div>

      <button className={`${submitButtonClassName} mt-auto w-full`} type="button">
        Выбрать
      </button>
    </article>
  );
}

function TariffPage() {
  const plans: TariffPlan[] = [
    {
      title: 'Базовый тариф',
      oldPrice: '4500 ₽',
      price: '3900 ₽',
      per: 'месяц',
      features: [
        { label: 'Скоринг', included: true },
        { label: 'Безлимит на количество запросов', included: true },
        { label: 'Одна учетная запись', included: true },
        { label: 'Упоминания в СМИ', included: false },
        { label: 'Упоминания в Telegram', included: false },
      ],
    },
    {
      title: 'Профессиональный тариф',
      oldPrice: '6800 ₽',
      price: '5900 ₽',
      per: 'месяц',
      features: [
        { label: 'Скоринг', included: true },
        { label: 'Упоминания в СМИ', included: true },
        { label: 'Упоминания в Telegram', included: true },
        { label: 'Безлимит на количество запросов', included: true },
        { label: 'Одна учетная запись', included: true },
      ],
    },
    {
      title: 'Корпоративный тариф',
      oldPrice: '8000 ₽',
      price: '6900 ₽',
      per: 'месяц',
      features: [
        { label: 'Скоринг', included: true },
        { label: 'Упоминания в СМИ', included: true },
        { label: 'Упоминания в Telegram', included: true },
        { label: 'Безлимит на количество запросов', included: true },
        { label: 'Несколько учетных записей', included: true },
      ],
    },
  ];

  const durationButtons = ['24 часа', '7 дней', '1 месяц', '3 месяца', '6 месяцев', '12 месяцев'];

  const [showCurrentTariffModal, setShowCurrentTariffModal] = useState(false);

  return (
    <PageLayout>
      <main className={`${containerClassName} pb-10 sm:pb-14`}>
        <section className="pt-10 sm:pt-16">
          <PageTitle title="Тариф" description="Управляйте тарифом аккаунта" />

          <div className={`${cardClassName} mb-4 flex items-center gap-3 px-4 py-4 text-sm text-white/90 sm:px-6`}>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#D89B1D] text-[#151515]">
              !
            </span>
            <p className="m-0">
              Тариф заканчивается через 3 дня. Пополните баланс или измените тариф, чтобы избежать отключения от сервиса
              проверки контрагентов «Trust Me».
            </p>
          </div>

          <section className={`${cardClassName} p-4 sm:p-6`}>
            <h2 className="mb-4 text-[24px] font-semibold text-white">Текущий тариф</h2>
            <div className="mb-6 h-px w-full bg-white/15" />
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-[34px] leading-[0.95] font-semibold uppercase text-white sm:text-[56px]">
                  Индивидуальный
                </div>
                <p className="mt-3 text-sm text-white/70">
                  Списания с баланса аккаунта совершаются согласно текущему тарифу
                </p>
              </div>
              <button
                className={`${submitButtonClassName} min-w-[180px]`}
                type="button"
                onClick={() => setShowCurrentTariffModal(true)}
              >
                Изменить тариф
              </button>
            </div>
          </section>

          {showCurrentTariffModal ? (
            <div
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-6 sm:px-6 sm:py-10"
              onClick={() => setShowCurrentTariffModal(false)}
            >
              <div
                className="relative w-full max-w-[430px] rounded-[28px] border border-white/70 bg-[#151515] px-5 py-5 text-sm text-white/85 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] sm:px-6 sm:py-6"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  aria-label="Закрыть"
                  className="absolute right-4 top-4 text-lg text-white/60 transition hover:text-white"
                  onClick={() => setShowCurrentTariffModal(false)}
                >
                  ×
                </button>

                <p className="mb-3 text-xs uppercase tracking-[0.12em] text-white/55">
                  Текущий тарифный план
                </p>
                <p className="mb-4 text-[15px] leading-snug text-white">
                  Ваш тарифный план «Индивидуальный» включает в себя следующие категории:
                </p>

                <ul className="mb-4 space-y-1.5 text-[15px] leading-snug">
                  <li className="flex items-center gap-3 text-[#F45353]">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/45 bg-transparent" />
                    <span>Упоминания в Telegram</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#F45353]">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/45 bg-transparent" />
                    <span>Упоминания в СМИ</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#45C857]">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/45 bg-transparent" />
                    <span>Все факторы проверок</span>
                  </li>
                </ul>

                <p className="text-xs leading-snug text-white/60">
                  Подробнее со всеми тарифными планами можно ознакомиться на странице «Тариф».
                </p>
              </div>
            </div>
          ) : null}
        </section>

        <section className="pt-14 sm:pt-20">
          <PageTitle title="Оформление подписки" description="Выберите подходящий для вас тарифный план" />
          <div className="grid gap-4 xl:grid-cols-3">
            {plans.map((plan) => (
              <TariffPlanCard key={plan.title} plan={plan} />
            ))}
          </div>
        </section>

        <section className="pt-14 sm:pt-20">
          <PageTitle
            title="Индивидуальный тариф"
            description="Настройте индивидуальный тариф под задачи вашего бизнеса и узнайте стоимость мгновенно"
          />

          <div className="grid gap-4 xl:grid-cols-[1.55fr_0.75fr]">
            <section className={`${cardClassName} p-4 sm:p-6`}>
              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-[24px] font-semibold text-white">Функциональные модули тарифа</h2>
                  <div className="space-y-3 text-sm text-white/85">
                    {['Скоринг', 'Упоминания в СМИ', 'Упоминания в Telegram'].map((label) => (
                      <label className="flex items-center gap-3" key={label}>
                        <span className="h-4 w-4 rounded-[4px] border border-white/35 bg-transparent" />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-[24px] font-semibold text-white">Длительность тарифа</h2>
                  <div className="flex flex-wrap gap-2">
                    {durationButtons.map((label, index) => (
                      <button
                        className={`rounded-[8px] border px-3 py-2 text-sm transition ${
                          index === 1
                            ? 'border-white bg-white text-[#151515]'
                            : 'border-white/35 bg-transparent text-white/85 hover:bg-white/5'
                        }`}
                        key={label}
                        type="button"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-[24px] font-semibold text-white">Учетные записи</h2>
                  <div className="inline-flex items-center overflow-hidden rounded-[8px] border border-white/20">
                    <button className="h-9 w-9 bg-white/5 text-white/85" type="button">
                      -
                    </button>
                    <span className="inline-flex h-9 min-w-10 items-center justify-center bg-transparent px-3 text-white">
                      1
                    </span>
                    <button className="h-9 w-9 bg-white/5 text-white/85" type="button">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className={`${cardClassName} p-4 sm:p-6`}>
              <h2 className="mb-5 text-[24px] font-semibold text-white">Расчет стоимости тарифа</h2>
              <div className="space-y-4 text-sm text-white/85">
                {['Скоринг', 'Упоминания в СМИ', 'Упоминания в Telegram', '7 дней', '2 учетные записи'].map((item) => (
                  <div className="flex items-center gap-3" key={item}>
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0EB8D2] text-[12px] text-white">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="mb-4 text-[22px] font-semibold text-white sm:text-[30px]">Итоговая сумма тарифа:</p>
                <div className="text-[34px] font-semibold text-white sm:text-[52px]">4900 ₽</div>
              </div>

              <button className={`${submitButtonClassName} mt-8 w-full`} type="button">
                Продолжить
              </button>
            </section>
          </div>
        </section>

        <SupportSection />
      </main>
    </PageLayout>
  );
}

type SettingsTab = 'profile' | 'security' | 'tariff';

function SettingsSidebarButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`relative flex w-full items-center rounded-[14px] px-4 py-3 text-left text-[18px] transition ${
        isActive ? 'bg-white/7 text-white' : 'text-white/85 hover:bg-white/4'
      }`}
      onClick={onClick}
      type="button"
    >
      <span className="mr-3 text-white/85">{isActive ? '◉' : '◌'}</span>
      <span>{label}</span>
      {isActive ? <span className="absolute top-3 bottom-3 right-0 w-1 rounded-full bg-[#0EB8D2]" /> : null}
    </button>
  );
}

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      aria-pressed={checked}
      className={`relative inline-flex h-8 w-14 items-center rounded-full border transition ${
        checked ? 'border-[#0EB8D2] bg-[#0EB8D2]' : 'border-white/20 bg-white/10'
      }`}
      onClick={onChange}
      type="button"
    >
      <span
        className={`inline-block h-6 w-6 rounded-full bg-white transition-transform ${checked ? 'translate-x-7' : 'translate-x-1'}`}
      />
    </button>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${cardClassName} p-4 sm:p-6`}>
      <h2 className="mb-4 text-[24px] font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [email2faEnabled, setEmail2faEnabled] = useState(false);
  const [factorsEnabled, setFactorsEnabled] = useState(true);
  const [mentionsMediaEnabled, setMentionsMediaEnabled] = useState(false);
  const [mentionsTelegramEnabled, setMentionsTelegramEnabled] = useState(false);

  const personalizationFactors = [
    'Розыск МВД',
    'Банкротство',
    'Налоговая задолженность',
    'Приостановка счетов',
    'Спонсор ФБК',
    'Реестр коррупционеров',
    'Обременения',
    'Торги',
    'Перечень террористов и экстремистов',
    'Реестр иностранных агентов',
    'Реестр дисквалифицированных лиц',
    'Организация в реестре недобросовестных поставщиков',
    'Реестр субсидиарных ответчиков',
    'Задолженность перед ФССП',
  ];

  return (
    <PageLayout>
      <main className={`${containerClassName} pb-10 sm:pb-14`}>
        <section className="pt-10 sm:pt-16">
          <PageTitle title="Настройки аккаунта" description="Управляйте настройками аккаунта" />

          <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
            <aside className={`${cardClassName} h-fit p-3`}>
              <div className="space-y-2">
                <SettingsSidebarButton
                  isActive={activeTab === 'profile'}
                  label="Профиль"
                  onClick={() => setActiveTab('profile')}
                />
                <SettingsSidebarButton
                  isActive={activeTab === 'security'}
                  label="Безопасность и вход"
                  onClick={() => setActiveTab('security')}
                />
                <SettingsSidebarButton
                  isActive={activeTab === 'tariff'}
                  label="Персонализация тарифа"
                  onClick={() => setActiveTab('tariff')}
                />
              </div>
            </aside>

            <div className="space-y-4">
              {activeTab === 'profile' ? (
                <SettingsSection title="Основная информация">
                  <div className="grid gap-6 lg:grid-cols-[160px_1fr]">
                    <div className="flex flex-col items-center">
                      <div className="mb-4 flex h-[140px] w-[140px] items-center justify-center overflow-hidden rounded-full text-[32px] font-semibold text-[#151515]">
                        <img src="/user.png" alt="Аватар пользователя" />
                      </div>
                      <button className="text-lg font-medium text-white transition-colors hover:text-[#0EB8D2]" type="button">
                        Изменить фото
                      </button>
                    </div>

                    <div>
                      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                        <label className="flex items-center gap-2.5 text-sm text-white/85">
                          <span className="h-4 w-4 rounded-full border border-white/35 bg-transparent" />
                          Юридическое лицо
                        </label>
                        <label className="flex items-center gap-2.5 text-sm text-white">
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#0EB8D2]">
                            <span className="h-2 w-2 rounded-full bg-[#0EB8D2]" />
                          </span>
                          Физическое лицо
                        </label>
                      </div>

                      <div className="space-y-4">
                        <label className="flex flex-col gap-2.5">
                          <span className={labelClassName}>Никнейм</span>
                          <input className={inputClassName} defaultValue="user.example@gmail.com" />
                        </label>

                        <label className="flex flex-col gap-2.5">
                          <span className={labelClassName}>Текущая почта</span>
                          <input className={inputClassName} defaultValue="user.example@gmail.com" />
                        </label>

                        <label className="flex items-start gap-3 text-sm text-white/75">
                          <span className="mt-0.5 h-4 w-4 rounded-[4px] border border-white/35 bg-transparent" />
                          <span>Я даю согласие на получение рекламных материалов на указанный адрес электронной почты</span>
                        </label>

                        <button className="inline-flex items-center gap-2 text-sm text-white/85 transition-colors hover:text-white" type="button">
                          Подробнее
                          <span>▾</span>
                        </button>

                        <div className="flex justify-end">
                          <button className={`${submitButtonClassName} min-w-[260px]`} type="button">
                            Сохранить изменения
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SettingsSection>
              ) : null}

              {activeTab === 'security' ? (
                <>
                  <SettingsSection title="Смена пароля">
                    <div className="space-y-4">
                      <label className="flex flex-col gap-2.5">
                        <span className={labelClassName}>Текущий пароль</span>
                        <input className={inputClassName} placeholder="Введите пароль" type="password" />
                      </label>

                      <label className="flex flex-col gap-2.5">
                        <span className={labelClassName}>Новый пароль</span>
                        <input className={inputClassName} placeholder="Введите пароль" type="password" />
                      </label>

                      <div className="space-y-1.5 text-sm text-white/70">
                        <div className="flex items-center gap-2.5">
                          <span className="h-[14px] w-[14px] rounded-full bg-white/85" />
                          <span>Не менее 8 символов</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="h-[14px] w-[14px] rounded-full bg-white/85" />
                          <span>Минимум одна заглавная и одна строчная буква</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="h-[14px] w-[14px] rounded-full bg-white/85" />
                          <span>Минимум одна цифра</span>
                        </div>
                      </div>

                      <label className="flex flex-col gap-2.5">
                        <span className={labelClassName}>Подтверждение нового пароля</span>
                        <input className={inputClassName} placeholder="Подтвердите новый пароль" type="password" />
                      </label>

                      <div className="rounded-xl border border-[#0EB8D2]/90 bg-white/[0.03] px-4 py-4 text-base leading-[1.45] text-white/85">
                        <p className="m-0">Если вы не помните текущий пароль, то воспользуйтесь сбросом пароля.</p>
                        <button className="mt-2 text-base font-medium underline underline-offset-4" type="button">
                          Сбросить пароль
                        </button>
                      </div>

                      <button className={`${submitButtonClassName} min-w-[240px]`} type="button">
                        Сменить пароль
                      </button>
                    </div>
                  </SettingsSection>

                  <SettingsSection title="Электронная почта">
                    <div className="space-y-5">
                      <label className="flex flex-col gap-2.5">
                        <span className={labelClassName}>Текущая почта</span>
                        <input className={inputClassName} defaultValue="user.example@gmail.com" />
                      </label>

                      <div className="flex flex-col gap-4 sm:flex-row">
                        <button className={`${submitButtonClassName} min-w-[250px]`} type="button">
                          Добавить почту
                        </button>
                        <button className="inline-flex min-h-14 min-w-[250px] items-center justify-center rounded-full border border-white/55 px-6 py-4 text-lg font-semibold text-white transition hover:bg-white/5" type="button">
                          Удалить почту
                        </button>
                      </div>
                    </div>
                  </SettingsSection>

                  <SettingsSection title="Номер телефона">
                    <div className="space-y-5">
                      <label className="flex flex-col gap-2.5">
                        <span className={labelClassName}>Привязанный номер телефона</span>
                        <input className={inputClassName} defaultValue="+7 (800) 555 35 35" />
                      </label>

                      <div className="flex flex-col gap-4 sm:flex-row">
                        <button className={`${submitButtonClassName} min-w-[290px]`} type="button">
                          Добавить номер телефона
                        </button>
                        <button className="inline-flex min-h-14 min-w-[290px] items-center justify-center rounded-full border border-white/55 px-6 py-4 text-lg font-semibold text-white transition hover:bg-white/5" type="button">
                          Удалить номер телефона
                        </button>
                      </div>
                    </div>
                  </SettingsSection>

                  <SettingsSection title="Двухфакторная аутентификация (2FA)">
                    <div className="space-y-8">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="m-0 text-base text-white/80">
                            Двухфакторная аутентификация (2FA) обеспечит более надежную защиту вашего аккаунта
                          </p>
                        </div>
                        <ToggleSwitch checked={twoFactorEnabled} onChange={() => setTwoFactorEnabled((value) => !value)} />
                      </div>

                      <div className="flex items-start justify-between gap-4 border-t border-white/10 pt-6">
                        <div>
                          <h3 className="mb-2 text-[24px] font-semibold text-white">Электронная почта</h3>
                          <p className="m-0 text-base text-white/80">
                            Использовать электронную почту для двухфакторной аутентификации
                          </p>
                        </div>
                        <ToggleSwitch checked={email2faEnabled} onChange={() => setEmail2faEnabled((value) => !value)} />
                      </div>
                    </div>
                  </SettingsSection>

                  <SettingsSection title="Связанные аккаунты">
                    <div className="rounded-[20px] border border-white/10 bg-white/[0.08] p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <TelegramSmallIcon />
                          <div>
                            <div className="text-[20px] font-semibold text-white">Telegram</div>
                            <div className="text-sm text-white/70">@llllllllkk_01</div>
                          </div>
                        </div>

                        <button className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#F8E9E6] px-5 text-base font-semibold text-[#D66D63]" type="button">
                          Отвязать
                        </button>
                      </div>
                    </div>
                  </SettingsSection>

                  <SettingsSection title="Удалить аккаунт">
                    <button className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/55 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/5" type="button">
                      Удалить аккаунт
                    </button>
                  </SettingsSection>
                </>
              ) : null}

              {activeTab === 'tariff' ? (
                <SettingsSection title="Настроить текущий тариф: Индивидуальный">
                  <div className="space-y-6">
                    <p className="max-w-[820px] text-base leading-[1.45] text-white/80">
                      Вы можете дополнительно отредактировать текущий тариф, исключив модули проверки, для корректного
                      отображения итогового отчета
                    </p>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="mb-2 text-[24px] font-semibold text-white">Факторы проверки</h3>
                        <p className="m-0 text-base text-white/75">Исключите или добавьте факторы проверки в отчет</p>
                      </div>
                      <ToggleSwitch checked={factorsEnabled} onChange={() => setFactorsEnabled((value) => !value)} />
                    </div>

                    <button className="inline-flex items-center gap-2 text-base text-white/85 transition-colors hover:text-white" type="button">
                      Подробнее
                      <span>▴</span>
                    </button>

                    <div className="grid gap-3 text-base text-white/80 sm:grid-cols-2">
                      {personalizationFactors.map((factor) => (
                        <label className="flex items-center gap-3" key={factor}>
                          <span className="h-4 w-4 rounded-[4px] border border-white/35 bg-transparent" />
                          <span>{factor}</span>
                        </label>
                      ))}
                    </div>

                    <div className="space-y-5 border-t border-white/10 pt-6">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[22px] font-semibold text-white">Упоминания в СМИ</span>
                        <ToggleSwitch
                          checked={mentionsMediaEnabled}
                          onChange={() => setMentionsMediaEnabled((value) => !value)}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[22px] font-semibold text-white">Упоминания в Telegram</span>
                        <ToggleSwitch
                          checked={mentionsTelegramEnabled}
                          onChange={() => setMentionsTelegramEnabled((value) => !value)}
                        />
                      </div>
                    </div>
                  </div>
                </SettingsSection>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}

type BalanceOperation = {
  date: string;
  type: 'Поступление' | 'Списание';
  source: 'telegram' | 'web';
  amount: string;
};

type BalanceTypeFilter = 'all' | 'income' | 'expense';
type BalanceSourceFilter = 'all' | 'telegram' | 'web';
type BalanceFilterPanel = 'period' | 'type' | 'source' | null;

type TopUpStep = 'form' | 'waiting' | 'processing';

function BalanceTopUpModal({
  step,
  amount,
  onAmountChange,
  onChipSelect,
  onContinue,
  onClose,
}: {
  step: TopUpStep;
  amount: string;
  onAmountChange: (value: string) => void;
  onChipSelect: (value: number) => void;
  onContinue: () => void;
  onClose: () => void;
}) {
  const numericAmount = Number(amount.replace(/\s/g, ''));
  const isAmountValid = numericAmount >= 100 && numericAmount <= 100000;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-6 sm:px-6 sm:py-10"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[460px] rounded-[28px] border border-white/65 bg-[#151515] px-5 py-6 text-sm text-white/85 shadow-[0_0_0_1px_rgba(255,255,255,0.18)] sm:px-7 sm:py-7"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Закрыть"
          className="absolute right-5 top-5 text-lg text-white/65 transition hover:text-white"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="mb-2 text-center text-[20px] font-semibold text-white sm:text-[22px]">
          Пополнение баланса
        </h2>
        <p className="mb-5 text-center text-xs text-white/70">
          Ожидайте, идет пополнение баланса
        </p>

        {step === 'form' ? (
          <div className="space-y-5 pt-1">
            <p className="text-center text-xs text-white/70">
              Выберите нужную сумму или введите ее вручную
            </p>
            <input
              className={`${inputClassName} h-11 text-center`}
              placeholder="Введите сумму от 100 до 100 000"
              value={amount}
              onChange={(event) => onAmountChange(event.target.value)}
            />
            <div className="grid grid-cols-3 gap-2 text-xs sm:grid-cols-4">
              {[300, 500, 1000, 2000, 5000, 10000, 20000].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`h-9 rounded-[999px] border px-2 ${
                    numericAmount === value
                      ? 'border-white bg-white text-[#151515]'
                      : 'border-white/35 bg-[#181818] text-white/85 hover:bg-[#212121]'
                  }`}
                  onClick={() => onChipSelect(value)}
                >
                  {value.toLocaleString('ru-RU')} ₽
                </button>
              ))}
            </div>

            <button
              type="button"
              className={`${submitButtonClassName} mt-2 w-full`}
              onClick={onContinue}
              disabled={!isAmountValid}
            >
              Продолжить
            </button>
          </div>
        ) : null}

        {step === 'waiting' ? (
          <div className="flex flex-col items-center justify-center gap-4 pt-4 pb-2 text-center">
            <div className="mt-2 h-10 w-10 rounded-full border-2 border-white/20 border-t-[#0EB8D2]" />
          </div>
        ) : null}

        {step === 'processing' ? (
          <div className="mt-4 rounded-[14px] border border-white/30 bg-[#181818] px-4 py-3 text-xs text-white/80">
            <p className="mb-1">
              Сумма:{' '}
              <span className="font-semibold">
                {isNaN(numericAmount) ? '—' : `${numericAmount.toLocaleString('ru-RU')} ₽`}
              </span>
            </p>
            <p className="m-0">
              Чек об оплате вышлем на почту: <span className="font-semibold">user.example@gmail.com</span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function BalancePage() {
  const operations: BalanceOperation[] = [
    { date: '23.12.2025', type: 'Поступление', source: 'telegram', amount: '1000 ₽' },
    { date: '23.10.2025', type: 'Поступление', source: 'web', amount: '2000 ₽' },
    { date: '23.09.2025', type: 'Списание', source: 'telegram', amount: '1000 ₽' },
    { date: '23.09.2024', type: 'Списание', source: 'web', amount: '2000 ₽' },
  ];

  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('300');
  const [topUpStep, setTopUpStep] = useState<TopUpStep>('form');

  const [balanceDateFrom, setBalanceDateFrom] = useState('');
  const [balanceDateTo, setBalanceDateTo] = useState('');
  const [balanceTypeFilter, setBalanceTypeFilter] = useState<BalanceTypeFilter>('all');
  const [balanceSourceFilter, setBalanceSourceFilter] = useState<BalanceSourceFilter>('all');
  const [balanceOpenPanel, setBalanceOpenPanel] = useState<BalanceFilterPanel>(null);

  const handleOpenTopUp = () => {
    setTopUpStep('form');
    setShowTopUpModal(true);
  };

  const handleCloseTopUp = () => {
    setShowTopUpModal(false);
  };

  const handleTopUpContinue = () => {
    const numericAmount = Number(topUpAmount.replace(/\s/g, ''));
    if (!numericAmount || numericAmount < 100 || numericAmount > 100000) {
      return;
    }
    setTopUpStep('waiting');
    window.setTimeout(() => {
      setTopUpStep('processing');
    }, 1200);
  };

  const toggleBalancePanel = (panel: BalanceFilterPanel) => {
    setBalanceOpenPanel((current) => (current === panel ? null : panel));
  };

  const resetBalanceFilters = () => {
    setBalanceDateFrom('');
    setBalanceDateTo('');
    setBalanceTypeFilter('all');
    setBalanceSourceFilter('all');
    setBalanceOpenPanel(null);
  };

  const parseBalanceDate = (value: string) => {
    const parts = value.split('.').map((part) => Number(part));
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  };

  const parseBalanceInputDate = (value: string) => {
    if (!value) return null;
    const parts = value.split('-').map((part) => Number(part));
    if (parts.length !== 3) return null;
    const [year, month, day] = parts;
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  };

  const balanceFromDate = parseBalanceInputDate(balanceDateFrom);
  const balanceToDate = parseBalanceInputDate(balanceDateTo);

  const filteredOperations = operations.filter((operation) => {
    const opDate = parseBalanceDate(operation.date);
    if (opDate) {
      if (balanceFromDate && opDate < balanceFromDate) return false;
      if (balanceToDate && opDate > balanceToDate) return false;
    }

    if (balanceTypeFilter === 'income' && operation.type !== 'Поступление') return false;
    if (balanceTypeFilter === 'expense' && operation.type !== 'Списание') return false;

    if (balanceSourceFilter !== 'all' && operation.source !== balanceSourceFilter) return false;

    return true;
  });

  const balanceChips: Array<{ id: string; label: string; clear: () => void }> = [];

  if (balanceDateFrom || balanceDateTo) {
    balanceChips.push({
      id: 'period',
      label: `Период: ${balanceDateFrom || '—'} — ${balanceDateTo || '—'}`,
      clear: () => {
        setBalanceDateFrom('');
        setBalanceDateTo('');
      },
    });
  }

  if (balanceTypeFilter !== 'all') {
    balanceChips.push({
      id: 'type',
      label:
        balanceTypeFilter === 'income'
          ? 'Тип: поступления'
          : 'Тип: списания',
      clear: () => setBalanceTypeFilter('all'),
    });
  }

  if (balanceSourceFilter !== 'all') {
    balanceChips.push({
      id: 'source',
      label: balanceSourceFilter === 'telegram' ? 'Источник: Telegram-бот' : 'Источник: веб-сервис',
      clear: () => setBalanceSourceFilter('all'),
    });
  }

  return (
    <PageLayout>
      <main className={`${containerClassName} pb-10 sm:pb-14`}>
        <section className="pt-10 sm:pt-16">
          <PageTitle
            title="Баланс"
            description="Управляйте балансом аккаунта и отслеживайте историю финансовых операций"
          />

          <section className={`${cardClassName} p-4 sm:p-6`}>
            <h2 className="mb-4 text-[24px] font-semibold text-white">Текущий баланс</h2>
            <div className="mb-6 h-px w-full bg-white/15" />

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3 text-[34px] leading-[0.95] font-semibold text-white sm:text-[56px]">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-white text-lg text-[#151515] sm:h-10 sm:w-10">
                    •
                  </span>
                  <span>100 ₽</span>
                </div>
                <p className="mt-4 text-sm text-white/70">
                  Используется для списаний по операциям сервиса согласно текущему тарифу
                </p>
              </div>

              <button
                className={`${submitButtonClassName} min-w-[180px]`}
                type="button"
                onClick={handleOpenTopUp}
              >
                Пополнить
              </button>
            </div>
          </section>
        </section>

        <section className="pt-14 sm:pt-20">
          <PageTitle
            title="История операций"
            description="Вы можете отслеживать историю операций на вашем аккаунте, выбрав нужные данные"
          />

          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
            <button
              className={`${filterControlClassName} min-w-[170px]`}
              type="button"
              onClick={() => toggleBalancePanel('period')}
            >
              <span>Период</span>
              <span className="text-white/35">▾</span>
            </button>
            <button
              className={`${filterControlClassName} min-w-[170px]`}
              type="button"
              onClick={() => toggleBalancePanel('type')}
            >
              <span>Тип операции</span>
              <span className="text-white/35">▾</span>
            </button>
            <button
              className={`${filterControlClassName} min-w-[170px]`}
              type="button"
              onClick={() => toggleBalancePanel('source')}
            >
              <span>Источник</span>
              <span className="text-white/35">▾</span>
            </button>

            {balanceChips.length > 0 ? (
              <button
                className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
                type="button"
                onClick={resetBalanceFilters}
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/35 text-[11px]">
                  ×
                </span>
                Сбросить фильтры
              </button>
            ) : null}
          </div>

          {balanceOpenPanel === 'period' ? (
            <section className={`${cardClassName} mb-5 p-4 sm:p-5`}>
              <p className="mb-3 text-xs uppercase tracking-[0.12em] text-white/50">Период</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-2 text-xs text-white/80">
                  <span className="text-white/55">c</span>
                  <input
                    className={`${inputClassName} h-10 bg-[#181818]`}
                    type="date"
                    value={balanceDateFrom}
                    onChange={(event) => setBalanceDateFrom(event.target.value)}
                  />
                </label>
                <label className="space-y-2 text-xs text-white/80">
                  <span className="text-white/55">по</span>
                  <input
                    className={`${inputClassName} h-10 bg-[#181818]`}
                    type="date"
                    value={balanceDateTo}
                    onChange={(event) => setBalanceDateTo(event.target.value)}
                  />
                </label>
              </div>
            </section>
          ) : null}

          {balanceOpenPanel === 'type' ? (
            <section className={`${cardClassName} mb-5 p-4 sm:p-5`}>
              <p className="mb-3 text-xs uppercase tracking-[0.12em] text-white/50">Тип операции</p>
              <div className="flex flex-wrap gap-3 text-sm text-white/85">
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    balanceTypeFilter === 'income'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setBalanceTypeFilter('income')}
                >
                  Поступление
                </button>
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    balanceTypeFilter === 'expense'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setBalanceTypeFilter('expense')}
                >
                  Списание
                </button>
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    balanceTypeFilter === 'all'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setBalanceTypeFilter('all')}
                >
                  Все
                </button>
              </div>
            </section>
          ) : null}

          {balanceOpenPanel === 'source' ? (
            <section className={`${cardClassName} mb-5 p-4 sm:p-5`}>
              <p className="mb-3 text-xs uppercase tracking-[0.12em] text-white/50">Источник</p>
              <div className="flex flex-wrap gap-3 text-sm text-white/85">
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    balanceSourceFilter === 'telegram'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setBalanceSourceFilter('telegram')}
                >
                  Telegram-бот
                </button>
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    balanceSourceFilter === 'web'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setBalanceSourceFilter('web')}
                >
                  Веб-сервис
                </button>
                <button
                  type="button"
                  className={`rounded-[10px] px-3 py-2 ${
                    balanceSourceFilter === 'all'
                      ? 'bg-white text-[#151515]'
                      : 'bg-[#181818] text-white/85 hover:bg-[#1F1F1F]'
                  }`}
                  onClick={() => setBalanceSourceFilter('all')}
                >
                  Все
                </button>
              </div>
            </section>
          ) : null}

          {balanceChips.length > 0 ? (
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {balanceChips.map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#181818] px-3 py-1 text-xs text-white/80 hover:bg-[#222222]"
                    onClick={chip.clear}
                  >
                    <span>{chip.label}</span>
                    <span className="text-white/50">×</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-2 text-xs font-medium text-white/75 underline underline-offset-4 hover:text-white"
                onClick={resetBalanceFilters}
              >
                Сбросить фильтры
              </button>
            </div>
          ) : null}

          <section className={`${cardClassName} overflow-hidden p-4 sm:p-6`}>
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
                <thead className="text-white/60">
                  <tr>
                    <th className="pr-6 font-normal">Дата операции</th>
                    <th className="pr-6 font-normal">Тип операции</th>
                    <th className="pr-6 font-normal">Источник операции</th>
                    <th className="font-normal">Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOperations.map((operation) => (
                    <tr className="border-t border-white/10 text-white/85" key={`${operation.date}-${operation.type}-${operation.source}`}>
                      <td className="pr-6 pt-3">{operation.date}</td>
                      <td className={`pr-6 pt-3 ${operation.type === 'Списание' ? 'text-[#FF7A7A]' : 'text-[#77D877]'}`}>
                        {operation.type}
                      </td>
                      <td className="pr-6 pt-3">
                        <div className="flex items-center gap-2.5">
                          {operation.source === 'telegram' ? (
                            <TelegramSmallIcon className="h-5 w-5" />
                          ) : (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[9px] font-semibold text-[#151515]">
                              web
                            </span>
                          )}
                          <span>{operation.source === 'telegram' ? 'Telegram-бот' : 'Веб-сервис'}</span>
                        </div>
                      </td>
                      <td className="pt-3">{operation.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>

        {showTopUpModal ? (
          <BalanceTopUpModal
            step={topUpStep}
            amount={topUpAmount}
            onAmountChange={setTopUpAmount}
            onChipSelect={(value) => setTopUpAmount(String(value))}
            onContinue={handleTopUpContinue}
            onClose={handleCloseTopUp}
          />
        ) : null}
      </main>
    </PageLayout>
  );
}

function useOverlayNavigation() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from') || '/cabinet';
  const query = `?from=${encodeURIComponent(from)}`;

  return { from, query };
}

function getOverlayBackground(pathname: string) {
  if (pathname.startsWith('/cabinet/history')) {
    return <HistoryPage />;
  }

  if (pathname.startsWith('/cabinet/check')) {
    return <NewCheckPage />;
  }

  if (pathname.startsWith('/cabinet/tariff')) {
    return <TariffPage />;
  }

  if (pathname.startsWith('/cabinet/settings')) {
    return <SettingsPage />;
  }

  if (pathname.startsWith('/cabinet/balance')) {
    return <BalancePage />;
  }

  return <DashboardPage />;
}

function ModalOverlay({ caption, children }: { caption: string; children: React.ReactNode }) {
  const { from } = useOverlayNavigation();

  return (
    <div className={pageClassName}>
      {getOverlayBackground(from)}

      <div className="absolute inset-0 z-20 bg-[#1A1A1A]" />

      <div className="pointer-events-none absolute inset-0 z-30 flex items-start justify-center px-4 py-8 sm:px-6 sm:py-12">
        <Link
          className="pointer-events-auto absolute right-4 top-6 inline-flex h-[42px] w-[42px] items-center justify-center rounded-full text-[26px] leading-none text-white outline-none transition-transform hover:-translate-y-px focus-visible:ring-2 focus-visible:ring-[#0EB8D2]/50 sm:right-[max(24px,calc(50%-455px))] sm:top-[84px]"
          to={from}
          aria-label="Закрыть окно"
        >
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="25" fill="#057889"/>
            <path d="M26.4284 24.9991L32.8048 18.6328C32.9954 18.4422 33.1025 18.1837 33.1025 17.9142C33.1025 17.6447 32.9954 17.3862 32.8048 17.1956C32.6142 17.005 32.3557 16.8979 32.0862 16.8979C31.8167 16.8979 31.5582 17.005 31.3676 17.1956L25.0013 23.572L18.635 17.1956C18.4445 17.005 18.186 16.8979 17.9164 16.8979C17.6469 16.8979 17.3884 17.005 17.1978 17.1956C17.0072 17.3862 16.9002 17.6447 16.9002 17.9142C16.9002 18.1837 17.0072 18.4422 17.1978 18.6328L23.5742 24.9991L17.1978 31.3654C17.103 31.4595 17.0277 31.5714 16.9763 31.6947C16.9249 31.8181 16.8984 31.9504 16.8984 32.084C16.8984 32.2176 16.9249 32.3499 16.9763 32.4732C17.0277 32.5966 17.103 32.7085 17.1978 32.8026C17.2919 32.8974 17.4039 32.9727 17.5272 33.0241C17.6505 33.0755 17.7828 33.102 17.9164 33.102C18.05 33.102 18.1823 33.0755 18.3057 33.0241C18.429 32.9727 18.541 32.8974 18.635 32.8026L25.0013 26.4262L31.3676 32.8026C31.4617 32.8974 31.5736 32.9727 31.6969 33.0241C31.8203 33.0755 31.9526 33.102 32.0862 33.102C32.2198 33.102 32.3521 33.0755 32.4754 33.0241C32.5988 32.9727 32.7107 32.8974 32.8048 32.8026C32.8997 32.7085 32.975 32.5966 33.0263 32.4732C33.0777 32.3499 33.1042 32.2176 33.1042 32.084C33.1042 31.9504 33.0777 31.8181 33.0263 31.6947C32.975 31.5714 32.8997 31.4595 32.8048 31.3654L26.4284 24.9991Z" fill="#FDFEFF"/>
          </svg>

        </Link>

        <section className={`${modalCardClassName} pointer-events-auto mt-10 sm:mt-14`}>
          <div className="mb-7 text-center sm:mb-8">
            <h1 className="mb-4 text-center text-[34px] leading-[0.95] font-semibold tracking-[-0.04em] uppercase sm:text-[44px]">
              TRUST ME
            </h1>
            <p className="mx-auto max-w-[360px] text-[18px] leading-[1.25] text-white/75">{caption}</p>
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}

function LoginPage() {
  const { query } = useOverlayNavigation();

  return (
    <ModalOverlay caption="Войдите в сервис проверки контрагентов «Trust Me»">
      <div className="mb-[30px] flex justify-center border-b border-white/15" aria-label="Тип авторизации">
        <button
          className="relative -mb-px bg-transparent px-1 pb-3 text-base font-medium text-[#FDFEFF] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-[linear-gradient(90deg,#057889,#0EB8D2)] sm:text-lg"
          type="button"
        >
          Логин и пароль
        </button>
      </div>

      <form className="flex flex-col gap-[18px]">
        <label className="flex flex-col gap-2.5">
          <span className={labelClassName}>Почта</span>
          <input className={inputClassName} type="email" placeholder="ivanIvanov1999@mail.ru" />
        </label>

        <label className="flex flex-col gap-2.5">
          <span className={labelClassName}>Пароль</span>
          <input className={inputClassName} type="password" placeholder="Введите пароль" />
        </label>

        <div className="mt-0.5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <label className="inline-flex cursor-pointer items-center gap-2.5">
            <input className="peer sr-only" type="checkbox" />
            <span className="h-[14px] w-[14px] rounded-[4px] border border-white/30 bg-white/[0.03] peer-checked:border-[#0EB8D2] peer-checked:bg-[#0EB8D2]" />
            <span className={secondaryTextClassName}>Запомнить меня</span>
          </label>

          <Link
            className={`${secondaryTextClassName} outline-none transition-colors hover:text-[#FDFEFF] focus-visible:ring-2 focus-visible:ring-[#0EB8D2]/50`}
            to={`/forgot-password${query}`}
          >
            Забыли пароль?
          </Link>
        </div>

        <button className={submitButtonClassName} type="submit">
          Войти
        </button>
      </form>

      <p className="mt-7 text-center text-base leading-[1.35] text-white/70">
        <span>Еще нет аккаунта? </span>
        <NavLink className={linkClassName} to={`/register${query}`}>
          Зарегистрируйтесь
        </NavLink>
      </p>
    </ModalOverlay>
  );
}

function ForgotPasswordPage() {
  const { query } = useOverlayNavigation();

  return (
    <ModalOverlay caption="Войдите в сервис проверки контрагентов «Trust Me»">
      <div className="mb-[30px] flex justify-center border-b border-white/15" aria-label="Восстановление пароля">
        <button
          className="relative -mb-px bg-transparent px-1 pb-3 text-base font-medium text-[#FDFEFF] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-[linear-gradient(90deg,#057889,#0EB8D2)] sm:text-lg"
          type="button"
        >
          Логин и пароль
        </button>
      </div>

      <form className="flex flex-col gap-[18px]">
        <label className="flex flex-col gap-2.5">
          <span className={labelClassName}>Почта</span>
          <input className={inputClassName} type="email" placeholder="ivanIvanov1999@mail.ru" />
        </label>

        <div className="rounded-xl border border-[#0EB8D2]/90 bg-white/[0.03] px-4 py-3 text-sm leading-[1.35] text-white/75">
          <p className="m-0">Укажите почту, которую вы использовали для регистрации в сервисе «Trust Me».</p>
          <p className="m-0 mt-3">Мы отправим ссылку для сброса текущего пароля.</p>
        </div>

        <button className={submitButtonClassName} type="submit">
          Сбросить
        </button>
      </form>

      <div className="mt-9 text-center">
        <Link className={`${linkClassName} text-base`} to={`/login${query}`}>
          Вернуться назад
        </Link>
      </div>
    </ModalOverlay>
  );
}

function RegisterPage() {
  const { query } = useOverlayNavigation();

  return (
    <ModalOverlay caption="Для создания аккаунта в сервисе проверки контрагентов «Trust Me» укажите свои данные:">
      <div className="mb-[26px] flex border-b border-white/15 text-base sm:text-[18px]">
        <button className="flex-1 bg-transparent px-2 pb-3 text-white/85" type="button">
          Юридическое лицо
        </button>
        <button
          className="relative -mb-px flex-1 bg-transparent px-2 pb-3 text-white after:absolute after:right-[14%] after:bottom-0 after:left-[14%] after:h-0.5 after:rounded-full after:bg-[linear-gradient(90deg,#057889,#0EB8D2)]"
          type="button"
        >
          Физическое лицо
        </button>
      </div>

      <form className="flex flex-col gap-[18px]">
        <label className="flex flex-col gap-2.5">
          <span className={labelClassName}>Почта</span>
          <input className={inputClassName} type="email" placeholder="ivanIvanov1999@mail.ru" />
        </label>

        <label className="flex flex-col gap-2.5">
          <span className={labelClassName}>Пароль</span>
          <input className={inputClassName} type="password" placeholder="Введите пароль" />
        </label>

        <div className="mt-[-6px] flex flex-col gap-1.5">
          {[
            'Не менее 8 символов',
            'Минимум одна заглавная и одна строчная буква',
            'Минимум одна цифра',
          ].map((rule) => (
            <div className="flex items-center gap-2.5" key={rule}>
              <span className="h-[14px] w-[14px] rounded-full bg-white/80" />
              <span className={secondaryTextClassName}>{rule}</span>
            </div>
          ))}
        </div>

        <Link className={`${submitButtonClassName} mt-1`} to={`/register/confirm${query}`}>
          Зарегистрироваться
        </Link>

        <div className="mt-1 flex flex-col gap-3">
          <label className="flex items-start gap-2.5">
            <input className="peer sr-only" type="checkbox" />
            <span className="mt-0.5 h-[14px] w-[14px] shrink-0 rounded-[4px] border border-white/30 bg-white/[0.03] peer-checked:border-[#0EB8D2] peer-checked:bg-[#0EB8D2]" />
            <span className={secondaryTextClassName}>
              Регистрируясь, я подтверждаю согласие на обработку персональных данных, указанных в этой веб-форме
            </span>
          </label>

          <label className="flex items-start gap-2.5">
            <input className="peer sr-only" type="checkbox" />
            <span className="mt-0.5 h-[14px] w-[14px] shrink-0 rounded-[4px] border border-white/30 bg-white/[0.03] peer-checked:border-[#0EB8D2] peer-checked:bg-[#0EB8D2]" />
            <span className={secondaryTextClassName}>Я даю согласие на получение рекламных материалов</span>
          </label>
        </div>
      </form>

      <p className="mt-9 text-center text-base leading-[1.35] text-white/70">
        <span>Уже есть аккаунт? </span>
        <NavLink className={linkClassName} to={`/login${query}`}>
          Войти
        </NavLink>
      </p>
    </ModalOverlay>
  );
}

function RegisterConfirmPage() {
  const { query } = useOverlayNavigation();

  return (
    <ModalOverlay
      caption="Для завершения регистрации в сервисе проверки контрагентов «Trust Me» перейдите по ссылке из письма:"
    >
      <div className="space-y-5">
        <div className="rounded-xl border border-[#0EB8D2]/90 bg-white/[0.03] px-4 py-4 text-[17px] leading-[1.45] text-white/85">
          <p className="m-0">Письмо отправлено на указанную почту: ....</p>
          <p className="m-0 mt-3">Если письма нет, проверьте папку «Спам».</p>
        </div>

        <p className="text-center text-[17px] leading-[1.35] text-white/85">Выслать письмо повторно через 10:00</p>

        <p className="pt-8 text-center text-[18px] leading-[1.35] text-white/85">
          <span>Указали не ту почту? </span>
          <Link className={linkClassName} to={`/register${query}`}>
            Изменить
          </Link>
        </p>
      </div>
    </ModalOverlay>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cabinet" replace />} />
      <Route path="/cabinet" element={<DashboardPage />} />
      <Route path="/cabinet/history" element={<HistoryPage />} />
      <Route path="/cabinet/check" element={<NewCheckPage />} />
      <Route path="/cabinet/tariff" element={<TariffPage />} />
      <Route path="/cabinet/balance" element={<BalancePage />} />
      <Route path="/cabinet/settings" element={<SettingsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register/confirm" element={<RegisterConfirmPage />} />
    </Routes>
  );
}
