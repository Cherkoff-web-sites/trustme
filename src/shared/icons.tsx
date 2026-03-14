import { useId } from 'react';

export function TelegramCircleIcon({ className = 'h-[60px] w-[60px]' }: { className?: string }) {
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

export function TelegramSmallIcon({ className = 'h-10 w-10' }: { className?: string }) {
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

export function SuccessStatusIcon({ className = 'h-10 w-10' }: { className?: string }) {
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

export function ErrorStatusIcon({ className = 'h-[39px] w-[39px]' }: { className?: string }) {
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

export function TelegramQrIcon({ className = 'h-[146px] w-[144px]' }: { className?: string }) {
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
        <path d="M34.7559 20.1387H19.8594V35.2421H34.7559V20.1387Z" fill="#FDFEFF" />
        <path d="M124.135 20.1387H109.238V35.2421H124.135V20.1387Z" fill="#FDFEFF" />
        <path d="M34.7559 110.759H19.8594V125.862H34.7559V110.759Z" fill="#FDFEFF" />
        <path d="M39.4745 10.0693H15.1435H9.92969V15.3555V40.0245V45.3107H15.1435H39.4745H44.6883V40.0245V15.3555V10.0693H39.4745ZM39.4745 40.0245H15.1435V15.3555H39.4745V40.0245Z" fill="#FDFEFF" />
        <path d="M128.853 10.0693H104.522H99.3086V15.3555V40.0245V45.3107H104.522H128.853H134.067V40.0245V15.3555V10.0693H128.853ZM128.853 40.0245H104.522V15.3555H128.853V40.0245Z" fill="#FDFEFF" />
        <path d="M39.4745 100.69H15.1435H9.92969V105.977V130.646V135.932H15.1435H39.4745H44.6883V130.646V105.977V100.69H39.4745ZM39.4745 130.646H15.1435V105.977H39.4745V130.646Z" fill="#FDFEFF" />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="144" height="146" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
