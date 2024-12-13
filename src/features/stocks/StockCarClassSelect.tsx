/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Divider, InputNumber, Select, Space } from 'antd';
import React from 'react';

export type TarifList = {
  tarif: string;
  price: number;
  number_of_car: number;
  car_sides: string[];
};
interface Props {
  className?: string;
  selectedCompanyId: string | null;
  companyTarifData: TarifList[]|null;
  isLoadingTarif: boolean;
  isFetchingTarif: boolean;
  setCarClassModel: (value: TarifList[]) => void;
}

export const StockCarClassSelect: React.FC<Props> = ({
  companyTarifData,
  isLoadingTarif,
  isFetchingTarif,
  setCarClassModel,
}) => {
  
  const [isOpenCompanySelect, setIsOpenCompanySelect] =
    React.useState<boolean>(false);
  const [selectedCarClass, setSelectedCarClass] = React.useState([]);
  const [tariffList, setTariffList] = React.useState([]);

  const handleCarClassChange = (selected) => {
    setSelectedCarClass(selected);
    setTariffList((prev) => {
      return selected.map((tarif) => {
        const existing = prev.find((item) => item.tarif === tarif);
        const serverData = companyTarifData.find(
          (item) => item.tarif === tarif,
        );
        return existing || serverData || { tarif, number_of_car: 0 };
      });
    });
  };

  const increaseCount = (tarif) => {
    setTariffList((prev) =>
      prev.map((item) =>
        item.tarif === tarif
          ? { ...item, number_of_car: item.number_of_car + 1 }
          : item,
      ),
    );
  };

  const decreaseCount = (tarif) => {
    setTariffList((prev) =>
      prev.map((item) =>
        item.tarif === tarif
          ? { ...item, number_of_car: Math.max(0, item.number_of_car - 1) }
          : item,
      ),
    );
  };

  React.useEffect(() => {
    if (!isLoadingTarif && companyTarifData?.length) {
      setTariffList(companyTarifData);
    }
  }, [isLoadingTarif, companyTarifData]);

  React.useEffect(() => {
    const tarif_list = selectedCarClass
      .map((tarif) => {
        const selectedTarif = tariffList.find((item) => item.tarif === tarif);
        return selectedTarif
          ? {
              tarif: selectedTarif.tarif,
              number_of_car: selectedTarif.number_of_car,
            }
          : null;
      })
      .filter(Boolean);

    const newModel = { tarif_list };
    setCarClassModel(newModel);
  }, [selectedCarClass, tariffList]);

  return (
    <div className="w-100" style={{ marginBottom: 24 }}>
      <p style={{ marginBottom: 8 }}>Выберите класс автомобиля</p>
      <Select
        size="large"
        mode="multiple"
        className="w-100"
        placeholder="Выберите модель"
        options={companyTarifData?.map((item) => ({
          value: item.tarif,
          label: item.tarif,
          data: item,
        }))}
        open={isOpenCompanySelect}
        onFocus={() => {
          setIsOpenCompanySelect(true);
        }}
        disabled={isLoadingTarif}
        loading={isFetchingTarif}
        onChange={handleCarClassChange}
        optionRender={(option) => {
          // console.log('option', option);
          const selectedTarif = tariffList.find(
            (t) => t.tarif === option.value,
          );

          return (
            <div className="d-flex align-center justify-between w-100">
              <span
                style={{
                  maxWidth: (selectedCarClass || []).includes(option.value)
                    ? '65%'
                    : '100%',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {option.data.label}
              </span>
              {(selectedCarClass || []).includes(option.value) &&
                selectedTarif && (
                  <Space
                    onClick={(e) => e.stopPropagation()}
                    style={{ marginTop: '0px' }}
                  >
                    <Button
                      size="small"
                      onClick={() => decreaseCount(option.value)}
                    >
                      -
                    </Button>
                    <InputNumber
                      min={0}
                      max={option.data?.data?.number_of_car}
                      style={{ width: 40 }}
                      size="small"
                      value={selectedTarif.number_of_car}
                      readOnly
                    />
                    <Button
                      size="small"
                      disabled={
                        selectedTarif.number_of_car >=
                        option.data?.data?.number_of_car
                      }
                      onClick={() => increaseCount(option.value)}
                    >
                      +
                    </Button>
                  </Space>
                )}
            </div>
          );
        }}
        menuItemSelectedIcon={null}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <div style={{ padding: '0 8px 4px' }}>
              <Button
                className="w-100"
                type={companyTarifData?.length > 0 ? 'primary' : 'default'}
                danger={!(companyTarifData?.length > 0)}
                onClick={() => {
                  setIsOpenCompanySelect(false);
                }}
              >
                {companyTarifData?.length > 0 ? 'Подвердить' : 'Закрыть'}
              </Button>
            </div>
          </>
        )}
      />
    </div>
  );
};
