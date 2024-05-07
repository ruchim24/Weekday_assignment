import React from "react";
import Card from "@mui/material/Card";
import { CardHeader, CardContent, CardActions, Typography, IconButton, Collapse, Avatar, styled } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  //transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  textAlign: 'center',
  color:'blue',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


function Cards({info,setModal}){
  const [expanded, setExpanded] = React.useState(false);

  const currency_symbols = {
    'USD': '$', // US Dollar
    'EUR': '€', // Euro
    'CRC': '₡', // Costa Rican Colón
    'GBP': '£', // British Pound Sterling
    'ILS': '₪', // Israeli New Sheqel
    'INR': '₹', // Indian Rupee
    'JPY': '¥', // Japanese Yen
    'KRW': '₩', // South Korean Won
    'NGN': '₦', // Nigerian Naira
    'PHP': '₱', // Philippine Peso
    'PLN': 'zł', // Polish Zloty
    'PYG': '₲', // Paraguayan Guarani
    'THB': '฿', // Thai Baht
    'UAH': '₴', // Ukrainian Hryvnia
    'VND': '₫', // Vietnamese Dong
};

  const handleShow = (info) => {
    setModal({show:true,info:info});
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    return(
        <>
        <div style={{margin:'20px'}}>
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          sx={{textTransform: 'capitalize'}}
          avatar={
            <Avatar aria-label="recipe" sx={{borderRadius:'50%',objectFit:'scale-down',height:'60px'}}>
              <img src={info?.logoUrl}/>
            </Avatar>
          }
          title={info?.companyName}
          subheader={
            <>
            <div>{info?.jobRole}</div>
            <div>{info?.location}</div>
            </>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <>
            <div style={{fontWeight:'400'}}>
              {`Expected Salary: ${currency_symbols[info?.salaryCurrencyCode]}${info?.minJdSalary ? info?.minJdSalary : ''} - ${info?.maxJdSalary ? info?.maxJdSalary : ''}`}
            </div>
            <div>
              <h2>About Company</h2>
            {info?.jobDetailsFromCompany?.slice(0,200) + '...'}
            </div>
            <div className="blur" onClick={() => handleShow(info?.jobDetailsFromCompany)} style={{cursor:'pointer'}}>Show More</div>
            </>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
          </IconButton>
          <IconButton aria-label="share">
          </IconButton>
        </CardActions>
        <Collapse  timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Chevrolet Description</Typography>
            <Typography paragraph>
              Chevrolet is an iconic American automobile brand founded in 1911
              by Louis Chevrolet and William C. Durant
            </Typography>
            <Typography paragraph>
              It is currently the fourth-largest automotive brand in the United
              States and is a division of General Motors. Chevrolet has become
              one of America’s most iconic brands, producing reliable and
              stylish cars, trucks, and SUVs for over a century. Its models
              range from the economical Spark to the luxurious Corvette.
            </Typography>
            <Typography paragraph>
              Chevrolet is also known for its commitment to safety, providing
              advanced features like lane departure warning and front crash
              prevention. (Discard any mussels that don&apos;t open.)
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
        </div>
        </>
    );
}

export default Cards;