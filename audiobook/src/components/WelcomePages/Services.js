import React from 'react';
import Icon1 from './svg-4.svg';
import Icon2 from './svg-5.svg';
import Icon3 from './svg-6.svg';
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServicesElements';

export const Services = () => {
  return (
    
    <ServicesContainer id='services' className='dark:bg-d-bg-100 bg-white text-black dark:text-white'>
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>

        <ServicesCard className='dark:bg-d-bg-200 bg-stone-100'>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Reduce expenses</ServicesH2>
          <ServicesP>We help reduce your fees and increase your overall revenue</ServicesP>
        </ServicesCard>

        <ServicesCard className='dark:bg-d-bg-200 bg-stone-100'>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Virtual Offices</ServicesH2>
          <ServicesP>You can access our platform online anywhere in the world</ServicesP>
        </ServicesCard>

        <ServicesCard className='dark:bg-d-bg-200 bg-stone-100'>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Premium Benefits</ServicesH2>
          <ServicesP>Unlock our special membership card and get 5% cashback</ServicesP>
        </ServicesCard>
        

      </ServicesWrapper>
    </ServicesContainer>
  );
};

// export Services;
