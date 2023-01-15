import { useParams } from 'react-router-dom'

const PlantPage = () => {

    const { plantName } = useParams()

  return (
    <>
      <h1> This is PlantPage for {plantName}  </h1>
    </>
  );
}
export default PlantPage;