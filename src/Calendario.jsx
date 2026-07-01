import { useTranslation } from 'react-i18next';

function Calendario() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('calendario')}</h1>
      <p>{t('verDatas')}</p>
    </div>
  );
}

export default Calendario;
