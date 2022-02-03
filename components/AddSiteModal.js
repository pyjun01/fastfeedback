import { mutate } from 'swr';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

function AddSiteModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const auth = useAuth();

  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: '',
      url: '',
    },
  });

  const onCreateSite = ({ name, url }) => {
    console.log('create');
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    };

    const { id } = createSite(newSite);

    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    mutate(
      ['/api/sites', auth.user.token],
      async (data) => ({
        sites: [{ id, ...newSite }, ...data?.sites],
      }),
      false,
    );

    onClose();

    console.log('close');
  };

  return (
    <>
      <Button
        backgroundColor='gray.900'
        fontWeight='medium'
        color='white'
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
        onClick={onOpen}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onCreateSite)}>
            <ModalHeader fontWeight='bold'>Add Site</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name='name'
                  placeholder='My site'
                  {...register('name', { required: true })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Link</FormLabel>
                <Input
                  name='url'
                  placeholder='https://website.com'
                  {...register('url', { required: true })}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} fontWeight='medium' onClick={onClose}>
                Cancel
              </Button>
              <Button
                type='submit'
                backgroundColor='#99FFFE'
                fontWeight='medium'
                color='#194D4C'
              >
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddSiteModal;
