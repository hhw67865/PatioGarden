import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const PlantCard = ({plant}) => {
  let navigate = useNavigate()
  return (
    <Card onClick={()=>navigate(`/plants/${plant.name}`)} variant='outlined' elevation={0} sx={{ width: 150, border:"none", borderRadius:"0", cursor:'pointer' }}>
      <CardMedia
        sx={{ height: 120 }}
        image={plant.image_url}
        title="green iguana"
      />
      <CardContent sx={{p:0, textAlign:'center'}}>
        <Typography sx={{fontStyle: 'italic', fontWeight:500}} variant="body1" component="p">
            {plant.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default PlantCard;