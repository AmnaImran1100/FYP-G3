import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user';

const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'} color="gray.700" _hover={{ color: 'teal.500' }}>
      {title}
    </Button>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    onClose();
    dispatch(logout());
  };

  return (
    <>
      {/* Round Button */}
      <Button
        onClick={onOpen}
        bg="teal.400"
        color="black"
        width="12"
        height="12"
        rounded="full"
        zIndex="overlay"
        position="fixed"
        top="6"
        left="6"
        _hover={{ bg: 'teal.300' }}
      >
        <RiMenu5Fill />
      </Button>

      {/* Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="#FAF9F6" color="gray.700">
          <DrawerHeader borderBottomWidth={'1px'} color="teal.500">
            Wissen
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={'4'} alignItems="flex-start">
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton
                onClose={onClose}
                url="/courses"
                title="Browse All Courses"
              />
              <LinkButton
                onClose={onClose}
                url="/request"
                title="Request a Course"
              />

              {isAuthenticated && user && user.role === 'user' && (
                <LinkButton
                  onClose={onClose}
                  url="/subscribe"
                  title="Subscription"
                />
              )}

              {isAuthenticated && user && user.role === 'user' && (
                <LinkButton
                  onClose={onClose}
                  url="/feedback"
                  title="Feedback"
                />
              )}

              {isAuthenticated && user && user.role === 'user' && (
                <LinkButton
                  onClose={onClose}
                  url="/mockexam"
                  title="Mock Exam Generation" 
                />
              )}

              <HStack
                justifyContent={'space-evenly'}
                position="absolute"
                bottom={'2rem'}
                width="80%"
              >
                {isAuthenticated ? (
                  <VStack>
                    <HStack>
                      <Link onClick={onClose} to="/profile">
                        <Button
                          variant={'ghost'}
                          color="gray.700"
                          _hover={{ color: 'teal.500' }}
                        >
                          Profile
                        </Button>
                      </Link>
                      <Button
                        variant={'ghost'}
                        onClick={logoutHandler}
                        color="gray.700"
                        _hover={{ color: 'teal.500' }}
                      >
                        <RiLogoutBoxLine />
                        Logout
                      </Button>
                    </HStack>

                    {user && user.role === 'admin' && (
                      <Link onClick={onClose} to="/admin/dashboard">
                        <Button
                          colorScheme={'purple'}
                          variant="ghost"
                          color="gray.700"
                          _hover={{ color: 'teal.500' }}
                        >
                          <RiDashboardFill style={{ margin: '4px' }} />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                  </VStack>
                ) : (
                  <>
                    <Link onClick={onClose} to="/login">
                      <Button
                        bg="teal.400"
                        color="black"
                        _hover={{ bg: 'teal.300' }}
                      >
                        Login
                      </Button>
                    </Link>

                    <p>OR</p>

                    <Link onClick={onClose} to="/register">
                      <Button
                        bg="teal.400"
                        color="black"
                        _hover={{ bg: 'teal.300' }}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
