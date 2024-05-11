import EmptyPlants from '../layouts/EmptyPlants';
import FilledPlants from '../layouts/FilledPlants';
import {useEffect, useState} from 'react';
import {getPlantsOfGarden} from '../services/garden_services';

const Plants = ({navigation, route}) => {
  const garden = route.params.garden;
  const [plants, setPlants] = useState([]);

  const updatePlants = async plant => {
    if (plant) setPlants([...plants, plant]);
    console.log('inside updatePlants:' + plants.map(plant => plant.name));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlantsOfGarden(garden.id, true);
      setPlants(data);
    };
    fetchData();
    console.log('plants useEffect (data fethed)');
  }, []);

  return plants.length == 0 ? (
    <EmptyPlants
      navigation={navigation}
      garden={garden}
      onUpdate={updatePlants}
    />
  ) : (
    <FilledPlants
      navigation={navigation}
      garden={garden}
      plants={plants}
      onUpdate={updatePlants}
    />
  );
};

export default Plants;
