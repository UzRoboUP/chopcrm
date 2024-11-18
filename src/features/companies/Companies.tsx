/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import ContentHeader from '../../ui/ContentHeader';
import EmptyCard from '../../ui/EmptyCard';
import CompanyContentCard from './CompanyContentCard';
import { useCompanies } from './useCompanies';
import CompanyStatus from '../../ui/CompanyStatus';
import CreateСompanyModal from './CreateСompanyModal';
import { Rate } from '../../context/RadeContext';
export type companyType = {
  address: string;
  total_cars_number: string;
  contract_finish_time: string;
  name: string;
  tarif_list: Rate[];
  phone_number: string;
};
function Companies() {
  const [isOpenCompanyModal, setOpenCompanyModal] = useState(false);
  const { data: companies } = useCompanies();
  const [companyData, setCompanyData] = useState<companyType | null>();
  useEffect(() => {
    if (!isOpenCompanyModal) {
      setCompanyData(null);
    }
  }, [isOpenCompanyModal]);
  return (
    <div className="content">
      <div className="content__header">
        <ContentHeader
          pagename="Компании"
          hasAddButton
          openModal={() => setOpenCompanyModal(true)}
        />
      </div>
      <div className="content__report content__report__container">
        <CompanyStatus reportsCount={companies?.number_report_status} />
      </div>
      <div className="content__main">
        <div className="content__cards">
          <div className="content__row">
            {companies?.client_company_list?.results?.length > 0 ? (
              (companies?.client_company_list?.results || []).map(
                (item: { id: string }) => (
                  <CompanyContentCard
                    key={item.id}
                    item={item}
                    pagename="company"
                    showCompanyData={() => {
                      setOpenCompanyModal(true);
                      setCompanyData(item as unknown as companyType);
                    }}
                  />
                ),
              )
            ) : (
              <EmptyCard text="company" />
            )}
          </div>
        </div>
      </div>

      <CreateСompanyModal
        companyData={companyData}
        isOpenModal={isOpenCompanyModal}
        onCloseModal={() => setOpenCompanyModal(false)}
      />
    </div>
  );
}

export default Companies;
