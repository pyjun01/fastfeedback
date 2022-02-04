import { useState, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
} from '@chakra-ui/react';

import { deleteFeedback } from '@/lib/db';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';

function DeleteFeedbackButton({ feedbackId }) {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  const auth = useAuth();

  const onClose = () => setIsOpen(false);
  const onDelete = () => {
    deleteFeedback(feedbackId);

    mutate(
      ['/api/feedback', auth.user.token],
      async (data) => {
        feedback: data.feedback.filter(
          (feedback) => feedback.id !== feedbackId,
        );
      },
      false,
    );

    onClose();
  };

  return (
    <>
      <IconButton
        aria-label='Delete feedback'
        icon='delete'
        variant='ghost'
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Feedback
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              ml={3}
              variantColor='red'
              fontWeight='bold'
              onClick={onDelete}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeleteFeedbackButton;
