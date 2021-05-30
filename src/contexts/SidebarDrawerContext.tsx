import { createContext, ReactNode, useContext, useEffect } from "react";

import { useRouter } from "next/dist/client/router";

import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData)

interface SidebarDrawerProdivderProps {
  children: ReactNode;
}

export function SidebarDrawerProdivder({
  children
}: SidebarDrawerProdivderProps) {
  const disclosure = useDisclosure()

  const router = useRouter()

  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)