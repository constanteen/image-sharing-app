import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Image from '../types/Image';

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 400,
  },
});

export default function FeaturedImage(props: {featured: Image}):ReactElement {
  const classes = useStyles();

  const {featured} = props || {};

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={featured.url}
          title={featured.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {featured.explanation}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}