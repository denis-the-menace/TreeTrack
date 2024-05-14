import firestore from '@react-native-firebase/firestore';
import {getFromStorage} from './storage';
import * as geolib from 'geolib';
import {getSortedPlantsByDistance} from './plant_services';

export const getUserGardens = async (getLastImage = false) => {
  const user_uid = await getFromStorage('userId');
  const userGardensRef = firestore().collection('user_gardens');
  const query = userGardensRef.where('user_uid', '==', user_uid);
  const userGardensDocs = await query.get();

  const gardenPromises = userGardensDocs.docs.map(async userGardenDoc => {
    const garden_id = userGardenDoc.data().garden_uid;
    const gardenRef = firestore().collection('gardens').doc(garden_id);
    const gardenDoc = await gardenRef.get();
    const gardenData = gardenDoc.data();
    // Modify gardenData as needed
    return gardenData;
  });

  let gardenList = await Promise.all(gardenPromises);

  if (getLastImage) {
    const gardenImagesPromises = gardenList.map(async garden => {
      const gardenNotesSnapshot = await firestore()
        .collection('garden_notes')
        .where('garden_id', '==', garden.id)
        .orderBy('created_at', 'desc')
        .limit(1)
        .get();

      const gardenNotesData = gardenNotesSnapshot.docs.map(doc => doc.data());
      return {garden_id: garden.id, data: gardenNotesData};
    });

    const gardenImageList = await Promise.all(gardenImagesPromises);

    gardenList = gardenList.map(garden => {
      const gardenImage = gardenImageList.find(
        image => image.garden_id === garden.id,
      );
      if (gardenImage && gardenImage.data.length !== 0) {
        garden.image_url = gardenImage.data[0].image_url;
      }
      return garden;
    });
  }

  // Sort gardens from newest to oldest
  gardenList.sort(
    (a, b) => new Date(b.created_at.toDate()) - new Date(a.created_at.toDate()),
  );

  return gardenList;
};

export const getUserGardenNames = async () => {
  const user_uid = await getFromStorage('userId');
  const userGardensRef = firestore().collection('user_gardens');
  const query = userGardensRef.where('user_uid', '==', user_uid);
  const userGardensDocs = await query.get();

  const gardenPromises = userGardensDocs.docs.map(async userGardenDoc => {
    const garden_id = userGardenDoc.data().garden_uid;
    const gardenRef = firestore().collection('gardens').doc(garden_id);
    const gardenDoc = await gardenRef.get();
    const data = gardenDoc.data();
    return {name: data.name, id: data.id};
  });

  const gardenList = await Promise.all(gardenPromises);

  gardenList.sort(
    (a, b) => new Date(b.created_at.toDate()) - new Date(a.created_at.toDate()),
  );

  return gardenList;
};

// export const deleteGarden = async gardenId => {
//   // remove garden
//   const gardenRef = firestore().collection('gardens').doc(gardenId);
//   await gardenRef.delete();
//   // remove relation
//   const user_uid = await getFromStorage('userId');
//   const userGardenQuery = firestore()
//     .collection('user_gardens')
//     .where('user_uid', '==', user_uid)
//     .where('garden_uid', '==', gardenId);
//   const querySnapshot = await userGardenQuery.get();
//   querySnapshot.forEach(async doc => {
//     await doc.ref.delete();
//   });
//   // remove garden notes
//   let gardenNotesRef = await firestore()
//     .collection('garden_notes')
//     .where('garden_id', '==', gardenId)
//     .get();
//   gardenNotesRef.docs.map(async doc => {
//     await doc.ref.delete();
//   });
//   console.log('GARDEN NOTES REMOVED');
//   // remove plants
//   const plant_id_list = [];
//   const plantsRef = firestore()
//     .collection('plants')
//     .where('garden_id', '==', gardenId);
//   const plantQuerySnapshot = await plantsRef.get();
//   plantQuerySnapshot.forEach(async doc => {
//     const plant = doc.data();
//     plant_id_list.push(plant.id);
//     await doc.ref.delete();
//   });
//   console.log('PLANTS REMOVED');
//   // remove plant notes
//   let plantCollection = await firestore().collection('plants');
//   const plantBatches = [];
//   while (plant_id_list.length) {
//     const batch = plant_id_list.splice(0, 10);
//     plantBatches.push(
//       plantCollection
//         .where('plant_id', 'in', [...batch])
//         .get()
//         .then(results =>
//           results.docs.map(async doc => {
//             await doc.ref.delete();
//           }),
//         ),
//     );
//   }
//   await Promise.all(plantBatches);
//   console.log('PLANT NOTES REMOVED');
// };

