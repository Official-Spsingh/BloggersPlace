import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const [showLoadMore, setshowLoadMore] = useState(post.message.length > 50 ? true : false)
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'data:image/png;base64,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'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><EditIcon fontSize="default" /></Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {showLoadMore ? post.message.slice(0, 50) : post.message}
          {
            showLoadMore ?
              <Button style={{
                display: "inline",
                fontSize: "10px",
                color: "#3f51b5",
                margin: "1px 0px 0px -6px",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: "400",
                lineHeight: "1.43",
                letterSpacing: "0.01071em"
              }}>Load more</Button> : null
          }
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card >
  );
};

export default Post;
