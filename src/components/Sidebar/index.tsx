import {
  Box,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { SidebarNav } from './SidebarNav';

export function Sidebar(): JSX.Element {
  const { isOpen, onClose } = useSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    xl: false,
  });

  const drawerBg = useColorModeValue('gray.50', 'gray.800');
  const drawerHeaderColor = useColorModeValue('gray.600', 'gray.250');
  const drawerCloseButtonColor = useColorModeValue('gray.600', 'gray.250');

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent background={drawerBg} p="4">
            <DrawerCloseButton mt="6" color={drawerCloseButtonColor} />
            <DrawerHeader color={drawerHeaderColor}>Navegação</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w={256} pos="fixed" pr="6">
      <SidebarNav />
    </Box>
  );
}
