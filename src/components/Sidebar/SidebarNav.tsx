import { Stack } from '@chakra-ui/react';
import {
  RiDashboardLine,
  RiContactsLine,
  RiFilter2Line,
  RiTableFill,
} from 'react-icons/ri';
import { BiDish } from 'react-icons/bi';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav(): JSX.Element {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GENERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">
          Dashboard
        </NavLink>
        <NavLink icon={RiContactsLine} href="/users">
          Users
        </NavLink>
      </NavSection>

      <NavSection title="BACKOFFICE">
        <NavLink icon={BiDish} href="/forms">
          Dishes
        </NavLink>
        <NavLink icon={RiFilter2Line} href="/automation">
          Categories
        </NavLink>
        <NavLink icon={RiTableFill} href="/automation">
          Tables
        </NavLink>
      </NavSection>
    </Stack>
  );
}
