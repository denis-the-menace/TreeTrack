import EmptyGardens from '../layouts/EmptyGardens';
import FilledGardens from '../layouts/FilledGardens';
import { useEffect, useState } from 'react';
import { getUserGardens } from '../services/garden_services';

const Gardens = ({ navigation }) => {
  const [gardens, setGardens] = useState([]);

  // CreateGarden'daki addGarden methodu async oldugu icin console log ettigimizde en son ekledigimiz garden gozukmuyor
  // fakat filled gardens'a buradaki gardens state'ini gonderirken en son ekledigimiz garden gozukuyor
  const updateGardens = (garden, method) => {
    if (method == 'add') setGardens([garden, ...gardens]);
    else if (method == 'delete')
      setGardens(prevGardens => prevGardens.filter(g => g.id !== garden.id));

    console.log(
      'inside updateGardens:' +
      gardens.map(garden => garden.id + '=>' + garden.name),
    );
  };

  useEffect(() => {
    // TODO: ilk fetch'ten sonra gardenlari async storage'dan al
    const fetchData = async () => {
      const data = await getUserGardens(true);
      setGardens(data);
    };
    if (gardens.length == 0) fetchData();
    // console.log('gardens useEffect (data fetched)');
  }, []);

  // console.log('inside gardens: ' + gardens.map(garden => garden.name));

  return gardens.length == 0 ? (
    <EmptyGardens navigation={navigation} onUpdate={updateGardens} />
  ) : (
    <FilledGardens
      navigation={navigation}
      gardens={gardens}
      onUpdate={updateGardens}
    />
  );
};

export default Gardens;