export const deleteGarden = async gardenId => {
  try {
    // Remove garden
    const gardenRef = firestore().collection('gardens').doc(gardenId);
    await gardenRef.delete();

    // Remove relation from user_gardens
    const user_uid = await getFromStorage('userId');
    const userGardenQuery = firestore()
      .collection('user_gardens')
      .where('user_uid', '==', user_uid)
      .where('garden_uid', '==', gardenId);

    console.log('User garden query:', userGardenQuery);

    const userGardenSnapshot = await userGardenQuery.get();
    userGardenSnapshot.forEach(async doc => {
      await doc.ref.delete();
    });

    // Remove garden notes
    const gardenNotesRef = firestore()
      .collection('garden_notes')
      .where('garden_id', '==', gardenId)
      .get();

    const gardenNotesQuerySnapshot = await gardenNotesRef;
    console.log('Garden notes:', gardenNotesQuerySnapshot);

    gardenNotesQuerySnapshot.docs.forEach(async doc => {
      await doc.ref.delete();
    });

    // Remove plants and plant notes
    const plantsRef = firestore()
      .collection('plants')
      .where('garden_id', '==', gardenId);
    const plantQuerySnapshot = await plantsRef.get();

    console.log('Plants:', plantQuerySnapshot);

    const deletePromises = plantQuerySnapshot.docs.map(async doc => {
      // Delete plant
      await doc.ref.delete();
      // Delete plant notes
      const plantNotesRef = firestore()
        .collection('plant_notes')
        .where('plant_id', '==', doc.id);
      const plantNotesQuerySnapshot = await plantNotesRef.get();
      const deletePlantNotesPromises = plantNotesQuerySnapshot.docs.map(
        async noteDoc => {
          await noteDoc.ref.delete();
        },
      );
      await Promise.all(deletePlantNotesPromises);
    });
    await Promise.all(deletePromises);

    console.log('Garden and associated data deleted successfully');
  } catch (error) {
    console.error('Error deleting garden:', error);
    throw error; // Rethrow the error for further handling
  }
};

export const insertGarden = async gardenData => {
  const gardenRef = firestore().collection('gardens').doc();
  await gardenRef.set({
    id: gardenRef.id,
    polygon: gardenData.polygon.map(
      coordinate =>
        new firestore.GeoPoint(coordinate.latitude, coordinate.longitude),
    ),
    ...gardenData,
  });
  // insert user garden relation
  const user_uid = await getFromStorage('userId');
  const userGardensRef = firestore().collection('user_gardens').doc();
  await userGardensRef.set({
    user_uid: user_uid,
    garden_uid: gardenRef.id,
  });

  return gardenRef.id;
};

export const getPlantsOfGarden = async (garden_id, getLastImage) => {
  const querySnapshot = await firestore()
    .collection('plants')
    .where('garden_id', '==', garden_id)
    .orderBy('created_at', 'desc')
    .get();

  const plantList = [];

  querySnapshot.forEach(doc => {
    const data = doc.data();
    plantList.push(data);
  });

  // Get last image of the plant if requested
  if (getLastImage) {
    const plantImagePromises = plantList.map(async plant => {
      const noteQuerySnapshot = await firestore()
        .collection('plant_notes')
        .where('plant_id', '==', plant.id)
        .orderBy('created_at', 'desc')
        .limit(1)
        .get();

      const noteDocs = noteQuerySnapshot.docs;
      if (noteDocs.length > 0) {
        const lastNoteData = noteDocs[0].data();
        return {plant_id: plant.id, image_url: lastNoteData.image_url};
      } else {
        return {plant_id: plant.id, image_url: null};
      }
    });

    const plantImages = await Promise.all(plantImagePromises);

    plantList.forEach((plant, index) => {
      plant.image_url = plantImages[index].image_url;
    });
  }

  plantList.sort(
    (a, b) => new Date(b.created_at.toDate()) - new Date(a.created_at.toDate()),
  );

  return plantList;
};

// get only garden ids that currently logged-in user has
export const getUserGardenIds = async () => {
  const gardenIds = [];
  const user_uid = await getFromStorage('userId');
  const userGardensRef = firestore().collection('user_gardens');
  const query = userGardensRef.where('user_uid', '==', user_uid);
  const userGardensDocs = await query.get();
  userGardensDocs.docs.map(doc => {
    gardenIds.push(doc.data().garden_uid);
  });
  return gardenIds;
};

