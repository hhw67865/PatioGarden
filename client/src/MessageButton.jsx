import Fab from '@mui/material/Fab';
import MessageIcon from '@mui/icons-material/Message';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';

const MessageButton = () => {
    let navigate = useNavigate()
  return (
    <Fab
    sx={{position:'fixed', bottom: '16px', right: '16px'}}
    onClick={()=>navigate(`/directmessages`)}
    >
        <Badge        
    //   badgeContent={4} color="primary"
        >
            <MessageIcon/>
        </Badge>
    </Fab>
  );
}
export default MessageButton;