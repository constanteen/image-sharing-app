import React, {memo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Image from '../types/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


function ImageCard(props: {imageData: Image}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [favorited, setFavorited] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {imageData} = props || {}

  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={imageData.url}
        title={imageData.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {imageData.title}
        </Typography>
        <Typography variant="subtitle1" display="block" gutterBottom>
          {imageData.date}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {imageData?.explanation?.substring(0, 100)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => setFavorited(!favorited)} >
          <FavoriteIcon color={favorited ? "error" : "action"} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          {imageData.explanation}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default memo(ImageCard);