// kullanıcının bütün bahçelerindeki notları döndürür
export const getGardenNotes = async () => {
  const gardenIds = await getUserGardenIds();
  const gardenIdsForNote = JSON.parse(JSON.stringify(gardenIds));
  if (gardenIds.length == 0) {
    console.log('Empty garden id list.');
    return [];
  }
  // get gardens
  let gardensCollection = await firestore().collection('gardens');
  const gardenBatches = [];
  while (gardenIds.length) {
    const batch = gardenIds.splice(0, 10);
    gardenBatches.push(
      gardensCollection
        .where('id', 'in', [...batch])
        .get()
        .then(results => results.docs.map(result => ({...result.data()}))),
    );
  }
  const gardens = await Promise.all(gardenBatches).then(content => {
    return content.flat();
  });

  // get garden notes
  let gardenNotesCollection = await firestore().collection('garden_notes');
  const gardenNoteBatches = [];
  while (gardenIdsForNote.length) {
    const batch = gardenIdsForNote.splice(0, 10);
    gardenNoteBatches.push(
      gardenNotesCollection
        .where('garden_id', 'in', [...batch])
        .orderBy('created_at', 'desc')
        .get()
        .then(results => results.docs.map(result => ({...result.data()}))),
    );
  }
  const notesWithGardenName = [];
  await Promise.all(gardenNoteBatches).then(content => {
    content.flat().forEach(gardenNoteData => {
      const garden = gardens.find(g => g.id === gardenNoteData.garden_id);
      if (garden) {
        gardenNoteData.garden_name = garden.name;
        notesWithGardenName.push(gardenNoteData);
      }
    });
  });
  return notesWithGardenName;
};

// kullanıcının bir bahçesindeki notları döndürür
export const getGardensNoteById = async gardenId => {
  let gardenRef = await firestore().collection('gardens').doc(gardenId).get();
  if (!gardenRef.exists) {
    return [];
  }
  const gardenName = gardenRef.data().name;
  let gardenNotesRef = await firestore()
    .collection('garden_notes')
    .where('garden_id', '==', gardenId)
    .orderBy('created_at', 'desc')
    .get();

  const garden_notes = gardenNotesRef.docs.map(doc => {
    const data = doc.data();
    //data.created_at = String(data.created_at.toDate());
    return data;
  });

  let notesWithGardenName = [];
  garden_notes.forEach(note => {
    note.garden_name = gardenName;
    notesWithGardenName.push(note);
  });
  return notesWithGardenName;
};
// Ray Casting algorithm to determine whether a point is inside of given polygon
export const isInsidePolygon = (point, polygon) => {
  let x = point.latitude,
    y = point.longitude;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xi = polygon[i].latitude,
      yi = polygon[i].longitude;
    let xj = polygon[j].latitude,
      yj = polygon[j].longitude;
    let intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

export const insertGardenNote = async gardenNote => {
  const gardenNoteRf = await firestore()
    .collection('garden_notes')
    .add(gardenNote);
  await gardenNoteRf.update({id: gardenNoteRf.id});
};

export const updateGardenNote = async (noteId, updatedNoteData) => {
  try {
    const noteRef = firestore().collection('garden_notes').doc(noteId);
    await noteRef.update(updatedNoteData);
    console.log('Garden note updated successfully');
    return true; // İşlem başarılı olduğunda true döndür
  } catch (error) {
    console.error('Error updating garden note:', error);
    return false; // İşlem sırasında bir hata oluşursa false döndür
  }
};

export const getSortedGardensByDistance = async userLocation => {
  const gardens = await getUserGardens();
  let gardensWithoutPolygon = [];
  let gardensWithDistance = [];
  gardens.forEach(garden => {
    polygon = garden.polygon.map(point => ({
      latitude: point.latitude,
      longitude: point.longitude,
    }));
    if (polygon && polygon.length > 0) {
      const center = geolib.getCenter(polygon);
      const distance = geolib.getDistance(center, userLocation, (accuracy = 1));
      garden.distance = distance;
      gardensWithDistance.push(garden);
    } else {
      gardensWithoutPolygon.push(garden);
    }
  });
  const sortedGardens = gardensWithDistance.sort(
    (a, b) => a.distance - b.distance,
  );
  const concatenatedGardenList = sortedGardens.concat(gardensWithoutPolygon);
  return concatenatedGardenList;
};

// bahçelerin bitkileri de kullanıcının konumuna yakınlığına göre sıralanır
export const getSortedGardensWithPlants = async userLocation => {
  const concatenatedGardenList = await getSortedGardensByDistance(userLocation);
  let plantList = [];
  if (concatenatedGardenList.length > 0) {
    plantList = await getSortedPlantsByDistance(
      userLocation,
      concatenatedGardenList[0].id,
    );
  }
  return {gardenList: concatenatedGardenList, plantList};
};

export const updateGarden = async (gardenId, newGardenData) => {
  await firestore().collection('gardens').doc(gardenId).update(newGardenData);
};
// kullanıcının bahçesi yoksa true döner
export const isEmptyGarden = async () => {
  const user_uid = await getFromStorage('userId');
  //console.log("Uid: ", user_uid)
  const userGardensRef = firestore().collection('user_gardens');
  const query = userGardensRef.where('user_uid', '==', user_uid);
  const isEmpty = (await query.get()).empty;
  return isEmpty;
};
