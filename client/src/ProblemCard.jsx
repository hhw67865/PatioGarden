import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { CardHeader } from '@mui/material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const ProblemCard = ({problem}) => {

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: 300, display: 'flex', flexDirection:'column' }}>      
        <CardHeader title={problem.name}/>
        <CardMedia
        component="img"
        height="200"
        image={problem.image_url}
        alt={problem.name}
        />
        <CardContent sx={{maxHeight:"150px", overflowY: 'scroll', height:150}}>
            <Typography variant="body2">
                {problem.description}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>     
            <Typography>Preventatives</Typography>   
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >        
                <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent sx={{maxHeight:"200px", overflowY: 'scroll'}}>                
                <Typography variant='body2'>
                    {problem.preventatives}
                </Typography>
            </CardContent>
        </Collapse>
    </Card>
  );
}
export default ProblemCard;