import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

// Define the styles for the modal using MUI
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
// Define the props for the Review component
interface IReviewProps {
  open: boolean;  // Controls the visibility of the modal
  handleClose: () => void;   // Function to close the modal
  viewData: any;    // Data passed to display the reviews
}

// Define the structure of a review
type TReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

// Styled component for individual review cards
const ReviewCard = styled.div`
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
  `;
// Styled components for different parts of the review card
const ReviewerName = styled.h3`
    margin: 0;
    color: #333;
  `;

const Rating = styled.div`
    color: #ffb400;
    font-size: 18px;
  `;

const Comment = styled.div`
    margin: 8px 0;
    color: #555;
  `;

const Dates = styled.span`
    font-size: 12px;
    color: #999;
  `;

const ReviewerEmail = styled.a`
    font-size: 12px;
    color: #007bff;
    text-decoration: none;
  
    &:hover {
      text-decoration: underline;
    }
  `;
// Styled component for the container that holds all the reviews
const ReviewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
  `;
// Styled component for the close button in the modal
const CloseButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

// The main Review component
const Review: React.FC<IReviewProps> = (props: IReviewProps) => {
  const { open, handleClose, viewData } = props

  const reviews: TReview[] = viewData?.reviews;   // Extract reviews from viewData
  return (
    <>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Product Reviews
          </Typography>
          <CloseButton onClick={handleClose} role='button' name='close'>
            <CloseIcon />
          </CloseButton>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component={"div"}>
            <ReviewsContainer>
              {reviews && reviews.map((review, index) => (
                <ReviewCard key={index}>
                  <ReviewerName>{review.reviewerName}</ReviewerName>
                  <Rating>{'★'.repeat(review.rating)}</Rating>
                  <Comment>{review.comment}</Comment>
                  <Dates>{new Date(review.date).toLocaleDateString()}</Dates>
                  <ReviewerEmail href={`mailto:${review.reviewerEmail}`}>{review.reviewerEmail}</ReviewerEmail>
                </ReviewCard>
              ))}
            </ReviewsContainer>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Review;
