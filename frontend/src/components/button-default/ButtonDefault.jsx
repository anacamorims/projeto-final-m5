import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function ButtonDefault({ name: name, onClick }) {
    return (
        <Box 
            display="flex"
            justifyContent="center" 
            alignItems="center" 
        >
            <Button
                variant="contained"
                disableElevation
                size='large'
                sx={{ 
                    borderRadius: 5, 
                    m: 4, width: 1,
                    p: 2, 
                    fontSize: 14, 
                    fontFamily: "Poppins, system-ui" ,
                    textTransform: "none"
                }}
                onClick={onClick}
            >
                {name}
            </Button>
        </Box>
    )
}