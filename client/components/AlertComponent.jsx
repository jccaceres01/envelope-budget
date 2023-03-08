import {
  Alert,
  AlertTitle,
} from '@mui/material';

const AlertComponent = ({errors}) => {
  

  if (errors.length > 0) {
    return (
      <Alert
        severity='error'
        action={
          <Button size="small" color="inherit">
            X
          </Button>
        }
      >
        <AlertTitle>Error</AlertTitle>
        {errors.map((er, index) => <p key={index}>{er}</p>)}
      </Alert>
    )
  }
}

export default AlertComponent;