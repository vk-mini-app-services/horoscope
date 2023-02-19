import { InfoCard } from '../../../../components/info-card';
import { infoCards } from '../../../../utils/mock-data/cards';

export const HomeCards = () => {
  return (
    <>
      {infoCards.map((item, index) => {
        return <InfoCard key={index} {...item} />;
      })}
    </>
  );
};
