import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PlantCard = ({plant}) => {
  return (
    <Card variant='outlined' elevation={0} sx={{ width: 150, border:"none", borderRadius:"0" }}>
      <CardMedia
        sx={{ height: 120 }}
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tomato.jpg/640px-Tomato.jpg"
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