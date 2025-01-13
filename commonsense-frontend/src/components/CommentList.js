import React, { useEffect, useState } from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { postComment } from '../API/postComment';
import { useMsal } from '@azure/msal-react';
import { getCommentsForReport } from '../API/getCommentsForReport';
import { useIsAuthenticated } from '@azure/msal-react';
const CommentList = ({ comments, setComments, reportId}) => {
  const [newComment, setNewComment] = useState('');
  const {instance} = useMsal();
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    const fetchComments = async () => {
      const data = await getCommentsForReport(reportId);
      setComments(data);
    };
    fetchComments();
  }, [reportId, setComments]);
    
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    const comm = {
      text: newComment,
      createdAt: new Date().toISOString(),
      reportId: reportId,
    }
    try {
      await postComment(instance, comm);
      setNewComment('');
      const data = await getCommentsForReport(reportId);
      setComments(data)
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <>
      <ListGroup>
        {comments.map((comment, index) => (
          <ListGroup.Item key={index}>
            <p>{comment.text}</p>
            <small>By User {comment.userId} on {new Date(comment.createdAt).toLocaleDateString()}</small>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {isAuthenticated && (
        <Form onSubmit={handleCommentSubmit} className="mt-3">
          <Form.Group controlId="formNewComment">
            <Form.Label>Add a Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};

export default CommentList;